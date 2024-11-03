export default async function getPriceFromId(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const {id} = req.query;

    try {

        const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

        console.log(id);
        try {
            const price = await stripe.prices.retrieve(id);
            return res.status(200).json({
                billing_scheme: price.billing_scheme,
                currency: price.currency,
                unit_amount: price.unit_amount,
                unit_amount_decimal: price.unit_amount_decimal,
                displayPrice: (price.unit_amount / 100).toFixed(2)
            })
        }
        catch (e) {
            console.error(e);
            return res.status(404).json({message: 'Invalid price id.'})
        }
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({message: 'Internal server error.'})
    }

}