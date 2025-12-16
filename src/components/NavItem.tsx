interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  mobile?: boolean;
}

const NavItem = ({ icon, label, badge, mobile = false }: NavItemProps) => {
  return (
    <div
      className={`relative flex cursor-pointer items-center gap-1
        text-(--text-primary) hover:text-ginger transition-colors
        ${mobile ? "lg:hidden" : "hidden lg:flex"}`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>

      {badge && (
        <span className="absolute -right-3 -top-2 rounded-full bg-ginger px-1.5 text-xs text-white">{badge}</span>
      )}
    </div>
  );
};

export default NavItem;
