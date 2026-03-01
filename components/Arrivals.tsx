import ButtonText from "./ButtonText";
import { IoMdStar } from "react-icons/io";
import { GoHeart } from "react-icons/go";

const Arrivals = () => {
  const arrivals = [
    {
      img: "/sofa.png",
      title: "Loveseat Sofa",
      price: "$199.00",
      MRP: "$400.00",
    },
    {
      img: "/lamp.png",
      title: "Table Lamp",
      price: "$24.99",
      MRP: "",
    },
    {
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: "$24.99",
      MRP: "",
    },
    {
      img: "/bascket.png",
      title: "Bamboo basket",
      price: "$24.99",
      MRP: "",
    },
    {
      img: "/lamp.png",
      title: "Table Lamp",
      price: "$24.99",
      MRP: "",
    },
    {
      img: "/lamp2.png",
      title: "Beige Table Lamp",
      price: "$24.99",
      MRP: "",
    },
    {
      img: "/bascket.png",
      title: "Bamboo basket",
      price: "$24.99",
      MRP: "",
    },
  ];
  return (
    <div className="w-full">
      <div className="px-5 md:px-10 lg:px-40 pt-5 md:pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-0">
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-[500] leading-[1.1]">
            New <br className="block sm:hidden" /> Arrivals
          </h1>
          <div className="hidden md:block self-end">
            <ButtonText text="More Products" linkTo="shop" />
          </div>
        </div>
      </div>

      <div className="pl-5 md:pl-10 lg:pl-40 mt-6 md:mt-10 flex gap-4 md:gap-6 overflow-x-auto pb-4 no-scrollbar">
        {arrivals.map((card, idx) => (
          <div key={idx} className="group w-[220px] md:w-[262px] flex-shrink-0 flex flex-col relative pb-4">
            <div className="relative w-full aspect-[4/5] bg-[#F3F5F7] flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover object-center" src={card.img} alt={card.title} />

              <div className="w-full absolute top-0 p-3 md:p-4 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#FFFFFF] text-[#141718] font-bold text-[11px] md:text-sm py-1 px-3 rounded flex justify-center items-center uppercase shadow-sm">
                    New
                  </div>
                  <div className="bg-[#38CB89] text-white font-bold text-[11px] md:text-sm py-1 px-3 rounded flex justify-center items-center shadow-sm">
                    -50%
                  </div>
                </div>
                <div className="opacity-0 group-hover:opacity-100 cursor-pointer w-8 h-8 bg-white shadow-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-gray-100">
                  <GoHeart className="text-[#6C7275] text-lg" />
                </div>
              </div>

              <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 left-3 right-3 md:left-4 md:right-4 bottom-3 md:bottom-4 py-2 md:py-3 rounded-lg bg-black flex items-center justify-center cursor-pointer shadow-lg hover:bg-gray-800 hover:scale-[1.02]">
                <h2 className="text-white font-[500] text-sm md:text-base">Add to cart</h2>
              </div>
            </div>

            <div className="my-3">
              <div className="flex text-[#141718] mb-1.5 md:mb-2 text-sm md:text-base">
                {[...Array(5)].map((_, i) => (
                  <IoMdStar key={i} />
                ))}
              </div>
              <h3 className="font-[600] text-base md:text-lg mb-1">{card.title}</h3>
              <div className="flex gap-2.5 items-center mt-1">
                <p className="text-sm md:text-base font-[600] text-[#141718]">{card.price}</p>
                {card.MRP && <p className="text-xs md:text-sm line-through text-[#6C7275]">{card.MRP}</p>}
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="px-5 md:px-10 lg:px-40 mt-4 md:mt-8 flex md:hidden items-center justify-center">
        <div className="w-full sm:w-[50%] h-[3px] bg-[#E8ECEF] relative rounded-full overflow-hidden">
          <div className="w-1/3 h-full bg-[#141718] absolute left-0 top-0 rounded-full"></div>
        </div>
      </div>

      <div className="md:hidden px-5 mt-6 pb-8">
        <ButtonText text="More Products" linkTo="shop" />
      </div>
    </div>
  );
};

export default Arrivals;
