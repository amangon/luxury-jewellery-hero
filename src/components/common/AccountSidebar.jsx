import { NavLink } from "react-router-dom";
import { User, Lock, Package, MapPin, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const LINKS = [
  { to: "/profile", label: "Overview", icon: User, end: true },
  { to: "/profile/edit", label: "Edit Profile", icon: User },
  { to: "/profile/change-password", label: "Change Password", icon: Lock },
  { to: "/orders", label: "My Orders", icon: Package },
];

export default function AccountSidebar() {
  const { logout, user } = useAuth();

  return (
    <aside className="w-full sm:w-60 shrink-0">
      <div className="mb-6">
        <p className="font-display text-lg text-luxury-white">{user?.name}</p>
        <p className="text-sm text-luxury-white/50">{user?.email}</p>
      </div>
      <nav className="flex sm:flex-col gap-1 overflow-x-auto sm:overflow-visible">
        {LINKS.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                isActive ? "bg-luxury-accent/15 text-luxury-accent" : "text-luxury-white/70 hover:bg-white/5"
              }`
            }
          >
            <link.icon size={16} /> {link.label}
          </NavLink>
        ))}
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm text-luxury-white/70 hover:bg-white/5 hover:text-red-400 transition-colors whitespace-nowrap"
        >
          <LogOut size={16} /> Logout
        </button>
      </nav>
    </aside>
  );
}
