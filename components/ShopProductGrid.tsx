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
}

const ShopProductGrid = ({
    products,
    viewGrid,
    visibleCount,
    setVisibleCount,
}: ShopProductGridProps) => {
    if (products.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-gray-500">
                <p>No products found tracking these filters.</p>
            </div>
        );
    }

    return (
        <>
            <div
                className={`grid gap-4 md:gap-6 pb-4 transition-all duration-300 ${viewGrid === 1
                        ? "grid-cols-1"
                        : viewGrid === 2
                            ? "grid-cols-2"
                            : viewGrid === 3
                                ? "grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-2 lg:grid-cols-4"
                    }`}
            >
                {products.slice(0, visibleCount).map((card) => (
                    <div
                        key={card.id}
                        className={`group relative flex ${viewGrid === 1
                                ? "flex-row items-center p-4 border rounded-lg gap-6"
                                : "flex-col"
                            }`}
                    >
                        <div
                            className={`relative bg-[#F3F5F7] flex items-center justify-center overflow-hidden rounded-md ${viewGrid === 1
                                    ? "w-40 md:w-60 shrink-0 aspect-square"
                                    : "w-full aspect-[3/4]"
                                }`}
                        >
                            <img
                                className="w-full h-full object-cover object-center mix-blend-multiply"
                                src={card.img}
                                alt={card.title}
                            />

                            <div className="w-full absolute top-0 p-3 md:p-4 flex justify-between items-start">
                                <div className="flex flex-col gap-2">
                                    {card.isNew && (
                                        <div className="bg-[#FFFFFF] text-[#141718] font-bold text-[10px] md:text-sm py-1 px-3 rounded flex justify-center items-center uppercase shadow-sm">
                                            New
                                        </div>
                                    )}
                                    {card.discount && (
                                        <div className="bg-[#38CB89] text-white font-bold text-[10px] md:text-sm py-1 px-3 rounded flex justify-center items-center shadow-sm">
                                            {card.discount}
                                        </div>
                                    )}
                                </div>
                                <div className="opacity-0 group-hover:opacity-100 cursor-pointer w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                                    <GoHeart className="text-[#6C7275] text-lg" />
                                </div>
                            </div>

                            <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 left-3 right-3 md:left-4 md:right-4 bottom-3 md:bottom-4 py-2 md:py-2.5 rounded-lg bg-black flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-800 hover:scale-[1.02]">
                                <h2 className="text-white font-[500] text-sm md:text-base">
                                    Add to cart
                                </h2>
                            </div>
                        </div>

                        <div className={`mt-3 ${viewGrid === 1 ? "mt-0 flex-1" : ""}`}>
                            <div className="flex text-[#141718] mb-1.5 md:mb-2 text-sm md:text-base">
                                {[...Array(5)].map((_, i) => (
                                    <IoMdStar key={i} />
                                ))}
                            </div>
                            <h3
                                className={`font-[600] text-[#141718] mb-1 truncate ${viewGrid === 1 ? "text-xl mb-2" : "text-sm md:text-base"
                                    }`}
                            >
                                {card.title}
                            </h3>
                            <div className="flex gap-2.5 items-center mt-1">
                                <p
                                    className={`font-[600] text-[#141718] ${viewGrid === 1 ? "text-lg" : "text-sm md:text-base"
                                        }`}
                                >
                                    ${card.price.toFixed(2)}
                                </p>
                                {card.MRP > 0 && (
                                    <p
                                        className={`line-through text-[#6C7275] ${viewGrid === 1 ? "text-base" : "text-xs md:text-sm"
                                            }`}
                                    >
                                        ${card.MRP.toFixed(2)}
                                    </p>
                                )}
                            </div>

                            {viewGrid === 1 && (
                                <p className="mt-4 text-[#6C7275] text-sm line-clamp-3">
                                    Beautiful and modern piece to complement your space. Made with
                                    high-quality materials and designed for extended durability and
                                    comfort.
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {products.length > visibleCount && (
                <div className="flex justify-center mt-10">
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
