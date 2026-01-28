"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative text-white hover:text-white transition
        after:absolute after:left-0 after:-bottom-1
        after:h-0.5 after:w-0 after:bg-blue-500
        after:transition-all after:duration-300
        hover:after:w-full
        ${isActive ? "text-blue-500 after:w-full" : ""}
      `}
    >
      {children}
    </Link>
  );
}
