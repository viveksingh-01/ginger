import type store from '@/store/store';
import { isAuthenticated } from '@/utils/auth';
import { HelpCircle, MapPin, Percent, Search, ShoppingCart, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavItem from './NavItem';

const Navbar = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const user = useSelector((state: ReturnType<typeof store.getState>) => state.auth.user);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [userMenuOpen]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-(--border-light)">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer">
              <Link to="/">
                <Logo />
              </Link>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center gap-1 cursor-pointer">
              <MapPin size={18} className="text-ginger" />
              <span className="text-sm font-semibold text-(--text-primary)">Bangalore</span>
              <Link to={'/coming-soon'}>
                <span className="ml-1 text-xs text-(--text-muted)">Change</span>
              </Link>
            </div>
          </div>

          {/* Right — mobile: search, user, cart icons only; desktop: full nav with labels */}
          <div className="flex items-center gap-6 lg:gap-8">
            <Link to={'/search'}>
              <NavItem icon={<Search size={18} />} label="Search" iconOnly />
            </Link>
            <Link to={'/coming-soon'} className="hidden lg:block">
              <NavItem icon={<Percent size={18} />} label="Offers" />
            </Link>
            <Link to={'/coming-soon'} className="hidden lg:block">
              <NavItem icon={<HelpCircle size={18} />} label="Help" />
            </Link>
            {isAuthenticated() ? (
              <div className="relative" ref={userMenuRef}>
                <NavItem
                  icon={<User size={18} />}
                  label={user?.name.split(' ')[0] ?? 'Me'}
                  iconOnly
                  onClick={() => setUserMenuOpen(open => !open)}
                />
                {userMenuOpen && (
                  <div className="absolute right-0 top-full z-60 mt-2 w-36 overflow-hidden rounded-md border border-(--border-light) bg-white shadow-lg">
                    <button
                      type="button"
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                      onClick={() => {
                        localStorage.removeItem('token');
                        window.location.href = '/auth/login';
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to={'/auth/login'}>
                <NavItem icon={<User size={18} />} label="Sign In" iconOnly />
              </Link>
            )}
            <Link to={'/checkout'}>
              <NavItem icon={<ShoppingCart size={18} />} label="Cart" badge={cartItems.length.toString()} iconOnly />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
