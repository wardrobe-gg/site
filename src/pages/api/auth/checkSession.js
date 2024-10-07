export default async function checkSession(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed.'})
    }

    
}