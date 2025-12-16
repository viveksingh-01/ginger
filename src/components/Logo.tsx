const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="160" height="40" viewBox="0 0 160 40">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#f97316" flood-opacity="0.4" />
      </filter>
    </defs>
    <circle cx="20" cy="20" r="12" fill="#F97316" filter="url(#shadow)" />
    <circle cx="16" cy="16" r="3" fill="white" />
    <circle cx="24" cy="22" r="2" fill="white" />
    <text x="36" y="27" fontFamily="Poppins, sans-serif" fontSize="20" fontWeight="700" fill="#F97316">
      ginger
    </text>
  </svg>
);

export default Logo;
