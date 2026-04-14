"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

import {
  Compass,
  Image,
  Bell,
  MessageCircle,
  Coins,
  Crown,
  Construction,
} from "lucide-react";

export default function Sidebar({ activePage }) {
  const pathname = usePathname();
  const pagesPath = "/pages";

  const [wipToast, setWipToast] = useState(false);

  function showWip() {
    setWipToast(true);
    setTimeout(() => setWipToast(false), 2500);
  }

  // ===== SINGLE SOURCE OF TRUTH =====
  // Semua perubahan WIP, label, href cukup di sini saja.
  // Desktop sidebar dan mobile bottom nav keduanya baca dari sini.
  const menuItems = [
    {
      icon: Compass,
      label: "Count Down Page",
      mobileLabel: "Count Down",
      href: "/",
      active: pathname === "/",
      wip: false,
    },
    {
      icon: Bell,
      label: "Home Page",
      mobileLabel: "Home",
      href: `${pagesPath}/main_page`,
      active: pathname === pagesPath,
      wip: true,
    },
    {
      icon: Image,
      label: "Herta Bot",
      mobileLabel: "Herta Bot",
      href: `${pagesPath}/herta_bot`,
      active: pathname.startsWith(`${pagesPath}/herta_bot`),
      wip: false,
    },
    {
      icon: MessageCircle,
      label: "Ngobrol",
      mobileLabel: "Ngobrol",
      href: "/ngobrol",
      active: false,
      wip: true,
      dividerBefore: true, // tambah divider sebelum item ini
    },
  ];

  const extraItems = [
    {
      icon: Crown,
      label: "Berlangganan",
      mobileLabel: "Premium",
      href: "/",
      badge: "85% off",
      badgeColor: "bg-orange-500",
      active: false,
      wip: true,
      dividerBefore: true,
    },
    {
      icon: Coins,
      label: "Koin",
      mobileLabel: "Koin",
      href: "/",
      badge: "82% off",
      badgeColor: "bg-indigo-500",
      active: false,
      wip: true,
    },
  ];

  // Gabungan untuk mobile (ambil 5 item pertama dari semua menu)
  const allItems = [...menuItems, ...extraItems];

  return (
    <>
      {/* ===== WIP TOAST NOTIFICATION ===== */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2
          bg-yellow-500/90 text-black text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg
          transition-all duration-300
          ${wipToast ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3 pointer-events-none"}
        `}
      >
        <Construction size={14} />
        Fitur ini belum tersedia — masih dalam pengerjaan
      </div>

      {/* ===== DESKTOP SIDEBAR ===== */}
      <aside className="hidden md:flex w-64 bg-[#111] text-gray-200 flex-col border-r border-white/10 min-h-screen">
        <div className="p-4 text-lg font-bold flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <Compass size={18} />
          </div>
          Happy Star Rail
        </div>

        <nav className="flex-1 px-2 text-sm">
          {[...menuItems, ...extraItems].map((item, i) => (
            <div key={i}>
              {item.dividerBefore && <Divider />}
              <MenuItem
                icon={<item.icon size={18} />}
                label={item.label}
                href={item.href}
                active={item.active}
                badge={item.badge}
                badgeColor={item.badgeColor}
                wip={item.wip}
                onWip={showWip}
              />
            </div>
          ))}
        </nav>
      </aside>

      {/* ===== MOBILE BOTTOM NAV ===== */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#111] border-t border-white/10 flex items-center justify-around px-2 py-2">
        {allItems.slice(0, 5).map((item, i) => (
          <MobileMenuItem
            key={i}
            icon={<item.icon size={20} />}
            label={item.mobileLabel}
            href={item.href}
            active={item.active}
            badge={item.badge}
            wip={item.wip}
            onWip={showWip}
          />
        ))}
      </nav>

      {/* Spacer mobile */}
      <div className="md:hidden h-16" />
    </>
  );
}

/* ====== Helper Components ====== */

function MenuItem({
  icon,
  label,
  badge,
  badgeColor,
  active,
  href = "/",
  wip = false,
  onWip,
}) {
  if (wip) {
    return (
      <button
        onClick={onWip}
        className="w-full flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-white/5 opacity-60"
      >
        <div className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <span>{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {badge && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full text-white ${badgeColor}`}
            >
              {badge}
            </span>
          )}
          <Construction size={12} className="text-yellow-400" />
        </div>
      </button>
    );
  }

  return (
    <Link
      href={href}
      className={`flex items-center justify-between px-3 py-2 rounded-md cursor-pointer
        ${active ? "bg-white/10 text-white" : "hover:bg-white/5"}
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-gray-400">{icon}</span>
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`text-xs px-2 py-0.5 rounded-full text-white ${badgeColor}`}
        >
          {badge}
        </span>
      )}
    </Link>
  );
}

function MobileMenuItem({
  icon,
  label,
  href = "/",
  active,
  badge,
  wip = false,
  onWip,
}) {
  const baseClass = `relative flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-lg min-w-[56px] transition-colors
    ${active ? "text-purple-400" : wip ? "text-gray-600" : "text-gray-400 hover:text-gray-200"}
  `;

  const content = (
    <>
      {active && (
        <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-purple-400 rounded-full" />
      )}
      {wip ? (
        <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-yellow-400" />
      ) : badge ? (
        <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-orange-500" />
      ) : null}
      <span>{icon}</span>
      <span className="text-[10px] font-medium leading-none">{label}</span>
    </>
  );

  if (wip) {
    return (
      <button onClick={onWip} className={baseClass}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={baseClass}>
      {content}
    </Link>
  );
}

function Divider() {
  return <div className="my-3 h-px bg-white/10" />;
}
