"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { Range, getTrackBackground } from "react-range";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";

const MIN_PRICE_LIMIT = 0;
const MAX_PRICE_LIMIT = 50000;
const STEP = 10; 

const ProductToolbar = ({ totalProducts, currentShowing }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceValues, setPriceValues] = useState([
    parseInt(searchParams.get("minPrice") || MIN_PRICE_LIMIT, 10),
    parseInt(searchParams.get("maxPrice") || MAX_PRICE_LIMIT, 10),
  ]);
  
  const currentView = searchParams.get("view") || "4";
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleParamChange = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePriceFilterSubmit = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("minPrice", priceValues[0].toString());
    params.set("maxPrice", priceValues[1].toString());
    router.push(`?${params.toString()}`, { scroll: false });
    setIsFilterOpen(false); 
  };

  return (
    <div className="bg-black px-6 py-4 rounded-md grid grid-cols-1 md:grid-cols-3 items-center gap-4 font-poppins text-white mb-6 relative">
      <div className="flex items-center gap-4 justify-self-start">
        <div className="relative" ref={popupRef}>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 font-medium transition-all py-1 px-2 rounded cursor-pointer ${
              isFilterOpen ? "text-[#eb6e1b]" : "text-white hover:text-[#eb6e1b]"
            }`}
          >
            <SlidersHorizontal size={18} />
            <span className="text-white font-semibold hover:text-[#eb6e1b]">Filter</span>
          </button>

          {isFilterOpen && (
            <div className="absolute left-0 mt-3 w-80 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-50 transition-all duration-200 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-black font-poppins">Filter By Price</h3>
                <button 
                  onClick={() => setIsFilterOpen(false)} 
                  className="text-gray-400 hover:text-black transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4 pt-1 pb-2">
                <Range
                  values={priceValues}
                  step={STEP}
                  min={MIN_PRICE_LIMIT}
                  max={MAX_PRICE_LIMIT}
                  onChange={(values) => setPriceValues(values)}
                  renderTrack={({ props, children }) => (
                    <div
                      onMouseDown={props.onMouseDown}
                      onTouchStart={props.onTouchStart}
                      className="w-full flex h-1.5"
                    >
                      <div
                        ref={props.ref}
                        className="h-1.5 w-full rounded-full self-center"
                        style={{
                          background: getTrackBackground({
                            values: priceValues,
                            colors: ["#eee", "#eb6e1b", "#eee"],
                            min: MIN_PRICE_LIMIT,
                            max: MAX_PRICE_LIMIT,
                          }),
                        }}
                      >
                        {children}
                      </div>
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      className="h-4 w-1.5 bg-[#eb6e1b] rounded focus:outline-none focus:ring-1 focus:ring-[#eb6e1b]"
                      style={{ ...props.style }}
                    />
                  )}
                />

                <div className="flex items-center gap-1 font-poppins text-gray-500 text-sm mt-4">
                  <span>Price:</span>
                  <span className="text-white font-semibold font-sans">{priceValues[0].toLocaleString()}৳</span>
                  <span className="text-white">—</span>
                  <span className="text-white font-semibold font-sans">{priceValues[1].toLocaleString()}৳</span>
                </div>
              </div>

              <div className="flex items-center justify-start mt-5 pt-4 border-t border-gray-50">
                <button 
                  onClick={handlePriceFilterSubmit}
                  className="bg-[#eb6e1b] text-white hover:bg-black font-semibold px-5 py-2.5 rounded-lg text-sm transition-all shadow-sm font-poppins cursor-pointer"
                >
                  Filter
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="h-5 w-[1px] bg-gray-300 mx-10"></div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => handleParamChange("view", "4")}
            className={`transition-colors cursor-pointer ${currentView === "4" ? "text-[#eb6e1b]" : "text-white hover:text-[#eb6e1b]"}`}
            title="4 Grid View"
          >
            <TfiLayoutGrid4Alt size={20} />
          </button>

          <button 
            onClick={() => handleParamChange("view", "5")}
            className={`flex items-center gap-[2px] transition-colors cursor-pointer ${currentView === "5" ? "text-[#eb6e1b]" : "text-white hover:text-[#eb6e1b]"}`}
            title="5 Grid View"
          >
            <span className="grid grid-cols-3 gap-[2px] w-[11px] h-[11px]">
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
            </span>
            <span className="grid grid-cols-2 gap-[2px] w-[7px] h-[11px]">
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
              <span className="bg-current rounded-[1px]"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Middle Section: Showing Result Status */}
      <div className="text-sm justify-self-center select-none text-[#eb6e1b] mr-20">
        Showing 1–{currentShowing} of {totalProducts} results
      </div>

      {/* Right Section: Show count & Sort */}
      <div className="flex items-center gap-6 justify-self-end w-full md:w-auto justify-between md:justify-end">
        {/* Show Limit Dropdown */}
        <div className="flex items-center gap-2">
          <span>Show:</span>
          <select
            value={searchParams.get("limit") || "16"}
            onChange={(e) => handleParamChange("limit", e.target.value)}
            className="bg-white px-4 py-1 text-center border border-transparent focus:outline-none w-16 text-black cursor-pointer rounded-tr-2xl rounded-bl-2xl"
          >
            <option value="8">8</option>
            <option value="16">16</option>
            <option value="32">32</option>
          </select>
        </div>

        {/* Sort Dropdown (Updated) */}
        <div className="flex items-center gap-2">
          <span>Short by</span>
          <select
            value={searchParams.get("sort") || "default"}
            onChange={(e) => handleParamChange("sort", e.target.value)}
            className="bg-white px-4 py-1 min-w-[150px] border border-transparent focus:outline-none text-gray-700 cursor-pointer rounded-tl-2xl rounded-br-2xl"
          >
            <option value="default">Default</option>
            <option value="popularity">Sort by Popularity</option>
            <option value="latest">Sort by Latest</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductToolbar;