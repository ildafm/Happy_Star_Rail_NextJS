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
  Menu,
  X,
  Loader,
  ChevronLeft,
  ChevronRight,
  ShieldBan,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [wipToast, setWipToast] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  function showWip() {
    setWipToast(true);
    setTimeout(() => setWipToast(false), 2500);
  }

  const menuItems = [
    {
      icon: Compass,
      label: "Countdown Page",
      mobileLabel: "Countdown",
      href: "/",
      active: pathname === "/",
      wip: false,
    },
    {
      icon: Bell,
      label: "Home Page",
      mobileLabel: "Home",
      href: `/home`,
      active: pathname === "/home",
      wip: true,
    },
    {
      icon: MessageCircle,
      label: "Chat",
      mobileLabel: "Chat",
      href: `/chat-with-bot`,
      active: pathname.startsWith("/chat-with-bot"),
      wip: false,
    },
    // {
    //   icon: MessageCircle,
    //   label: "Herta Bot",
    //   mobileLabel: "Herta Bot",
    //   href: `/herta-bot`,
    //   active: pathname === "/herta-bot",
    //   wip: false,
    // },

    {
      icon: Image,
      label: "Buat Gambar",
      mobileLabel: "Buat Gambar",
      href: `/generate-image`,
      active: pathname === "/generate-image",
      wip: false,
      dividerBefore: true,
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
    {
      icon: Loader,
      label: "Work In Progress",
      mobileLabel: "WIP Page",
      href: "/work-in-progress",
      active: false,
      wip: false,
    },
    {
      icon: ShieldBan,
      label: "404 Not Found",
      mobileLabel: "404 Page",
      href: "/not-found",
      active: false,
      wip: false,
    },
  ];

  const allItems = [...menuItems, ...extraItems];

  return (
    <>
      {/* WIP Toast */}
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
      <aside
        className={`hidden md:flex flex-col bg-[#111] text-gray-200 border-r border-white/10 min-h-screen
          relative transition-all duration-300 ease-in-out
          ${collapsed ? "w-[60px]" : "w-64"}
        `}
      >
        {/* Header */}
        <div
          className={`p-4 flex items-center border-b border-white/10 gap-2
            ${collapsed ? "justify-center" : ""}
          `}
        >
          <img
            src="/img/pompom-icon.ico"
            alt="icon"
            className="w-7 h-7 rounded-full object-cover flex-shrink-0"
          />
          {!collapsed && (
            <span className="text-lg font-bold whitespace-nowrap overflow-hidden flex-1">
              Happy Star Rail
            </span>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-2 text-sm">
          {allItems.map((item, i) => (
            <div key={i}>
              {item.dividerBefore && <Divider collapsed={collapsed} />}
              <MenuItem
                icon={<item.icon size={18} />}
                label={item.label}
                href={item.href}
                active={item.active}
                badge={item.badge}
                badgeColor={item.badgeColor}
                wip={item.wip}
                onWip={showWip}
                collapsed={collapsed}
              />
            </div>
          ))}
        </nav>

        {/* Toggle tab — always visible, sticks to the right edge of sidebar */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand sidebar" : "Minimize sidebar"}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2
            w-7 h-12 flex items-center justify-center
            bg-[#1a1a1a] border border-white/15 rounded-r-lg
            text-gray-400 hover:text-white hover:bg-[#252525]
            shadow-md transition-all duration-150 z-10"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* ===== MOBILE HAMBURGER BUTTON ===== */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="md:hidden fixed top-3.5 left-3 z-50 w-9 h-9 flex items-center justify-center
    rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition"
      >
        <Menu size={20} />
      </button>

      {/* ===== MOBILE DRAWER OVERLAY ===== */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* ===== MOBILE DRAWER ===== */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 bg-[#111] text-gray-200
          flex flex-col border-r border-white/10
          transition-transform duration-300 ease-in-out
          ${drawerOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2 text-base font-bold">
            <img
              src="/img/pompom-icon.ico"
              alt="icon"
              className="w-7 h-7 rounded-full object-cover"
            />
            Happy Star Rail
          </div>
          <button
            onClick={() => setDrawerOpen(false)}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Drawer Menu */}
        <nav className="flex-1 px-2 py-2 text-sm overflow-y-auto">
          {allItems.map((item, i) => (
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
                onWip={() => {
                  showWip();
                  setDrawerOpen(false);
                }}
                onClick={() => setDrawerOpen(false)}
              />
            </div>
          ))}
        </nav>
      </aside>
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
  onClick,
  collapsed = false,
}) {
  // Collapsed mode: icon only + hover tooltip label
  if (collapsed) {
    const baseClass = `relative group w-full flex items-center justify-center px-0 py-2.5 rounded-md cursor-pointer
      transition-colors duration-150
      ${active ? "bg-white/10 text-white" : "hover:bg-white/5 text-gray-400 hover:text-white"}
      ${wip ? "opacity-60" : ""}
    `;

    const tooltip = (
      <span
        className="absolute left-full ml-3 top-1/2 -translate-y-1/2
          bg-[#222] text-white text-xs font-medium px-3 py-1.5 rounded-md shadow-lg
          whitespace-nowrap pointer-events-none z-50
          opacity-0 group-hover:opacity-100
          translate-x-1 group-hover:translate-x-0
          transition-all duration-200 ease-out
          border border-white/10"
      >
        {label}
        {wip && (
          <Construction size={10} className="inline ml-1.5 text-yellow-400" />
        )}
      </span>
    );

    if (wip) {
      return (
        <button onClick={onWip} className={baseClass}>
          <span>{icon}</span>
          {tooltip}
        </button>
      );
    }

    return (
      <Link href={href} onClick={onClick} className={baseClass}>
        <span>{icon}</span>
        {tooltip}
      </Link>
    );
  }

  // Expanded mode: original behavior
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
      onClick={onClick}
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

function Divider({ collapsed = false }) {
  return <div className={`my-3 h-px bg-white/10 ${collapsed ? "mx-2" : ""}`} />;
}
