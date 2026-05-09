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
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const [wipToast, setWipToast] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

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
      label: "Herta Bot",
      mobileLabel: "Herta Bot",
      href: `/herta-bot`,
      active: pathname === "/herta-bot",
      wip: false,
    },
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
      mobileLabel: "WIP",
      href: "/work-in-progress",
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
      <aside className="hidden md:flex w-64 bg-[#111] text-gray-200 flex-col border-r border-white/10 min-h-screen">
        <div className="p-4 text-lg font-bold flex items-center gap-2">
          {/* <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
            <Compass size={18} />
          </div> */}
          <img
            src="/img/pompom_icon.ico"
            alt="icon"
            className="w-7 h-7 rounded-full object-cover"
          />
          Happy Star Rail
        </div>
        <nav className="flex-1 px-2 text-sm">
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
                onWip={showWip}
              />
            </div>
          ))}
        </nav>
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
            {/* <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center text-white">
              <Compass size={15} />
            </div> */}
            <img
              src="/img/pompom_icon.ico"
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
                onClick={() => setDrawerOpen(false)} // ← tutup drawer saat navigasi
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

function Divider() {
  return <div className="my-3 h-px bg-white/10" />;
}
