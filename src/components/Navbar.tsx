import { HelpCircle, MapPin, Percent, Search, ShoppingCart, User } from "lucide-react";
import NavItem from "./NavItem";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-(--border-light)">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <span className="text-xl font-bold text-ginger">ginger</span>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center gap-1 cursor-pointer">
              <MapPin size={18} className="text-ginger" />
              <span className="text-sm font-semibold text-(--text-primary)">Bangalore</span>
              <span className="ml-1 text-xs text-(--text-muted)">Change</span>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 mx-8">
            <div className="relative w-full max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-(--text-muted)" />
              <input
                type="text"
                placeholder="Search for restaurants or food"
                className="w-full rounded-full border border-(--border-light) px-4 py-2 pl-10 text-sm
                  focus:outline-none focus:ring-2 ring-ginger"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">
            <NavItem icon={<Search size={18} />} label="Search" mobile />
            <NavItem icon={<Percent size={18} />} label="Offers" />
            <NavItem icon={<HelpCircle size={18} />} label="Help" />
            <NavItem icon={<User size={18} />} label="Sign In" />
            <NavItem icon={<ShoppingCart size={18} />} label="Cart" badge="2" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
