import { HelpCircle, MapPin, Percent, Search, ShoppingCart, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import type store from '../store/store';
import Logo from './Logo';
import NavItem from './NavItem';

const Navbar = () => {
  const cartItems = useSelector((state: ReturnType<typeof store.getState>) => state.cart.items);

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-(--border-light)">
      <div className="mx-auto max-w-7xl px-4">
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
              <span className="ml-1 text-xs text-(--text-muted)">Change</span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <NavItem icon={<Search size={18} />} label="Search" mobile />
            <Link to={'/search'}>
              <NavItem icon={<Search size={18} />} label="Search" />
            </Link>
            <NavItem icon={<Percent size={18} />} label="Offers" />
            <NavItem icon={<HelpCircle size={18} />} label="Help" />
            <NavItem icon={<User size={18} />} label="Sign In" />
            <NavItem icon={<ShoppingCart size={18} />} label="Cart" badge={cartItems.length.toString()} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
