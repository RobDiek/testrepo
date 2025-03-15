"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import GlassmorphicCard from '@/components/ui/GlassmorphicCard';
import Button from '@/components/ui/Button';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real app, this would be an actual authentication API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, this would validate credentials
      if (email === 'admin@example.com' && password === 'password') {
        // Redirect to admin dashboard
        window.location.href = '/admin/dashboard';
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <GlassmorphicCard className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#0072C6] to-[#29F49A] bg-clip-text text-transparent">
              Admin Login
            </h1>
            <p className="text-white/70 mt-2">
              Sign in to manage your podcasts and episodes
            </p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-white p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-white/80">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-white/50" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50 focus:border-transparent"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-white/80">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-white/50" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-white/20 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#29F49A]/50 focus:border-transparent"
                  placeholder="••••••••"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-white/50 hover:text-white/80 focus:outline-none"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-white/50">
            <p>Demo credentials: admin@example.com / password</p>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
