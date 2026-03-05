"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Ticket } from "lucide-react";
import CheckoutStepper from "@/components/CheckoutStepper";

const Checkout = () => {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("card");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        streetAddress: "",
        country: "",
        city: "",
        state: "",
        zipCode: "",
        cardNumber: "",
        expDate: "",
        cvc: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const cartItems = [
        { id: 1, name: "Tray Table", color: "Black", quantity: 2, price: 19.00, image: "/black_table.png" },
        { id: 2, name: "Tray Table", color: "Red", quantity: 2, price: 19.00, image: "/red_table.png" },
        { id: 3, name: "Table Lamp", color: "Gold", quantity: 1, price: 39.00, image: "/lamp.png" },
    ];

    const subtotal = 99.00;
    const discount = 25.00; 
    const total = 234.00; 
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handlePlaceOrder = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid";
        }

        if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.state.trim()) newErrors.state = "State is required";
        if (!formData.zipCode.trim()) newErrors.zipCode = "Zip code is required";

        if (paymentMethod === "card") {
            if (!formData.cardNumber.trim()) newErrors.cardNumber = "Card number is required";
            if (!formData.expDate.trim()) newErrors.expDate = "Expiration date is required";
            if (!formData.cvc.trim()) newErrors.cvc = "CVC is required";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorField = document.querySelector('.border-red-500');
            if (firstErrorField) {
                firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        router.push("/complete");
    };

    const getInputClass = (fieldName: string) => {
        return `w-full border rounded px-4 py-3 outline-none transition-colors ${errors[fieldName]
            ? "border-red-500 bg-red-50 focus:border-red-600"
            : "border-gray-300 focus:border-black bg-white"
            }`;
    };

    return (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-20 font-poppins text-[#141718]">
            <div className="flex flex-col items-center justify-center mb-8">
                <h1 className="text-4xl md:text-[54px] font-medium mb-4">Check Out</h1>
                <CheckoutStepper step={2} />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full">
                <div className="w-full lg:w-[65%] space-y-8">

                    <div className="border border-gray-300 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Contact Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">FIRST NAME</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" className={getInputClass("firstName")} />
                                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">LAST NAME</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" className={getInputClass("lastName")} />
                                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">PHONE NUMBER</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Phone number" className={getInputClass("phone")} />
                            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-500 mb-1">EMAIL ADDRESS</label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Your Email" className={getInputClass("email")} />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">STREET ADDRESS *</label>
                            <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleInputChange} placeholder="Street Address" className={getInputClass("streetAddress")} />
                            {errors.streetAddress && <p className="text-red-500 text-xs mt-1">{errors.streetAddress}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">COUNTRY *</label>
                            <select name="country" value={formData.country} onChange={handleInputChange} className={`${getInputClass("country")} appearance-none`}>
                                <option value="">Country</option>
                                <option value="US">United States</option>
                                <option value="UK">United Kingdom</option>
                                <option value="CA">Canada</option>
                                <option value="IN">India</option>
                            </select>
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-gray-500 mb-1">TOWN / CITY *</label>
                            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="Town / City" className={getInputClass("city")} />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">STATE</label>
                                <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" className={getInputClass("state")} />
                                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-500 mb-1">ZIP CODE</label>
                                <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} placeholder="Zip Code" className={getInputClass("zipCode")} />
                                {errors.zipCode && <p className="text-red-500 text-xs mt-1">{errors.zipCode}</p>}
                            </div>
                        </div>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black" />
                            <span className="text-sm text-gray-600">Use a different billing address (optional)</span>
                        </label>
                    </div>

                    <div className="border border-gray-300 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Payment method</h2>

                        <div className="space-y-4 mb-6">
                            <label className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-black bg-gray-50" : "border-gray-300 hover:border-black"}`}>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === "card"}
                                        onChange={() => setPaymentMethod("card")}
                                        className="w-4 h-4 text-black focus:ring-black border-gray-300"
                                    />
                                    <span className="font-medium text-sm">Pay by Card Credit</span>
                                </div>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
                                    <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </label>

                            <label className={`flex items-center justify-between border rounded p-4 cursor-pointer transition-colors ${paymentMethod === "paypal" ? "border-black bg-gray-50" : "border-gray-300 hover:border-black"}`}>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="payment"
                                        checked={paymentMethod === "paypal"}
                                        onChange={() => setPaymentMethod("paypal")}
                                        className="w-4 h-4 text-black focus:ring-black border-gray-300"
                                    />
                                    <span className="font-medium text-sm">Paypal</span>
                                </div>
                            </label>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-500 mb-1">CARD NUMBER</label>
                                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 1234 1234 1234" className={getInputClass("cardNumber")} />
                                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">EXPIRATION DATE</label>
                                        <input type="text" name="expDate" value={formData.expDate} onChange={handleInputChange} placeholder="MM/YY" className={getInputClass("expDate")} />
                                        {errors.expDate && <p className="text-red-500 text-xs mt-1">{errors.expDate}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1">CVC</label>
                                        <input type="text" name="cvc" value={formData.cvc} onChange={handleInputChange} placeholder="CVC code" className={getInputClass("cvc")} />
                                        {errors.cvc && <p className="text-red-500 text-xs mt-1">{errors.cvc}</p>}
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 lg:hidden">
                            <button onClick={handlePlaceOrder} className="w-full bg-[#141718] text-white py-4 rounded font-semibold hover:bg-black transition-colors">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[35%]">
                    <div className="border border-gray-300 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-6">Order summary</h2>

                        <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 items-center">
                                    <div className="relative w-16 h-20 bg-[#F3F5F7] rounded flex-shrink-0 flex items-center justify-center">
                                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-sm">{item.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">Color: {item.color}</p>
                                            </div>
                                            <span className="font-semibold text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                                        </div>
                                        <div className="flex items-center border border-gray-300 rounded px-2 py-0.5 mt-2 w-fit gap-3">
                                            <button className="text-gray-500 text-sm">-</button>
                                            <span className="font-semibold text-sm">{item.quantity}</span>
                                            <button className="text-gray-500 text-sm">+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center border border-gray-300 rounded overflow-hidden mb-6">
                            <input
                                type="text"
                                placeholder="Input"
                                className="w-full py-3 px-4 outline-none text-sm placeholder-gray-400"
                            />
                            <button className="px-6 py-3 font-semibold text-sm bg-[#141718] text-white hover:bg-black transition-colors">
                                Apply
                            </button>
                        </div>

                        <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-gray-600 text-sm">
                                    <Ticket size={16} />
                                    <span>JenkateMW</span>
                                </div>
                                <div className="text-[#38CB89] font-medium text-sm">
                                    -${discount.toFixed(2)} <span className="text-gray-400 ml-1 cursor-pointer hover:text-black">[Remove]</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Shipping</span>
                                <span className="font-medium">Free</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">${subtotal.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-8">
                            <span className="text-lg font-semibold">Total</span>
                            <span className="text-xl font-semibold">${total.toFixed(2)}</span>
                        </div>

                        <div className="hidden lg:block">
                            <button onClick={handlePlaceOrder} className="w-full bg-[#141718] text-white py-4 rounded font-semibold hover:bg-black transition-colors">
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
