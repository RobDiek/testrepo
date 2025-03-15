import React from 'react';
import Link from 'next/link';
import { FiHome, FiSearch, FiUser } from 'react-icons/fi';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 glass-panel mb-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
            PodcastApp
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/podcast" className="text-white/80 hover:text-white transition-colors">
            Podcasts
          </Link>
          <Link href="/admin" className="text-white/80 hover:text-white transition-colors">
            Admin
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <FiSearch className="text-white/80" size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors md:hidden">
            <FiHome className="text-white/80" size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <FiUser className="text-white/80" size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
