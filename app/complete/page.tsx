"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import CheckoutStepper from "@/components/CheckoutStepper";

const Complete = () => {
    const purchasedItems = [
        { id: 1, name: "Tray Table", color: "Black", quantity: 2, image: "/black_table.png" },
        { id: 2, name: "Tray Table", color: "Red", quantity: 2, image: "/red_table.png" },
        { id: 3, name: "Table Lamp", color: "Gold", quantity: 1, image: "/lamp.png" },
    ];

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 mb-20 font-poppins text-[#141718]">
            <div className="flex flex-col items-center justify-center mb-8 md:mb-[80px]">
                <h1 className="text-4xl md:text-[54px] font-medium mb-8">Complete!</h1>
                <CheckoutStepper step={3} />
            </div>

            <div className="max-w-[738px] w-full mx-auto bg-white rounded-2xl md:shadow-[0px_8px_40px_rgba(0,0,0,0.08)] py-12 md:py-[80px] px-6 md:px-20 flex flex-col items-center">
                <p className="text-[#6C7275] text-xl md:text-[28px] font-medium mb-4">Thank you! 🎉</p>
                <h2 className="text-[32px] md:text-[40px] font-medium mb-12 text-center leading-[1.2]">
                    Your order has been<br />received
                </h2>

                <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-12">
                    {purchasedItems.map((item) => (
                        <div key={item.id} className="relative w-20 h-24 bg-[#F3F5F7] rounded flex-shrink-0 flex items-center justify-center">
                            <Image src={item.image} alt={item.name} fill className="object-cover p-2" />
                            <div className="absolute -top-3 -right-3 bg-[#141718] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 border-white shadow-sm">
                                {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-full max-w-[380px]">
                    <div className="grid grid-cols-[140px_1fr] md:grid-cols-[160px_1fr] gap-y-6 mb-12 text-[15px]">
                        <span className="font-semibold text-[#6C7275]">Order code:</span>
                        <span className="font-semibold text-[#141718]">#0123_45678</span>

                        <span className="font-semibold text-[#6C7275]">Date:</span>
                        <span className="font-semibold text-[#141718]">October 19, 2023</span>

                        <span className="font-semibold text-[#6C7275]">Total:</span>
                        <span className="font-semibold text-[#141718]">$1,345.00</span>

                        <span className="font-semibold text-[#6C7275]">Payment method:</span>
                        <span className="font-semibold text-[#141718]">Credit Card</span>
                    </div>
                </div>

                <Link href="#">
                    <button className="bg-[#141718] text-white px-10 py-3 md:py-4 rounded-full font-medium text-base hover:bg-black transition-colors min-w-[200px] flex items-center justify-center mt-4">
                        Purchase history
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default Complete;
