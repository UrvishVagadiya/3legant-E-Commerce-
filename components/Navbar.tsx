"use client"

import { CircleUserRound, Handbag, Menu, Search, LogOut } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

const Navbar = () => {
  const [user, setUser] = useState<any>(null)
  const [showDropdown, setShowDropdown] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getUser()


    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setShowDropdown(false)
    router.refresh()
  }

  const getInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase()
    }
    return "U"
  }

  return (
    <div className="px-5 md:px-10 lg:px-40 py-4 md:py-5 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Menu className="block md:hidden cursor-pointer w-6 h-6 text-[#141718] transition-all duration-300 ease-in-out" />
        <Link href="/home">
          <h3 className="cursor-pointer font-[500] text-xl md:text-2xl text-[#141718] transition-all duration-300 ease-in-out">3legant.</h3>
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-6 lg:gap-10 text-sm font-[500] text-[#6C7275]">
        <Link href={'/'} className="text-[#141718]">Home</Link>
        <Link href={'/shop'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Shop</Link>
        <Link href={'/product'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Product</Link>
        <Link href={'/contact'} className="hover:text-[#141718] transition-colors duration-300 ease-in-out">Contact Us</Link>
      </div>

      <div className="flex items-center gap-3 md:gap-4 text-[#141718]">
        <Search className="hidden md:block cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:text-gray-500 transition-colors duration-300 ease-in-out" />
        <div className="relative">
          {user ? (
            <Link href={'/account'}
              className="hidden md:flex cursor-pointer w-7 h-7 lg:w-8 lg:h-8 bg-[#141718] text-white rounded-full items-center justify-center text-sm font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              {getInitial()}
            </Link>
          ) : (
            <Link href={'/signin'}>
              <CircleUserRound className="hidden md:block cursor-pointer w-5 h-5 lg:w-6 lg:h-6 hover:text-gray-500 transition-colors duration-300 ease-in-out" />
            </Link>
          )}

          {showDropdown && user && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100 z-50">
              <div className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100 truncate">
                {user.email}
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          )}
        </div>
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