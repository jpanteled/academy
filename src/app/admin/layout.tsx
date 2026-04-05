// src/app/admin/layout.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: "⚡" },
  { label: "Students", href: "/admin/students", icon: "🎓" },
  { label: "Lessons", href: "/admin/lessons", icon: "📜" },
  { label: "Units", href: "/admin/units", icon: "📚" },
  { label: "Standards", href: "/admin/standards", icon: "⚜️" },
  { label: "Questions", href: "/admin/questions", icon: "❓" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#1a0d45] text-[#f5e199] flex">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen bg-[#120930] border-r border-[#c9a84c33] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#c9a84c33]">
          <Link href="/">
            <img
              src="/images/crest.png"
              alt="Dracos Academy"
              className="w-16 mx-auto mb-3"
            />
          </Link>
          <p className="font-[family-name:var(--font-cinzel)] text-xs tracking-[0.2em] text-center text-[#c9a84c] uppercase">
            Admin Portal
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-[family-name:var(--font-cinzel)] text-xs tracking-wider transition-all ${
                  isActive
                    ? "bg-[#c9a84c22] border border-[#c9a84c55] text-[#f5e199]"
                    : "text-[#c9a84c99] hover:bg-[#c9a84c11] hover:text-[#f5e199]"
                }`}
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-[#c9a84c33]">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg font-[family-name:var(--font-cinzel)] text-xs tracking-wider text-[#c9a84c66] hover:text-[#f5e199] transition-all"
          >
            <span>←</span> Back to Academy
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">
        {/* Top bar */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c9a84c33] to-transparent mb-8" />
        {children}
      </main>

    </div>
  );
}