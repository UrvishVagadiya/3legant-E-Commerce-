"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import NewsLetter from "@/components/NewsLetter";
import Footer from "@/components/Footer";

const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();

    // Define routes where we don't want the header/navbar/footer to display
    const isAuthPage = pathname === "/signin" || pathname === "/signup";

    return (
        <>
            {!isAuthPage && <Header />}
            {!isAuthPage && <Navbar />}
            {children}
            {!isAuthPage && <NewsLetter />}
            {!isAuthPage && <Footer />}
        </>
    );
};

export default GlobalLayout;
