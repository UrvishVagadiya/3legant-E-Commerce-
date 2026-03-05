"use client";
import { X, Ticket } from "lucide-react";
import { useState } from "react";
import CheckoutStepper from "@/components/CheckoutStepper";
import Link from "next/link";
import Image from "next/image";

const Cart = () => {
  const initialProducts = [
    {
      id: 1,
      name: "Tray Table",
      color: "Black",
      price: 19,
      image: "/black_table.png", 
      quantity: 2,
    },
    {
      id: 2,
      name: "Tray Table",
      color: "Red",
      price: 19,
      image: "/red_table.png", 
      quantity: 2,
    },
    {
      id: 3,
      name: "Table Lamp",
      color: "Gold",
      price: 39,
      image: "/lamp.png", 
      quantity: 1,
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [shippingMethod, setShippingMethod] = useState("free");

  const updateQuantity = (id: number, type: "inc" | "dec") => {
    setProducts((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
            ...item,
            quantity:
              type === "inc"
                ? item.quantity + 1
                : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
          }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = products.reduce(
    (acc, curr) => acc + curr.price * curr.quantity,
    0,
  );

  let shippingCost = 0;
  if (shippingMethod === "express") shippingCost = 15;
  if (shippingMethod === "pickup") shippingCost = 21;

  const total = subtotal + shippingCost;

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 font-poppins text-[#141718]">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-4xl md:text-[54px] font-medium mb-4">Cart</h1>
        <CheckoutStepper step={1} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">
        <div className="w-full lg:w-[65%]">
          <div className="hidden md:grid grid-cols-12 pb-4 border-b border-gray-300 text-sm font-semibold text-gray-500">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-right">Subtotal</div>
          </div>

          {products.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:grid md:grid-cols-12 items-start md:items-center py-6 border-b border-gray-300 gap-4 md:gap-0"
            >
              <div className="col-span-6 flex gap-4 w-full">
                <div className="relative w-20 h-24 md:w-24 md:h-28 bg-[#F3F5F7] rounded flex items-center justify-center flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-base">{item.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Color: {item.color}
                  </p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 mt-2 hover:text-black transition-colors"
                  >
                    <X size={16} />
                    Remove
                  </button>
                </div>
              </div>

              <div className="col-span-6 md:col-span-2 flex justify-between md:justify-center items-center w-full md:w-auto">
                <div className="md:hidden font-semibold">
                  ${item.price.toFixed(2)}
                </div>
                <div className="flex items-center border border-gray-400 rounded px-2 py-1 gap-4 w-[100px] justify-between">
                  <button
                    onClick={() => updateQuantity(item.id, "dec")}
                    className="text-lg text-gray-500"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, "inc")}
                    className="text-lg text-gray-500"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="hidden md:block col-span-2 text-center font-medium">
                ${item.price.toFixed(2)}
              </div>

              <div className="hidden md:block col-span-2 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <div className="mt-8">
            <h3 className="font-semibold text-lg mb-2">Have a coupon?</h3>
            <p className="text-sm text-gray-500 mb-4">
              Add your code for an instant cart discount
            </p>
            <div className="flex items-center border border-gray-300 rounded overflow-hidden max-w-sm">
              <div className="pl-3 text-gray-400">
                <Ticket size={20} />
              </div>
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full py-2 px-3 outline-none text-sm placeholder-gray-400"
              />
              <button className="px-4 py-2 font-semibold text-sm hover:bg-gray-100 transition-colors">
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-[35%]">
          <div className="border border-gray-300 rounded p-6">
            <h2 className="text-xl font-semibold mb-6">Cart summary</h2>

            <div className="space-y-3 mb-6">
              <label className="flex items-center justify-between border border-gray-300 rounded p-3 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value="free"
                    checked={shippingMethod === "free"}
                    onChange={() => setShippingMethod("free")}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm font-medium">Free shipping</span>
                </div>
                <span className="text-sm font-medium">$0.00</span>
              </label>

              <label className="flex items-center justify-between border border-gray-300 rounded p-3 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={shippingMethod === "express"}
                    onChange={() => setShippingMethod("express")}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm font-medium">Express shipping</span>
                </div>
                <span className="text-sm font-medium">+$15.00</span>
              </label>

              <label className="flex items-center justify-between border border-gray-300 rounded p-3 cursor-pointer hover:border-black transition-colors">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shipping"
                    value="pickup"
                    checked={shippingMethod === "pickup"}
                    onChange={() => setShippingMethod("pickup")}
                    className="w-4 h-4 text-black focus:ring-black border-gray-300"
                  />
                  <span className="text-sm font-medium">Pick Up</span>
                </div>
                <span className="text-sm font-medium">%21.00</span>
              </label>
            </div>

            <div className="flex items-center justify-between py-4 border-b border-gray-200">
              <span className="text-sm font-medium">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between pt-4 pb-6">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-xl font-semibold">${total.toFixed(2)}</span>
            </div>

            {products.length === 0 ? (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 cursor-not-allowed py-4 rounded font-semibold transition-colors"
                title="Your cart is empty"
              >
                Checkout
              </button>
            ) : (
              <Link href="/checkout" className="block">
                <button className="w-full bg-[#141718] text-white py-4 rounded font-semibold hover:bg-black transition-colors">
                  Checkout
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
