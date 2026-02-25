/* eslint-disable @next/next/no-img-element */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Gateway", href: "/gateway" },
  { label: "Grip", href: "/grip" },
];

const SiteHeader = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <a href="/" className="flex items-center gap-2">
            <img
              src="/images/rpc-logo.png"
              alt="rpc"
              className="w-8 h-8 rounded-lg object-contain"
            />
            <span className="font-bold text-xl tracking-tight text-gray-900">
              rpc.ag
            </span>
          </a>

          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
