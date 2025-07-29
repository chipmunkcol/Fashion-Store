import React, { useState } from "react";
import { Home, Grid3X3, Search, User } from "lucide-react";

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "홈", icon: Home },
    { id: "category", label: "카테고리", icon: Grid3X3 },
    { id: "search", label: "검색", icon: Search },
    { id: "profile", label: "마이페이지", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-bottom z-50">
      <div className="flex">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 min-h-[60px] transition-colors duration-200 tap-highlight-none ${
                isActive ? "text-primary-500" : "text-gray-400"
              }`}
            >
              <Icon
                className={`w-5 h-5 mb-1 ${
                  isActive ? "text-primary-500" : "text-gray-400"
                }`}
              />
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
