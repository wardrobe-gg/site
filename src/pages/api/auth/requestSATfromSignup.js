import Pocketbase from "pocketbase";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export default async function requestSATfromSignup(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed.' });
    }

    const { codeChallenge, waitingId, relatedAccountId, state } = req.body;

    const pb = new Pocketbase(process.env.PB_URL);
    await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

    const waitingRecord = await pb.collection('signupWaiting').getOne(waitingId);
    let codeHash = waitingRecord.codeChallengeHash;

    let match = await bcrypt.compare(codeChallenge, codeHash);

    if (!match) {
        return res.status(403).json({ message: 'Invalid code challenge.' });
    }

    if (relatedAccountId !== waitingRecord.relatedAccount) {
        return res.status(403).json({ message: 'Mismatched account.' });
    }

    await pb.collection('signupWaiting').delete(waitingId);

    if (!relatedAccountId) {
        return res.status(403).json({ message: 'Mismatched account.' });
    }

    // Generate SAT
    const SAT = crypto.randomBytes(256).toString('hex');


    // Insert SAT into the database
    const insertSAT = await pb.collection('SATs').create({
        SAT: SAT,
        user: relatedAccountId,
    });

    let idHash = await bcrypt.hash(insertSAT.id, 12);

    // AES-256 Encrypt the SAT
    const encryptionKey = Buffer.from(process.env.MASTER_ENCRYPTION_KEY, 'hex'); // Convert hex string to buffer
    const iv = crypto.randomBytes(16); // Generate an Initialization Vector
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

    let encryptedSAT = cipher.update(SAT, 'utf8', 'hex');
    encryptedSAT += cipher.final('hex');

    // Combine IV and encrypted SAT for client-side decryption
    const ivAndEncryptedSAT = iv.toString('hex') + ':' + encryptedSAT;

    const signedSAT = jwt.sign({
        'SAT': ivAndEncryptedSAT,
        'IDH': idHash
    }, process.env.MASTER_ENCRYPTION_KEY);


    return res.status(200).json({ message: 'Woop', signedSAT });
}