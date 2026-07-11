import { useAuth } from "../context/AuthContext.jsx";
import AccountSidebar from "../components/common/AccountSidebar.jsx";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row gap-10">
      <AccountSidebar />

      <div className="flex-1">
        <h1 className="font-display text-3xl text-luxury-white mb-8">My Account</h1>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-wide text-luxury-white/40 mb-1">Full Name</p>
            <p className="text-luxury-white">{user?.name}</p>
          </div>
          <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-wide text-luxury-white/40 mb-1">Email</p>
            <p className="text-luxury-white">{user?.email}</p>
          </div>
          <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-wide text-luxury-white/40 mb-1">Phone</p>
            <p className="text-luxury-white">{user?.phone || "Not provided"}</p>
          </div>
          <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5">
            <p className="text-xs uppercase tracking-wide text-luxury-white/40 mb-1">Member Since</p>
            <p className="text-luxury-white">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" })
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
