interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  iconOnly?: boolean;
}

const NavItem = ({ icon, label, badge, iconOnly = false }: NavItemProps) => {
  return (
    <div className="relative flex cursor-pointer items-center gap-1 text-(--text-primary) hover:text-ginger transition-colors">
      {icon}
      <span className={`text-sm font-medium ${iconOnly ? 'hidden lg:inline' : ''}`}>{label}</span>

      {badge && (
        <span className="absolute -right-2 -top-2 rounded-full bg-ginger px-1.5 text-xs text-white lg:-right-3">
          {badge}
        </span>
      )}
    </div>
  );
};

export default NavItem;
