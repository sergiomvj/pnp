import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';
import AuthModal from '../auth/AuthModal';
import UserProfile from '../auth/UserProfile';

const Header: React.FC = () => {
  const { user, profile } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-black text-paynes-gray dark:text-cambridge-blue">
                Pulse & <span className="text-cambridge-blue dark:text-sage">Perspective</span>
              </h1>
              <p className="ml-4 text-sm text-gray-500 dark:text-gray-400 hidden md:block">
                Para mentes inquietas
              </p>
            </div>

            {/* Navegação Principal */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-cambridge-blue dark:hover:text-sage font-medium transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-cambridge-blue dark:hover:text-sage font-medium transition-colors">
                Categorias
              </a>
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-cambridge-blue dark:hover:text-sage font-medium transition-colors">
                Populares
              </a>
              <a href="#" className="text-gray-900 dark:text-gray-100 hover:text-cambridge-blue dark:hover:text-sage font-medium transition-colors">
                Sobre
              </a>
            </nav>

            {/* Botões de Ação */}
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <button className="p-2 text-gray-500 dark:text-gray-400 hover:text-cambridge-blue dark:hover:text-sage transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <span className="hidden sm:block text-sm text-gray-600 dark:text-gray-400">
                    Olá, {profile?.nickname || user.email?.split('@')[0]}!
                  </span>
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="w-8 h-8 bg-cambridge-blue rounded-full flex items-center justify-center text-white text-sm font-medium hover:bg-paynes-gray transition-colors"
                  >
                    {profile?.nickname?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-cambridge-blue text-white px-4 py-2 rounded-lg hover:bg-paynes-gray dark:hover:bg-sage transition-colors font-medium"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      
      <UserProfile 
        isOpen={showUserProfile} 
        onClose={() => setShowUserProfile(false)} 
      />
    </>
  );
};

export default Header;
