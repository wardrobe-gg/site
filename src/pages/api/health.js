export default async function healthCheck(req,res) {
    return res.status(200).send('OK');
}