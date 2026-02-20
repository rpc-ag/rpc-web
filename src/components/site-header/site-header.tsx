"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Gateway", href: "/gateway" },
  { label: "Grip", href: "/grip" },
];

const SiteHeader = () => {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 border-b-2 border-[var(--color-border)] bg-[var(--color-shell)] text-[var(--color-ink-inverse)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-16 items-center justify-between gap-6">
          <a href="/" className="flex items-center py-2">
            <Image
              src="/images/rpc-ag-logo.webp"
              alt="rpc.ag"
              width={806}
              height={349}
              className="h-10 w-auto object-contain"
              priority
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`text-xs font-bold uppercase tracking-[0.12em] transition-none ${
                    isActive ? "text-[var(--color-accent)]" : "text-[var(--color-panel)] hover:text-[var(--color-info)]"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SiteHeader;
