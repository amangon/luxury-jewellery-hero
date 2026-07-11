import { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import { Search } from "lucide-react";
import api, { getErrorMessage } from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import Pagination from "../../components/common/Pagination.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      const { data } = await api.get("/users", { params });
      setUsers(data.users);
      setPages(data.pages);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleRole = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { role: u.role === "admin" ? "user" : "admin" });
      toast.success("Role updated");
      fetchUsers();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const toggleActive = async (u) => {
    try {
      await api.put(`/users/${u._id}`, { isActive: !u.isActive });
      toast.success(u.isActive ? "User deactivated" : "User activated");
      fetchUsers();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const handleDelete = async (u) => {
    if (!window.confirm(`Delete user "${u.name}"?`)) return;
    try {
      await api.delete(`/users/${u._id}`);
      toast.success("User deleted");
      fetchUsers();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl text-luxury-white mb-8">Users</h1>

      <div className="relative mb-6 max-w-sm">
        <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-white/40" />
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full bg-white/5 border border-luxury-white/15 rounded-full pl-10 pr-4 py-2.5 text-sm text-luxury-white placeholder:text-luxury-white/35 outline-none focus:border-luxury-accent"
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-xl border border-luxury-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-luxury-white/50 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-5 py-3">Name</th>
                <th className="text-left px-5 py-3">Email</th>
                <th className="text-left px-5 py-3">Role</th>
                <th className="text-left px-5 py-3">Status</th>
                <th className="text-right px-5 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-luxury-white/10">
                  <td className="px-5 py-3 text-luxury-white">{u.name}</td>
                  <td className="px-5 py-3 text-luxury-white/60">{u.email}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full capitalize ${u.role === "admin" ? "bg-luxury-accent/15 text-luxury-accent" : "bg-white/10 text-luxury-white/60"}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${u.isActive ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"}`}>
                      {u.isActive ? "Active" : "Deactivated"}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-2 text-xs">
                      {u._id !== currentUser?._id && (
                        <>
                          <button onClick={() => toggleRole(u)} className="px-3 py-1.5 rounded-full border border-luxury-white/15 text-luxury-white/60 hover:border-luxury-accent hover:text-luxury-accent transition-colors">
                            {u.role === "admin" ? "Make User" : "Make Admin"}
                          </button>
                          <button onClick={() => toggleActive(u)} className="px-3 py-1.5 rounded-full border border-luxury-white/15 text-luxury-white/60 hover:border-luxury-accent hover:text-luxury-accent transition-colors">
                            {u.isActive ? "Deactivate" : "Activate"}
                          </button>
                          <button onClick={() => handleDelete(u)} className="px-3 py-1.5 rounded-full border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors">
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr><td colSpan={5} className="px-5 py-10 text-center text-luxury-white/40">No users found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Pagination page={page} pages={pages} onPageChange={setPage} />
    </div>
  );
}
