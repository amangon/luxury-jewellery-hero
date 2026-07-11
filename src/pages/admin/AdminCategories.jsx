import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import api, { getErrorMessage } from "../../api/axios.js";
import Loader from "../../components/common/Loader.jsx";
import FormInput from "../../components/common/FormInput.jsx";

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // category object or "new"
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchCategories = () => {
    setLoading(true);
    api.get("/categories?all=true").then(({ data }) => setCategories(data.categories)).finally(() => setLoading(false));
  };

  useEffect(fetchCategories, []);

  const openForm = (cat) => {
    setEditing(cat || "new");
    setImageFile(null);
    reset(cat ? { name: cat.name, description: cat.description, isActive: cat.isActive } : { name: "", description: "", isActive: true });
  };

  const closeForm = () => {
    setEditing(null);
    setImageFile(null);
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description || "");
      formData.append("isActive", values.isActive ? "true" : "false");
      if (imageFile) formData.append("image", imageFile);

      if (editing === "new") {
        await api.post("/categories", formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Category created");
      } else {
        await api.put(`/categories/${editing._id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Category updated");
      }
      closeForm();
      fetchCategories();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Delete "${cat.name}"?`)) return;
    try {
      await api.delete(`/categories/${cat._id}`);
      toast.success("Category deleted");
      fetchCategories();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-luxury-white">Categories</h1>
        <button
          onClick={() => openForm(null)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium text-sm hover:bg-luxury-secondary transition-colors"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {editing && (
        <div className="mb-8 p-6 rounded-xl border border-luxury-accent/30 bg-white/5 max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-lg text-luxury-white">{editing === "new" ? "New Category" : "Edit Category"}</h2>
            <button onClick={closeForm} className="text-luxury-white/50 hover:text-luxury-white"><X size={18} /></button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormInput label="Name" error={errors.name?.message} {...register("name", { required: "Required" })} />
            <FormInput as="textarea" rows={2} label="Description" {...register("description")} />
            <div>
              <label className="block text-sm text-luxury-white/70 mb-1.5">Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="text-sm text-luxury-white/60" />
            </div>
            <label className="flex items-center gap-2 text-sm text-luxury-white/80">
              <input type="checkbox" {...register("isActive")} className="accent-luxury-accent w-4 h-4" /> Active
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium text-sm hover:bg-luxury-secondary transition-colors disabled:opacity-50"
            >
              {submitting ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((c) => (
            <div key={c._id} className="p-5 rounded-xl border border-luxury-white/10 bg-white/5 flex items-center gap-4">
              <img
                src={c.image?.url || "https://via.placeholder.com/64?text=%20"}
                alt={c.name}
                className="w-14 h-14 rounded-lg object-cover bg-white/5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-luxury-white font-medium truncate">{c.name}</p>
                <span className={`text-xs ${c.isActive ? "text-emerald-400" : "text-luxury-white/40"}`}>
                  {c.isActive ? "Active" : "Inactive"}
                </span>
              </div>
              <button onClick={() => openForm(c)} className="p-2 rounded-lg hover:bg-white/10 text-luxury-white/60 hover:text-luxury-accent">
                <Pencil size={14} />
              </button>
              <button onClick={() => handleDelete(c)} className="p-2 rounded-lg hover:bg-white/10 text-luxury-white/60 hover:text-red-400">
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
