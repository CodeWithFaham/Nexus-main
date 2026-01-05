import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, Building2, CircleDollarSign, Users, MessageCircle, 
  Bell, FileText, Settings, HelpCircle, Calendar, Wallet, Video
} from 'lucide-react';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, text }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `flex items-center py-2.5 px-4 rounded-md transition-colors duration-200 ${
          isActive 
            ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700' 
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`
      }
    >
      <span className="mr-3">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
    </NavLink>
  );
};

export const Sidebar: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;
  
  // Entrepreneur Items
  const entrepreneurItems = [
    { to: '/dashboard/entrepreneur', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/calendar', icon: <Calendar size={20} />, text: 'Meetings' },
    { to: '/profile/entrepreneur/' + user.id, icon: <Building2 size={20} />, text: 'My Startup' },
    { to: '/investors', icon: <CircleDollarSign size={20} />, text: 'Find Investors' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/documents', icon: <FileText size={20} />, text: 'Doc Chamber' },
    // FIX: /wallet ko /payments kar diya taaki App.tsx se match kare
    { to: '/payments', icon: <Wallet size={20} />, text: 'Wallet' }, 
  ];
  
  // Investor Items
  const investorItems = [
    { to: '/dashboard/investor', icon: <Home size={20} />, text: 'Dashboard' },
    { to: '/notifications', icon: <Bell size={20} />, text: 'Notifications' },
    { to: '/calendar', icon: <Calendar size={20} />, text: 'Schedule' },
    { to: '/profile/investor/' + user.id, icon: <CircleDollarSign size={20} />, text: 'Portfolio' },
    { to: '/entrepreneurs', icon: <Users size={20} />, text: 'Find Startups' },
    { to: '/messages', icon: <MessageCircle size={20} />, text: 'Messages' },
    { to: '/deals', icon: <FileText size={20} />, text: 'Investment Deals' },
    // FIX: /wallet ko /payments kar diya taaki App.tsx se match kare
    { to: '/payments', icon: <Wallet size={20} />, text: 'Finances' }, 
  ];
  
  const sidebarItems = user.role === 'entrepreneur' ? entrepreneurItems : investorItems;
  
  const commonItems = [
    { to: '/settings', icon: <Settings size={20} />, text: 'Settings' },
    { to: '/help', icon: <HelpCircle size={20} />, text: 'Help & Support' },
  ];
  
  return (
    <div className="w-64 bg-white h-full border-r border-gray-200 hidden md:block shadow-sm">
      <div className="h-full flex flex-col">
        {/* Logo Section */}
        <div className="p-6">
           <h2 className="text-2xl font-bold text-blue-600">NEXUS</h2>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          <div className="px-3 space-y-1">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase mb-2">Main Menu</p>
            {sidebarItems.map((item, index) => (
              <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
            ))}
          </div>
          
          <div className="mt-8 px-3">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              System
            </h3>
            <div className="mt-2 space-y-1">
              {commonItems.map((item, index) => (
                <SidebarItem key={index} to={item.to} icon={item.icon} text={item.text} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Quick Meeting Section */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
            {/* Week 2: Video Call Page par bhejne ke liye Link use kar sakte hain */}
           <NavLink to="/video-call" className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
             <Video size={16} /> Quick Meeting
           </NavLink>
        </div>
      </div>
    </div>
  );
};