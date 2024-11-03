const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
import Pocketbase from 'pocketbase';

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { items, prevAddr, userId } = req.body;

        console.log(items);

        if (!userId) {
          return res.status(400).end('No user id provided.')
        }

        const pb = new Pocketbase(process.env.PB_URL);
        await pb.admins.authWithPassword(process.env.PB_ADMIN_EMAIL, process.env.PB_ADMIN_PASS);

        let filter = items.reduce((acc, id, index) => {
          return acc + (index === 0 ? "" : " || ") + `id='${id}'`;
        }, '');
        
        console.log(filter);
        
        const itemsFromPB = await pb.collection('cosmetics').getFullList({
          filter: filter
        });

        console.log(itemsFromPB);
        
        let structuredItems = [];

        for (let item of itemsFromPB) {
          structuredItems.push({
            price_data: {
              currency: 'usd',
              product_data: {
                name: item.name,
                images: [`https://db.wardrobe.gg/api/files/cosmetics/${item.id}/${item.render}`],
              },
              unit_amount: item.cost,
            },
            quantity: 1,
          });
        }

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: structuredItems,
            mode: 'payment',
            metadata: {
              wardrobe_ids: JSON.stringify(items),
            },
            success_url: `${req.headers.origin}/account?pc=false&pState=cAPh2`,
            cancel_url: `${req.headers.origin}${prevAddr}?pc=true`,
            automatic_tax: { enabled: true },
        });


        await pb.collection('orders').create({
          user: userId,
          session_id: session.id,
          isFulfilled: false
        })
                
        res.status(200).json({url: session.url});
      } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }