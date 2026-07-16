"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({ totalProducts, limit, currentPage }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalProducts / limit);

  // যদি মোট পেজ ১ বা তার কম হয়, তবে প্যাগিনেশন দেখানোর প্রয়োজন নেই
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // ডাইনামিক পেজ নাম্বার জেনারেট করার লজিক (১ ২ ৩ ... ১২ ১৩ ১৪ এর জন্য)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // শুরুর পেজগুলো
      if (currentPage <= maxVisiblePages) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } 
      // শেষের পেজগুলো
      else if (currentPage > totalPages - maxVisiblePages) {
        for (let i = 1; i <= 3; i++) pages.push(i);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } 
      // মাঝখানের পেজগুলো
      else {
        pages.push(1, 2);
        pages.push("...");
        pages.push(currentPage - 1, currentPage, currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 md:gap-2 mt-12 font-poppins select-none">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg text-[#777777] hover:text-[#eb6e1b] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={20} />
      </button>

      {/* Page Numbers */}
      {getPageNumbers().map((page, index) => {
        if (page === "...") {
          return (
            <span key={`dots-${index}`} className="px-3 py-1.5 text-gray-400">
              ...
            </span>
          );
        }

        const isActive = currentPage === page;

        return (
          <button
            key={`page-${page}`}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-1.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              isActive
                ? "bg-[#eb6e1b] text-white font-semibold"
                : "text-black hover:text-[#eb6e1b]"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg text-[#777777] hover:text-[#eb6e1b] transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;