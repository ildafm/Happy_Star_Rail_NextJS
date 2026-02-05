"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import {
  Compass,
  Image,
  UserPlus,
  Bell,
  MessageCircle,
  Coins,
  Crown,
} from "lucide-react";

export default function Sidebar({ activePage }) {
  const pathname = usePathname();
  const pagesPath = "/pages";

  return (
    <aside className="w-64 bg-[#111] text-gray-200 flex flex-col border-r border-white/10">
      {/* Logo */}
      <div className="p-4 text-lg font-bold flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white">
          <Compass size={18} />
        </div>
        Happy Star Rail
      </div>

      {/* Menu utama */}
      <nav className="flex-1 px-2 text-sm">
        <MenuItem
          icon={<Compass size={18} />}
          label="Count Down Page"
          href={"/"}
        />

        <MenuItem
          icon={<Bell size={18} />}
          label="Home Page"
          active={pathname === pagesPath}
          href={`${pagesPath}`}
        />

        <MenuItem
          icon={<Image size={18} />}
          label="Herta Bot"
          active={pathname.startsWith(`${pagesPath}/herta_bot`)}
          href={`${pagesPath}/herta_bot`}
        />

        <Divider />

        <MenuItem
          icon={<Crown size={18} />}
          label="Berlangganan"
          badge="85% off"
          badgeColor="bg-orange-500"
        />

        <MenuItem
          icon={<Coins size={18} />}
          label="Koin"
          badge="82% off"
          badgeColor="bg-indigo-500"
        />

        <Divider />

        <MenuItem icon={<MessageCircle size={18} />} label="Ngobrol" />
      </nav>
    </aside>
  );
}

/* ====== Helper Components ====== */

function MenuItem({ icon, label, badge, badgeColor, active, href = "/" }) {
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

function Divider() {
  return <div className="my-3 h-px bg-white/10" />;
}
