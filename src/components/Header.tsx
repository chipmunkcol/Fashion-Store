import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import { categories } from "../data/mockData";
import { useProductStore } from "../stores/useProductStore";

const Header: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const { searchQuery, selectedCategory, setSearchQuery, setSelectedCategory } =
    useProductStore();

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-gray-200">
      {/* Search Bar */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="상품명, 브랜드명을 검색하세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border-0 rounded-lg text-sm placeholder-gray-500 focus:bg-white focus:ring-2 focus:ring-primary-500 focus:outline-none transition-all duration-200"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 tap-highlight-none"
          >
            <Filter className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 pb-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.slug)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 tap-highlight-none ${
                selectedCategory === category.slug
                  ? "bg-primary-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Options (collapsible) */}
      {showFilters && (
        <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
          <div className="py-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">정렬</h3>
            <div className="flex gap-2 flex-wrap">
              {[
                { key: "newest", label: "최신순" },
                { key: "popular", label: "인기순" },
                { key: "price-low", label: "낮은가격순" },
                { key: "price-high", label: "높은가격순" },
                { key: "review", label: "리뷰많은순" },
              ].map((sort) => (
                <button
                  key={sort.key}
                  className="px-3 py-1.5 bg-white rounded-md text-xs text-gray-600 border border-gray-200 hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 tap-highlight-none"
                >
                  {sort.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
