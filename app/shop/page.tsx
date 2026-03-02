"use client";

import { useState, useMemo } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(8);

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
      img: "/lamp.png",
      title: "Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 3,
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 4,
      img: "/bascket.png",
      title: "Bamboo basket",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 5,
      img: "/lamp.png",
      title: "Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 6,
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 7,
      img: "/bascket.png",
      title: "Bamboo basket",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 8,
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 9,
      img: "/bascket.png",
      title: "Bamboo basket",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 10,
      img: "/lamp.png",
      title: "Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 11,
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
    },
    {
      id: 12,
      img: "/bascket.png",
      title: "Bamboo basket",
      price: 24.99,
      MRP: 0,
      category: "Living Room",
      isNew: true,
      discount: "-50%",
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
      <ShopHeader />

      <div className="flex flex-col lg:flex-row gap-8 my-8 md:my-12">

        <div className="flex flex-col gap-4 lg:hidden">

          <div className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm border border-gray-100">
            <div
              className="flex gap-2 font-[500] items-center cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <IoOptionsOutline className="text-xl" />
              <h2 className="text-base">Filter</h2>
            </div>
            <div className="flex items-center">
              {mobileIcons.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setViewGrid(item.grid)}
                  className={`border p-2 text-xl border-gray-300 transition-colors cursor-pointer ${viewGrid === item.grid
                    ? "bg-gray-200 text-black border-gray-400"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                >
                  {item.icon}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-2 px-1">
            <h1 className="font-[600] text-lg">{selectedCategory}</h1>
            <div className="relative">
              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsSortOpen(!isSortOpen)}
              >
                <h1 className="text-sm font-[500]">Sort by</h1>
                <RiArrowDropDownLine className="text-3xl" />
              </div>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 shadow-xl rounded-md overflow-hidden z-20">
                  <div className="flex flex-col">
                    <button
                      onClick={() => {
                        setSortOption("default");
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm hover:bg-gray-50 ${sortOption === "default" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("az");
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm hover:bg-gray-50 border-t border-gray-100 ${sortOption === "az" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Alphabetical (A-Z)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("za");
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm hover:bg-gray-50 border-t border-gray-100 ${sortOption === "za" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Alphabetical (Z-A)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("price-low-high");
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm hover:bg-gray-50 border-t border-gray-100 ${sortOption === "price-low-high" &&
                        "font-semibold bg-gray-50"
                        }`}
                    >
                      Price (Low to High)
                    </button>
                    <button
                      onClick={() => {
                        setSortOption("price-high-low");
                        setIsSortOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm hover:bg-gray-50 border-t border-gray-100 ${sortOption === "price-high-low" &&
                        "font-semibold bg-gray-50"
                        }`}
                    >
                      Price (High to Low)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <ShopSidebar
          isFilterOpen={isFilterOpen}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRanges={priceRanges}
          selectedPrices={selectedPrices}
          handlePriceChange={handlePriceChange}
        />

        <div className="w-full lg:w-3/4">
          <div className="hidden lg:flex justify-between items-center mb-8">
            <h1 className="font-[600] text-xl">{selectedCategory}</h1>
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="flex items-center cursor-pointer py-2">
                  <h1 className="text-sm font-[500] text-[#141718]">Sort by</h1>
                  <RiArrowDropDownLine className="text-3xl text-[#141718]" />
                </div>

                <div className="absolute right-0 top-[100%] w-48 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                  <div className="flex flex-col">
                    <button
                      onClick={() => setSortOption("default")}
                      className={`text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "default" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Default
                    </button>
                    <button
                      onClick={() => setSortOption("az")}
                      className={`text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "az" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Alphabetical (A-Z)
                    </button>
                    <button
                      onClick={() => setSortOption("za")}
                      className={`text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "za" && "font-semibold bg-gray-50"
                        }`}
                    >
                      Alphabetical (Z-A)
                    </button>
                    <button
                      onClick={() => setSortOption("price-low-high")}
                      className={`text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "price-low-high" &&
                        "font-semibold bg-gray-50"
                        }`}
                    >
                      Price (Low to High)
                    </button>
                    <button
                      onClick={() => setSortOption("price-high-low")}
                      className={`text-left px-4 py-2 text-sm hover:bg-gray-50 ${sortOption === "price-high-low" &&
                        "font-semibold bg-gray-50"
                        }`}
                    >
                      Price (High to Low)
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                {desktopIcons.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setViewGrid(item.grid)}
                    className={`border p-2 text-xl transition-colors cursor-pointer ${viewGrid === item.grid
                      ? "bg-gray-100 text-black border-gray-300"
                      : "border-gray-200 text-[#807E7E] hover:text-black hover:bg-gray-50"
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
          />
        </div>
      </div>
    </div>
  );
};

export default Shop;
