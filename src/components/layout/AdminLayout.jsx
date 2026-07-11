import { NavLink, Outlet, Link } from "react-router-dom";
import {
  LayoutDashboard, Package, FolderTree, ShoppingCart, Users, BarChart3, Settings, ArrowLeft,
} from "lucide-react";
import Logo from "../common/Logo.jsx";

const LINKS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: FolderTree },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-luxury-bg flex">
      <aside className="w-64 shrink-0 border-r border-luxury-white/10 h-screen sticky top-0 flex flex-col px-5 py-6">
        <Logo className="mb-8 px-2" markSize="w-5 h-5" />

        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-luxury-accent/15 text-luxury-accent" : "text-luxury-white/70 hover:bg-white/5"
                }`
              }
            >
              <link.icon size={16} /> {link.label}
            </NavLink>
          ))}
        </nav>

        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-luxury-white/50 hover:text-luxury-accent transition-colors"
        >
          <ArrowLeft size={16} /> Back to Store
        </Link>
      </aside>

      <main className="flex-1 px-8 py-8 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
