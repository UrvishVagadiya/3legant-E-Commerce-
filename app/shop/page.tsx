"use client";

import { useState, useMemo } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoOptionsOutline } from "react-icons/io5";
import { BsGrid3X3GapFill } from "react-icons/bs";
import { BsGridFill } from "react-icons/bs";
import { PiColumnsFill } from "react-icons/pi";
import { PiRowsFill } from "react-icons/pi";
import ShopHeader from "@/components/ShopHeader";
import ShopSidebar from "@/components/ShopSidebar";
import ShopProductGrid from "@/components/ShopProductGrid";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("Living Room");
  const [selectedPrices, setSelectedPrices] = useState<string[]>(["All Price"]);
  const [sortOption, setSortOption] = useState("default");
  const [viewGrid, setViewGrid] = useState<number>(3); 

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const [visibleCount, setVisibleCount] = useState<number>(9);

  const categories = [
    "All Rooms",
    "Living Room",
    "Bedroom",
    "Kitchen",
    "Bathroom",
    "Dinning",
    "Outdoor",
  ];

  const priceRanges = [
    { label: "All Price", min: 0, max: Infinity },
    { label: "$0.00 - 99.99", min: 0, max: 99.99 },
    { label: "$100.00 - 199.99", min: 100, max: 199.99 },
    { label: "$200.00 - 299.99", min: 200, max: 299.99 },
    { label: "$300.00 - 399.99", min: 300, max: 399.99 },
    { label: "$400.00+", min: 400, max: Infinity },
  ];

  const arrivals = [
    {
      id: 1,
      img: "/sofa.png",
      title: "Loveseat Sofa",
      price: 199.0,
      MRP: 400.0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 2,
      img: "/sofa.png",
      title: "Luxury Sofa",
      price: 299.0,
      MRP: 500.0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 3,
      img: "/lamp.png",
      title: "Table Lamp",
      price: 19.00,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 4,
      img: "/drawer.png",
      title: "White Drawer unit",
      price: 89.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 5,
      img: "/black_table.png",
      title: "Black Tray table",
      price: 19.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 6,
      img: "/lamp.png",
      title: "Lamp",
      price: 39.00,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 7,
      img: "/pillow.png",
      title: "Light Beige Pillow",
      price: 3.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 8,
      img: "/lamp2.png",
      title: "Table Lamp",
      price: 39.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 9,
      img: "/bascket.png",
      title: "Bamboo basket",
      price: 9.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 10,
      img: "/sofa.png",
      title: "Elegant Lounge Chair",
      price: 150.0,
      MRP: 300.0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 11,
      img: "/lamp.png",
      title: "Reading Lamp",
      price: 49.0,
      MRP: 0,
      category: "Living Room",
      isNew: false,
      discount: "",
    },
    {
      id: 12,
      img: "/drawer.png",
      title: "Modern TV Stand",
      price: 299.0,
      MRP: 450.0,
      category: "Living Room",
      isNew: true,
      discount: "-33%",
    },
    {
      id: 13,
      img: "/pillow2.png",
      title: "Velvet Throw Pillow",
      price: 12.99,
      MRP: 25.0,
      category: "Living Room",
      isNew: false,
      discount: "-48%",
    },
    {
      id: 14,
      img: "/black_table.png",
      title: "Coffee Table",
      price: 189.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "",
    },
    {
      id: 15,
      img: "/bascket.png",
      title: "Woven Storage Bin",
      price: 18.0,
      MRP: 30.0,
      category: "Living Room",
      isNew: false,
      discount: "-40%",
    },
  ];

  const handlePriceChange = (priceLabel: string) => {
    if (priceLabel === "All Price") {
      setSelectedPrices(["All Price"]);
      return;
    }

    setSelectedPrices((prev) => {
      let newPrices = prev.filter((p) => p !== "All Price"); 
      if (newPrices.includes(priceLabel)) {
        newPrices = newPrices.filter((p) => p !== priceLabel);
      } else {
        newPrices.push(priceLabel);
      }
      if (newPrices.length === 0) return ["All Price"];
      return newPrices;
    });

    if (!isSidebarOpen) {
      setIsPriceOpen(false);
    }
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...arrivals];

    if (selectedCategory !== "All Rooms") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (!selectedPrices.includes("All Price")) {
      const activeRanges = priceRanges.filter((r) =>
        selectedPrices.includes(r.label)
      );
      result = result.filter((p) =>
        activeRanges.some((range) => p.price >= range.min && p.price <= range.max)
      );
    }

    if (sortOption === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "price-low-high") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price-high-low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, selectedPrices, sortOption]);

  const desktopIcons = [
    { icon: <BsGrid3X3GapFill />, grid: 4 }, 
    { icon: <BsGridFill />, grid: 3 },       
    { icon: <PiColumnsFill />, grid: 2 },    
    { icon: <PiRowsFill />, grid: 1 },      
  ];

  const mobileIcons = [
    { icon: <PiColumnsFill />, grid: 2 },
    { icon: <PiRowsFill />, grid: 1 },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 mb-20 font-poppins">
      <ShopHeader />

      <div className="flex flex-col lg:flex-row gap-8 my-8 md:my-12 relative w-full items-start">


        {isSidebarOpen && (
          <div className="w-full lg:w-1/4 pb-4">
            <ShopSidebar
              isFilterOpen={true} 
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              priceRanges={priceRanges}
              selectedPrices={selectedPrices}
              handlePriceChange={handlePriceChange}
            />
          </div>
        )}

        <div className={`w-full flex-1 transition-all duration-300 ${!isSidebarOpen ? 'lg:w-full' : 'lg:w-3/4'}`}>

          <div className={`flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-4 md:mb-8`}>

            {isSidebarOpen ? (
              <div className="hidden lg:flex font-semibold text-xl items-center pb-2">
                <h1 className="text-xl md:text-2xl font-semibold text-[#141718]">{selectedCategory}</h1>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto pb-1">

                <div
                  onClick={() => setIsSidebarOpen(true)}
                  className="flex lg:hidden items-center justify-center gap-2 px-4 py-2.5 bg-gray-50 border-2 border-transparent rounded hover:border-[#141718] cursor-pointer cursor-pointers transition-colors"
                >
                  <IoOptionsOutline className="text-xl" />
                  <span className="font-semibold text-[15px]">Filter</span>
                </div>

   
                <div className="relative w-full sm:w-[220px]">
                  <label className="block text-xs font-semibold text-[#6C7275] mb-2 uppercase tracking-wider">CATEGORIES</label>
                  <div
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer bg-white"
                    onClick={() => {
                      setIsCategoryOpen(!isCategoryOpen);
                      setIsPriceOpen(false);
                    }}
                  >
                    <span className="font-medium text-[#141718] text-sm">{selectedCategory}</span>
                    <RiArrowDropDownLine className={`text-2xl transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isCategoryOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg z-20 py-2">
                      {categories.map((cat) => (
                        <div
                          key={cat}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer font-medium text-sm text-[#141718]"
                          onClick={() => {
                            setSelectedCategory(cat);
                            setIsCategoryOpen(false);
                          }}
                        >
                          {cat}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

          
                <div className="relative w-full sm:w-[220px]">
                  <label className="block text-xs font-semibold text-[#6C7275] mb-2 uppercase tracking-wider">PRICE</label>
                  <div
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 flex justify-between items-center cursor-pointer bg-white"
                    onClick={() => {
                      setIsPriceOpen(!isPriceOpen);
                      setIsCategoryOpen(false);
                    }}
                  >
                    <span className="font-medium text-[#141718] text-sm">{selectedPrices[0]}</span>
                    <RiArrowDropDownLine className={`text-2xl transition-transform ${isPriceOpen ? 'rotate-180' : ''}`} />
                  </div>

                  {isPriceOpen && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg z-20 py-2">
                      {priceRanges.map((range) => (
                        <div
                          key={range.label}
                          className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm font-medium text-[#141718]"
                          onClick={() => {
                            setSelectedPrices([range.label]); 
                            setIsPriceOpen(false);
                          }}
                        >
                          {range.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}


        
            <div className="flex items-center justify-between w-full lg:w-auto gap-4 sm:gap-6 mt-4 lg:mt-0 pb-1">

              <div className="relative group flex items-center gap-1 cursor-pointer">
                <span className="font-semibold text-sm text-[#141718]">Sort by</span>
                <RiArrowDropDownLine className="text-2xl text-[#141718]" />

                <div className="absolute z-[999] right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="flex flex-col py-1 text-sm">
                    <button onClick={() => setSortOption("default")} className={`text-left px-4 py-2 hover:bg-gray-50 ${sortOption === "default" && "font-semibold bg-gray-50"}`}>Default</button>
                    <button onClick={() => setSortOption("az")} className={`text-left px-4 py-2 hover:bg-gray-50 ${sortOption === "az" && "font-semibold bg-gray-50"}`}>Alphabetical (A-Z)</button>
                    <button onClick={() => setSortOption("za")} className={`text-left px-4 py-2 hover:bg-gray-50 ${sortOption === "za" && "font-semibold bg-gray-50"}`}>Alphabetical (Z-A)</button>
                    <button onClick={() => setSortOption("price-low-high")} className={`text-left px-4 py-2 hover:bg-gray-50 ${sortOption === "price-low-high" && "font-semibold bg-gray-50"}`}>Price (Low to High)</button>
                    <button onClick={() => setSortOption("price-high-low")} className={`text-left px-4 py-2 hover:bg-gray-50 ${sortOption === "price-high-low" && "font-semibold bg-gray-50"}`}>Price (High to Low)</button>
                  </div>
                </div>
              </div>

         
              <div className="hidden lg:flex items-center divide-x divide-gray-200 border border-gray-200 rounded overflow-hidden">
                {desktopIcons.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setViewGrid(item.grid);
                      if (item.grid === 4) setIsSidebarOpen(false); 
                      if (item.grid === 3) setIsSidebarOpen(true);  
                    }}
                    className={`p-2 w-10 flex justify-center text-[18px] transition-colors cursor-pointer ${viewGrid === item.grid
                      ? "bg-gray-100 text-[#141718]"
                      : "bg-white text-[#6C7275] hover:text-[#141718] hover:bg-gray-50"
                      }`}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>


              <div className="flex lg:hidden items-center divide-x divide-gray-200 border border-gray-200 rounded overflow-hidden">
                {mobileIcons.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setViewGrid(item.grid)}
                    className={`p-2 text-lg transition-colors cursor-pointer ${viewGrid === item.grid
                      ? "bg-gray-100 text-[#141718]"
                      : "bg-white text-[#6C7275] hover:text-[#141718] hover:bg-gray-50"
                      }`}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>

            </div>
          </div>


          <ShopProductGrid
            products={filteredAndSortedProducts}
            viewGrid={viewGrid}
            visibleCount={visibleCount}
            setVisibleCount={setVisibleCount}
            isSidebarOpen={isSidebarOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;