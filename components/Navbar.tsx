import { CircleUserRound, Handbag, Menu, Search } from "lucide-react"
import Link from "next/link"

const Navbar = () => {
  return (
    <div className="px-5 md:px-10 lg:px-40 py-4 md:py-5 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Menu className="block md:hidden cursor-pointer w-6 h-6 text-[#141718] transition-all duration-300 ease-in-out" />
        <Link href="/home">
          <h3 className="cursor-pointer font-[500] text-xl md:text-2xl text-[#141718] transition-all duration-300 ease-in-out">3legant.</h3>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-[500] text-[#6C7275]">
        <Link href={'/home'} className="text-[#141718]">Home</Link>
        <Link href={'/shop'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Shop</Link>
        <Link href={'/product'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Product</Link>
        <Link href={'/contact'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Contact Us</Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4 text-[#141718]">
        <Search className="hidden md:block cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:text-gray-500 transition-colors duration-300 ease-in-out" />
        <CircleUserRound className="hidden md:block cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:text-gray-500 transition-colors duration-300 ease-in-out" />

        <div className="flex items-center gap-1.5 cursor-pointer group transition-all duration-300 ease-in-out">
          <Handbag className="w-5 h-5 lg:w-6 lg:h-6 group-hover:text-gray-500 transition-colors duration-300 ease-in-out" />
          <div className="bg-[#141718] text-white text-[11px] font-[700] w-5 h-5 rounded-full flex items-center justify-center">
            2
          </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar