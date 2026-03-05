import { IoMdStar } from "react-icons/io";
import { GoHeart } from "react-icons/go";

interface Product {
    id: number;
    img: string;
    title: string;
    price: number;
    MRP: number;
    category: string;
    isNew?: boolean;
    discount?: string;
}

interface ShopProductGridProps {
    products: Product[];
    viewGrid: number;
    visibleCount: number;
    setVisibleCount: (count: number | ((prev: number) => number)) => void;
    isSidebarOpen?: boolean;
}

const ShopProductGrid = ({
    products,
    viewGrid,
    visibleCount,
    setVisibleCount,
    isSidebarOpen = false,
}: ShopProductGridProps) => {
    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-[#6C7275]">
                <p>No products found tracking these filters.</p>
            </div>
        );
    }

    // Determine grid columns dynamically based on layout icon and sidebar state
    const getGridColsClass = () => {
        if (viewGrid === 1) return "grid-cols-1";
        if (viewGrid === 2) return "grid-cols-1 md:grid-cols-2";
        if (viewGrid === 3) return "grid-cols-2 lg:grid-cols-3"; // Always 3 columns on large screens
        if (viewGrid === 4) return isSidebarOpen ? "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 lg:grid-cols-4";
        return "grid-cols-4";
    };

    return (
        <>
            <div
                className={`grid gap-4 md:gap-6 pb-4 transition-all duration-300 ${getGridColsClass()}`}
            >
                {products.slice(0, visibleCount).map((card) => {
                    const isHorizontal = viewGrid <= 2;

                    return (
                        <div
                            key={card.id}
                            className={`group relative flex ${isHorizontal
                                ? "flex-row gap-6 p-0" // Removed the border block entirely
                                : "flex-col"
                                }`}
                        >
                            {/* Image Section */}
                            <div
                                className={`relative bg-[#F3F5F7] flex items-center justify-center overflow-hidden rounded ${isHorizontal
                                    ? "w-[40%] md:w-[260px] shrink-0 aspect-[4/5] md:aspect-square"
                                    : "w-full aspect-[4/5]"
                                    }`}
                            >
                                <img
                                    className="w-full h-full object-cover object-center mix-blend-multiply"
                                    src={card.img}
                                    alt={card.title}
                                />

                                {/* Badges */}
                                <div className="w-full absolute top-0 p-3 flex justify-between items-start z-10">
                                    <div className="flex flex-col gap-2">
                                        {card.isNew && (
                                            <div className="bg-[#FFFFFF] text-[#141718] font-bold text-[10px] md:text-xs py-1 px-2.5 rounded flex justify-center items-center shadow-sm">
                                                NEW
                                            </div>
                                        )}
                                        {card.discount && (
                                            <div className="bg-[#38CB89] text-white font-bold text-[10px] md:text-xs py-1 px-2.5 rounded flex justify-center items-center shadow-sm">
                                                {card.discount}
                                            </div>
                                        )}
                                    </div>

                                    {/* Wishlist only overlayed on Vertical format */}
                                    {!isHorizontal && (
                                        <div className="opacity-0 group-hover:opacity-100 cursor-pointer w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110">
                                            <GoHeart className="text-[#6C7275] text-lg" />
                                        </div>
                                    )}
                                </div>

                                {/* Hover Button only overlayed on Vertical format */}
                                {!isHorizontal && (
                                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 left-3 right-3 bottom-3 py-2.5 rounded bg-[#141718] flex items-center justify-center cursor-pointer shadow-lg hover:bg-black">
                                        <h2 className="text-white font-[500] text-sm">
                                            Add to cart
                                        </h2>
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className={`mt-3 ${isHorizontal ? "mt-0 flex-1 flex flex-col justify-center py-2" : ""}`}>
                                {/* Rating block */}
                                <div className={`flex text-[#141718] mb-1.5 md:mb-2 ${isHorizontal ? "text-base mt-2" : "text-[14px]"}`}>
                                    {[...Array(5)].map((_, i) => (
                                        <IoMdStar key={i} />
                                    ))}
                                </div>

                                {/* Title */}
                                <h3 className={`font-semibold text-[#141718] mb-1 truncate ${isHorizontal ? "text-lg mb-2" : "text-[15px]"}`}>
                                    {card.title}
                                </h3>

                                {/* Pricing */}
                                <div className="flex gap-2.5 items-center mt-0.5">
                                    <p className={`font-semibold text-[#141718] ${isHorizontal ? "text-lg" : "text-sm"}`}>
                                        ${Number(card.price).toFixed(2)}
                                    </p>
                                    {card.MRP > 0 && (
                                        <p className={`line-through text-[#6C7275] ${isHorizontal ? "text-base" : "text-xs"}`}>
                                            ${Number(card.MRP).toFixed(2)}
                                        </p>
                                    )}
                                </div>

                                {/* Extra content for Horizontal cards */}
                                {isHorizontal && (
                                    <>
                                        {/* Description only on single column wide view usually, simulating generic description here */}
                                        <p className="mt-4 text-[#6C7275] text-sm line-clamp-2 md:line-clamp-3 mb-6 pr-4">
                                            Super-soft cushion cover in off-white with a tactile pattern that enhances the different tones in the pile and base.
                                        </p>

                                        {/* Horizontal actions */}
                                        <div className="flex flex-col gap-4 max-w-[280px]">
                                            <button className="w-full py-3 bg-[#141718] text-white rounded font-medium text-[15px] hover:bg-black transition-colors">
                                                Add to cart
                                            </button>
                                            <button className="w-full flex items-center justify-center gap-2 text-[#141718] font-medium text-[15px] hover:text-[#6C7275] transition-colors">
                                                <GoHeart className="text-xl" />
                                                Wishlist
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {products.length > visibleCount && (
                <div className="flex justify-center mt-12 mb-8">
                    <button
                        onClick={() => setVisibleCount((prev) => prev + 4)}
                        className="px-10 py-2 border border-[#141718] text-[#141718] rounded-[80px] font-[500] hover:bg-[#141718] hover:text-white transition-all duration-300"
                    >
                        Show more
                    </button>
                </div>
            )}
        </>
    );
};

export default ShopProductGrid;
