import type store from '@/store/store';
import { isAuthenticated } from '@/utils/auth';
import { HelpCircle, MapPin, Percent, Search, ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavItem from './NavItem';

const Navbar = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);
  const user = useSelector((state: ReturnType<typeof store.getState>) => state.auth.user);

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
              <NavItem icon={<User size={18} />} label={user?.name.split(' ')[0] ?? 'Me'} iconOnly />
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
