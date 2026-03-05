"use client";

import Link from "next/link";
import React, { useState, useMemo } from "react";
import { BsGrid3X3GapFill, BsGridFill } from "react-icons/bs";
import { PiColumnsFill, PiRowsFill } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { blogsData } from "./data";

const Blogs = () => {
  const [viewGrid, setViewGrid] = useState<number>(3);
  const [sortOption, setSortOption] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState<number>(9);

  const sortedArticles = useMemo(() => {
    let result = [...blogsData];

    if (sortOption === "az") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "za") {
      result.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "newest") {
      result.sort((a, b) => b.timestamp - a.timestamp);
    } else if (sortOption === "oldest") {
      result.sort((a, b) => a.timestamp - b.timestamp);
    }

    return result;
  }, [sortOption]);

  const desktopIcons = [
    { icon: <BsGrid3X3GapFill />, grid: 4 },
    { icon: <BsGridFill />, grid: 3 },
    { icon: <PiColumnsFill />, grid: 2 },
    { icon: <PiRowsFill />, grid: 1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 space-y-8 md:space-y-12">

      <div
        className="w-full min-h-[300px] md:min-h-[392px] flex items-center justify-center rounded-lg mt-6"
        style={{
          backgroundImage: 'url("/blog.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col justify-center items-center text-center px-4">
          <div className="flex gap-3 text-sm md:text-base font-medium">
            <Link
              href={"/"}
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Home
            </Link>
            <span className="text-gray-400">{">"}</span>
            <Link href={"/blogs"} className="text-black">
              Blog
            </Link>
          </div>
          <h1 className="my-5 font-poppins text-4xl md:text-[54px] font-[500]">
            Our Blog
          </h1>
          <p className="text-base md:text-[20px] text-[#121212]">
            Home ideas and design inspiration
          </p>
        </div>
      </div>


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 border-b md:border-none md:pb-0 gap-4 md:gap-0">
        <div className="flex gap-6 md:gap-10 w-full md:w-auto">
          <h1 className="font-[600] border-b-2 border-black pb-1 text-[#141718] text-sm md:text-base whitespace-nowrap">
            All Blog
          </h1>
          <h1 className="text-gray-400 font-[500] text-sm md:text-base hover:text-gray-800 transition-colors cursor-pointer whitespace-nowrap">
            Featured
          </h1>
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          <div className="relative border border-gray-300 rounded px-2 md:border-none md:p-0 md:rounded-none group flex w-full md:w-auto justify-between md:justify-start">
            <div
              className="flex items-center cursor-pointer py-1.5 md:py-2"
              onClick={() => setIsSortOpen(!isSortOpen)}
            >
              <h1 className="text-sm font-[500] text-[#141718] md:whitespace-nowrap flex-grow">
                {sortOption === "default" ? "Sort by" : sortOption === "newest" ? "Newest" : sortOption === "oldest" ? "Oldest" : sortOption === "az" ? "Title (A-Z)" : "Title (Z-A)"}
              </h1>
              <RiArrowDropDownLine className={`text-3xl text-[#141718] transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
            </div>

            {(isSortOpen || (typeof window !== 'undefined' && window.innerWidth >= 768)) && (
              <div className={`
                absolute right-0 top-full md:top-[100%] mt-1 md:mt-0 w-full md:w-48 bg-white border border-gray-100 shadow-lg rounded-md overflow-hidden z-20 transition-all duration-200
                md:opacity-0 md:invisible group-hover:md:opacity-100 group-hover:md:visible
                ${isSortOpen ? 'opacity-100 visible' : 'opacity-0 invisible max-h-0 md:max-h-none'}
              `}>
                <div className="flex flex-col">
                  <button onClick={() => { setSortOption("default"); setIsSortOpen(false); }} className={`text-left px-4 py-3 md:py-2 text-sm hover:bg-gray-50 ${sortOption === "default" && "font-semibold bg-gray-50"}`}>Default</button>
                  <button onClick={() => { setSortOption("newest"); setIsSortOpen(false); }} className={`text-left px-4 py-3 md:py-2 text-sm hover:bg-gray-50 border-t border-gray-50 md:border-none ${sortOption === "newest" && "font-semibold bg-gray-50"}`}>Newest</button>
                  <button onClick={() => { setSortOption("oldest"); setIsSortOpen(false); }} className={`text-left px-4 py-3 md:py-2 text-sm hover:bg-gray-50 border-t border-gray-50 md:border-none ${sortOption === "oldest" && "font-semibold bg-gray-50"}`}>Oldest</button>
                  <button onClick={() => { setSortOption("az"); setIsSortOpen(false); }} className={`text-left px-4 py-3 md:py-2 text-sm hover:bg-gray-50 border-t border-gray-50 md:border-none ${sortOption === "az" && "font-semibold bg-gray-50"}`}>Title (A-Z)</button>
                  <button onClick={() => { setSortOption("za"); setIsSortOpen(false); }} className={`text-left px-4 py-3 md:py-2 text-sm hover:bg-gray-50 border-t border-gray-50 md:border-none ${sortOption === "za" && "font-semibold bg-gray-50"}`}>Title (Z-A)</button>
                </div>
              </div>
            )}
          </div>

          <div className="hidden md:flex items-center">
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
      <div
        className={`grid gap-6 md:gap-8 transition-all duration-300 w-full ${"grid-cols-1 " +

          (viewGrid === 1
            ? "md:grid-cols-1"
            : viewGrid === 2
              ? "md:grid-cols-2"
              : viewGrid === 3
                ? "md:grid-cols-4"
                : "md:grid-cols-3")
          }`}
      >
        {sortedArticles.slice(0, visibleCount).map((article) => (
          <Link
            href={`/blogs/${article.id}`}
            key={article.id}
            className={`flex flex-col group ${viewGrid === 1 ? 'md:flex-row md:items-center md:gap-8' : ''}`}
          >
            <div className={`overflow-hidden rounded-sm bg-[#F3F5F7] ${viewGrid === 1 ? 'w-full md:w-1/3 shrink-0' : 'w-full'}`}>
              <img
                className={`w-full object-cover object-center transition-transform duration-500 group-hover:scale-105 ${viewGrid === 1 ? 'aspect-[4/3]' : 'aspect-square'}`}
                src={article.img}
                alt={article.title}
              />
            </div>

            <div className={`mt-4 ${viewGrid === 1 ? 'md:mt-0 flex-1' : ''}`}>
              <h3 className={`font-[500] text-[#141718] mb-2 leading-relaxed ${viewGrid === 1 ? 'text-xl md:text-2xl font-semibold' : 'text-base md:text-lg'}`}>
                {article.title}
              </h3>
              <p className="text-[12px] md:text-sm text-[#6C7275] font-medium">
                {article.date}
              </p>

              {viewGrid === 1 && (
                <p className="hidden md:block mt-4 text-[#6C7275] line-clamp-3 leading-relaxed">
                  Discover the secrets to making your home look stunning and professionally designed without breaking the bank. Explore the tools and tips necessary to completely revitalize your indoor spaces to emulate modern trends while maintaining kid-friendly viability.
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>


      {sortedArticles.length > visibleCount && (
        <div className="flex justify-center items-center mt-12 md:mt-20">
          <button
            onClick={() => setVisibleCount((prev) => prev + 3)}
            className="border border-[#141718] text-[#141718] py-2 md:py-2.5 px-8 md:px-10 rounded-[80px] font-[500] hover:bg-[#141718] hover:text-white transition-all duration-300"
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default Blogs;
