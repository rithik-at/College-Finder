'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useSession, signIn, signOut } from "next-auth/react";

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/colleges', label: 'Colleges' },
  { href: '/compare', label: 'Compare' },
  { href: '/predict', label: 'Predictor' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/resources', label: 'Resources' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();

  const isHome = pathname === '/';
  const isBlueHeaderPage = ['/colleges', '/compare', '/predict', '/analytics', '/placements', '/scholarships', '/resources'].some(path => pathname === path || pathname.startsWith(`${path}/`));
  const isDarkText = isHome || isBlueHeaderPage;

  return (
    <nav className={cn(
      "z-50 transition-colors duration-300",
      isHome ? "absolute top-0 left-0 w-full bg-transparent border-transparent" : 
      isBlueHeaderPage ? "relative bg-[#1e3a5f] border-transparent" : "relative bg-white border-b border-gray-100 shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group mt-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <span className={cn(
              "text-xl font-bold tracking-tight",
              isDarkText ? "text-white drop-shadow-md" : "text-[#1e3a5f]"
            )}>
              CollegeHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? (isDarkText ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-[#1e3a5f] text-white shadow-md')
                      : (isDarkText ? 'text-gray-100 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50')
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {/* Auth Button */}
            {session ? (
              <div className="flex items-center gap-3 ml-2 pl-4 border-l border-gray-300">
                <div className="flex items-center gap-2 cursor-pointer group relative">
                  {session.user?.image ? (
                    <img src={session.user.image} alt="Profile" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-[#ff7900] text-white flex items-center justify-center font-bold">
                      {session.user?.name?.charAt(0) || session.user?.email?.charAt(0) || 'U'}
                    </div>
                  )}
                  {/* Dropdown Menu on Hover */}
                  <div className="absolute top-[120%] right-0 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50 origin-top-right">
                    {/* Colorful Header */}
                    <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a8e] px-5 py-4 text-white">
                      <p className="text-sm font-bold truncate">{session.user?.name || "Student User"}</p>
                      <p className="text-xs text-indigo-100 truncate mt-0.5">{session.user?.email}</p>
                    </div>
                    {/* Action Links */}
                    <div className="p-2 bg-white">
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors group/btn"
                      >
                        <svg className="w-4 h-4 text-gray-400 group-hover/btn:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className={cn(
                  "ml-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 shadow-md hover:-translate-y-0.5",
                  isDarkText ? "bg-white text-[#1e3a5f] hover:bg-gray-50" : "bg-[#1e3a5f] text-white hover:bg-[#2d5a8e]"
                )}
              >
                Log In
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              "md:hidden p-2 mt-1 rounded-lg transition-colors",
              isDarkText ? "text-white hover:bg-white/10" : "text-gray-600 hover:bg-gray-100"
            )}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden absolute top-[100%] left-0 w-full bg-white shadow-xl border-t border-gray-100 animate-fade-in z-50">
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-xl text-base font-medium transition-colors',
                      isActive
                        ? 'bg-[#1e3a5f] text-white shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
