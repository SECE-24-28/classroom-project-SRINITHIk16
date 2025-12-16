import { Link, useNavigate } from 'react-router-dom';
import { Smartphone, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Smartphone className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-dark">RechargeHub</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">Home</Link>
            <Link to="/recharge-plans" className="text-gray-700 hover:text-primary transition-colors">Plans</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">Admin</Link>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">Hi, {user.name}</span>
                  <button onClick={handleLogout} className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-gray-700 hover:text-primary transition-colors">Login</Link>
                <Link to="/signup" className="btn-primary">Sign Up</Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/recharge-plans" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Plans</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Dashboard</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Admin</Link>
                )}
                <div className="px-3 py-2 text-gray-700">Hi, {user.name}</div>
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-primary">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="block px-3 py-2 text-gray-700 hover:text-primary" onClick={() => setIsOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;