import React from 'react';
import Link from 'next/link';
import { FiGithub, FiTwitter, FiInstagram } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 mt-auto">
      <div className="container mx-auto">
        <div className="glass-panel p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
                PodcastApp
              </h3>
              <p className="text-white/70 mb-4">
                A modern podcast player with a sleek, intuitive UI and powerful features.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FiTwitter size={20} />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FiGithub size={20} />
                </a>
                <a href="#" className="text-white/70 hover:text-white transition-colors">
                  <FiInstagram size={20} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-white/70 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/podcast" className="text-white/70 hover:text-white transition-colors">
                    Podcasts
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="text-white/70 hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-white/70 hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-white/10 text-center text-white/50 text-sm">
            <p>© {new Date().getFullYear()} PodcastApp. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
