export default async function getEnvironment(req, res) {
    return res.status(200).json({message: 'Success', environment: process.env.NODE_ENV, oauthRedirect: process.env.OAUTHREDIRECT})
}