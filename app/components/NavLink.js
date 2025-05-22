import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  name,
  link,
  icon: Icon,
  isActive: isActiveProp,
  useBadge = false,
  useCount = false,
}) {
  const pathname = usePathname();

  // cek apakah link sekarang === link navlink
  const isActive = isActiveProp ?? pathname === link;

  return (
    <Link
      href={link}
      className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
        isActive ? "bg-gray-100 dark:bg-gray-700" : ""
      }`}
    >
      {/* Icon dynamic from lucide-react */}
      {Icon && (
        <Icon
          className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white
            ${isActive ? "text-gray-900 dark:text-white" : ""}`}
        />
      )}

      <span className="flex-1 ms-3 whitespace-nowrap">{name}</span>
      {/* if useBadge */}
      {useBadge && (
        <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
          Pro
        </span>
      )}

      {/* if useCount */}
      {useCount && (
        <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
          3
        </span>
      )}
    </Link>
  );
}
