import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import { clearCart, getCart, removeFromCart } from './cartUtils'; // Import the getCart function
import axios from 'axios';
import { useRouter } from 'next/router';
import { Loader2 } from 'lucide-react';

  
function Cart() {
    "use client";

    const router = useRouter();

    // Initialize the cart as an array to store multiple items
    const [cart, setCart] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [loadingCheckout, setLoadingCheckout] = useState(false)
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [activeAccount, setActiveAccount] = useState({});
    useEffect(() => {
        if (typeof window !== "undefined") {
            const searchParams = new URLSearchParams(window.location.search);
            const pc = searchParams.get('pc');
            
            
            if (pc === 'true') {
                setIsCartOpen(true);
                searchParams.delete('pc');  // Remove pc after processing
            }

            console.log(searchParams);
    
            // Update the URL without refreshing the page
            const newUrl = `${window.location.pathname}?${searchParams}`;
            window.history.replaceState(null, '', newUrl)
        }
    }, []);
    useEffect(() => {
        try {
            setActiveAccount(JSON.parse(localStorage.getItem('activeAccount')));
        }
        catch {
            // do nothing, user not logged in.
        }
        

        const updateCart = () => {
            let cartData = getCart();
            setCart(cartData); // Update state with the latest cart data
            let total = 0
            for (let item of cartData) {
                total += item.cost
            }
            setTotalCost(total)
        };
    
        // Load cart data initially when the component mounts
        updateCart();
    
        // Listen for custom 'cartUpdated' event for local updates
        const handleCustomCartChange = () => {
            updateCart();
        };
    
        // Add event listener for the custom cartUpdated event
        window.addEventListener('cartUpdated', handleCustomCartChange);
    
        // Clean up event listener
        return () => {
            window.removeEventListener('cartUpdated', handleCustomCartChange);
        };
    }, []);
    

    // Open or close the cart sheet
    const open = (isOpen) => {
        setIsCartOpen(isOpen);
    };

    const handleCheckout = async () => {
        if (loadingCheckout === false) {
            setLoadingCheckout(true);
            try {
                let userId = JSON.parse(localStorage.getItem('activeAccount'))?.user;
                if (userId) {
                    const response = await axios.post('/api/checkout', {
                        items: [...new Set(cart.map(item => item.id))],
                        prevAddr: router.pathname,
                        userId: userId
                    });
            
                    // If the server responds with a 200 status code, redirect to the session URL
                    if (response.status === 200) {
                        window.location.href = response.data.url; // Redirect to the Stripe checkout URL
                    }
                }
                else {
                    router.push(`/login?c=${encodeURIComponent(router.pathname + '?pc=true')}`)
                }
                
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <Sheet open={isCartOpen} onOpenChange={open}>
            <SheetTrigger asChild>
                <div className="relative cursor-pointer">
                    <Image
                        src={'/assets/icons/cartFrame.png'}
                        width="63"
                        height="63"
                        className="h-[3.2rem] w-[3.2rem] aspect-square"
                        alt="Cart Icon"
                    />
                    {/* Cart count badge */}
                    {cart.length > 0 && (
                        <div className="absolute -top-[1rem] -right-[1rem] h-8 w-8 flex items-center justify-center text-lg">
                            <span className='font-mc'>{cart.length}</span>
                        </div>
                    )}
                </div>
            </SheetTrigger>
            <SheetContent className="z-[10000] outline-none">
                <SheetHeader>
                    <SheetTitle className="text-3xl font-mc">Cart</SheetTitle>
                </SheetHeader>
                {/* Display cart items */}
                <div className='h-[81vh] overflow-y-scroll mt-[1.5rem] mb-[2rem]'>
                {cart.length > 0 ? (
                    cart.map((item, index) => (
                        <div key={index} className="py-2 flex w-full justify-between items-center">
                            <div className='flex flex-col'>
                                <p className="text-lg font-mc">{item.name}</p>
                                <p>${(item.cost / 100).toFixed(2)}</p>
                            </div>
                            <div>
                                <button onClick={() => removeFromCart(index)} className='outline-none'>Remove</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-lg font-mc">Your cart is empty</p>
                )}
                </div>
                {cart.length > 0 && <button className={`w-full p-4 outline-none bg-gradient-to-t from-zinc-800 via-zinc-900 to-zinc-950 hover:from-custom-bpink border-2 border-[#41414A] hover:border-custom-bpink cursor-pointer shadow-ciwhite hover:shadow-cipink transform-all duration-150 font-mc text-xl`} onClick={handleCheckout}>
                    {loadingCheckout === false && (activeAccount?.user ? `Checkout $${(totalCost / 100).toFixed(2)}` : `Login to continue`)}
                    {loadingCheckout === true && <div className='flex items-center justify-center'><Loader2 className='mr-2 animate-spin' /> Loading</div>}
                </button>}
            </SheetContent>
        </Sheet>
    );
}

export default Cart;