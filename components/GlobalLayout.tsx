"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    const isAuthPage = pathname === "/signin" || pathname === "/signup";
    const isContactPage= pathname === '/contact'
    const isCartPage= pathname === '/cart'
    const isAccountPage= pathname === '/account'


    return (
        <>
            {!isAuthPage && <Header />}
            {!isAuthPage && <Navbar />}
            {children}
            {(!isAuthPage && <NewsLetter />) && (!isContactPage && <NewsLetter/>) && (!isCartPage && <NewsLetter/>) && (!isAccountPage && <NewsLetter/>)}
            {!isAuthPage && <Footer />}
        </>
    );
};

export default GlobalLayout;
