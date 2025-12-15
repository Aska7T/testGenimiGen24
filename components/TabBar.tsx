import React from 'react';
import { AppTab } from '../types';
import { Compass, BookOpen, Coffee, ShoppingBag } from 'lucide-react';

interface TabBarProps {
  currentTab: AppTab;
  onTabChange: (tab: AppTab) => void;
  accentColor: string;
}

const TabBar: React.FC<TabBarProps> = ({ currentTab, onTabChange, accentColor }) => {
  const tabs = [
    { id: AppTab.HOME, label: '首页', icon: Compass },
    { id: AppTab.CULTURE, label: '文化', icon: BookOpen },
    { id: AppTab.LIFESTYLE, label: '生活', icon: Coffee },
    { id: AppTab.MALL, label: '商城', icon: ShoppingBag },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 pb-safe z-50 h-20 shadow-lg">
      <div className="flex justify-around items-center h-full pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60'}`}
              style={{ color: isActive ? accentColor : '#57534e' }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium tracking-widest">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabBar;