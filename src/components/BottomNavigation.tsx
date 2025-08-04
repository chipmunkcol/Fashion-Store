import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Grid3X3, Search, User, ShoppingCart } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCartStore();

  const [activeTab, setActiveTab] = useState("home");
  const cartItemCount = getTotalItems();

  const tabs = [
    { id: "home", label: "홈", icon: Home, path: "/" },
    // { id: "category", label: "카테고리", icon: Grid3X3, path: "/category" },
    {
      id: "cart",
      label: "장바구니",
      icon: ShoppingCart,
      path: "/cart",
      badge: cartItemCount,
    },
    // { id: "search", label: "검색", icon: Search, path: "/search" },
    // { id: "profile", label: "마이페이지", icon: User, path: "/profile" },
  ];

  const handleTabClick = (tab: (typeof tabs)[0]) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <nav className="max-w-screen-sm mx-auto fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors duration-200 tap-highlight-none relative ${
                isActive ? "text-primary-500" : "text-gray-400"
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 mb-1 ${
                    isActive ? "text-primary-500" : "text-gray-400"
                  }`}
                />
                {/* Cart Badge */}
                {tab.id === "cart" && tab.badge !== undefined && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {tab.badge > 99 ? "99+" : tab.badge}
                  </div>
                )}
              </div>
              <span
                className={`text-xs font-medium ${
                  isActive ? "text-primary-500" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;
