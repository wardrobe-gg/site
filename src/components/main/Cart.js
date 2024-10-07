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
  

function Cart() {
    "use client";
    const [cart, setCart] = useState({});
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const updateCart = () => {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            setCart(cartData || {});
        };

        // Load cart data initially
        updateCart();

        // Set up an interval to check for localStorage changes
        const interval = setInterval(() => {
            updateCart();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const open = (e) => {
        setIsCartOpen(e.value)
    }

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
                        {cart?.length > 0 && <div className="absolute -top-[1rem] -right-[1rem] h-8 w-8 flex items-center justify-center text-lg">
                            <span className='font-mc'>{cart?.length ?? '0'}</span>
                        </div>}

                    </div>
                </SheetTrigger>
                <SheetContent className="z-[10000]">
                    <SheetHeader>
                        <SheetTitle className="text-3xl font-mc">Cart</SheetTitle>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
    );
}

export default Cart;