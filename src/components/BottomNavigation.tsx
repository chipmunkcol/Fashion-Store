import { Home, ShoppingCart, Heart } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useProductStore } from "../stores/useProductStore";

const BottomNavigation: React.FC = () => {
  const navigate = useNavigate();
  const { getTotalItems } = useCartStore();
  const { likedProducts } = useProductStore();

  const [activeTab, setActiveTab] = useState("home");
  const cartItemCount = getTotalItems();
  const likedItemCount = likedProducts.size;

  const tabs = [
    { id: "home", label: "홈", icon: Home, path: "/" },
    {
      id: "wishlist",
      label: "찜",
      icon: Heart,
      path: "/wishlist",
      badge: likedItemCount,
    },
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
                {/* Badge */}
                {(tab.id === "cart" || tab.id === "wishlist") &&
                  tab.badge !== undefined &&
                  tab.badge > 0 && (
                    <div
                      className={`absolute -top-2 -right-2 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 ${
                        tab.id === "wishlist" ? "bg-primary-500" : "bg-red-500"
                      }`}
                    >
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
