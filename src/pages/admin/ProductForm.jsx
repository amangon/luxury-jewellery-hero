import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { X, UploadCloud } from "lucide-react";
import api, { getErrorMessage } from "../../api/axios.js";
import FormInput from "../../components/common/FormInput.jsx";
import Loader from "../../components/common/Loader.jsx";

export default function ProductForm() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    api.get("/categories?all=true").then(({ data }) => setCategories(data.categories));
  }, []);

  useEffect(() => {
    if (!isEdit) return;
    api.get(`/products/${id}`).then(({ data }) => {
      const p = data.product;
      reset({
        name: p.name,
        description: p.description,
        shortDescription: p.shortDescription,
        category: p.category?._id,
        price: p.price,
        discountPrice: p.discountPrice,
        sku: p.sku,
        material: p.material,
        gemstone: p.gemstone,
        weight: p.weight,
        stock: p.stock,
        tags: p.tags?.join(", "),
        isFeatured: p.isFeatured,
        isBestSeller: p.isBestSeller,
        isNewArrival: p.isNewArrival,
        isActive: p.isActive,
      });
      setExistingImages(p.images);
      setLoading(false);
    });
  }, [id, isEdit, reset]);

  const toggleRemoveImage = (publicId) => {
    setRemoveImages((prev) =>
      prev.includes(publicId) ? prev.filter((p) => p !== publicId) : [...prev, publicId]
    );
  };

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, val]) => {
        if (val === undefined || val === null) return;
        if (["isFeatured", "isBestSeller", "isNewArrival", "isActive"].includes(key)) {
          formData.append(key, val ? "true" : "false");
        } else {
          formData.append(key, val);
        }
      });
      if (isEdit && removeImages.length > 0) {
        formData.append("removeImages", JSON.stringify(removeImages));
      }
      newFiles.forEach((file) => formData.append("images", file));

      if (isEdit) {
        await api.put(`/products/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Product updated");
      } else {
        if (newFiles.length === 0) {
          toast.error("At least one product image is required");
          setSubmitting(false);
          return;
        }
        await api.post("/products", formData, { headers: { "Content-Type": "multipart/form-data" } });
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader fullScreen />;

  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-3xl text-luxury-white mb-8">{isEdit ? "Edit Product" : "Add New Product"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInput label="Product Name" error={errors.name?.message} {...register("name", { required: "Required" })} />

        <FormInput
          as="textarea"
          rows={4}
          label="Description"
          error={errors.description?.message}
          {...register("description", { required: "Required" })}
        />
        <FormInput as="textarea" rows={2} label="Short Description" {...register("shortDescription")} />

        <div className="grid sm:grid-cols-2 gap-5">
          <FormInput
            as="select"
            label="Category"
            error={errors.category?.message}
            {...register("category", { required: "Required" })}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </FormInput>
          <FormInput label="SKU (optional)" {...register("sku")} />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <FormInput
            label="Price (₹)"
            type="number"
            step="0.01"
            error={errors.price?.message}
            {...register("price", { required: "Required", min: { value: 0, message: "Must be positive" } })}
          />
          <FormInput label="Discount Price (₹)" type="number" step="0.01" {...register("discountPrice")} />
          <FormInput
            label="Stock Quantity"
            type="number"
            error={errors.stock?.message}
            {...register("stock", { required: "Required", min: { value: 0, message: "Must be non-negative" } })}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-5">
          <FormInput label="Material" placeholder="18K Gold" {...register("material")} />
          <FormInput label="Gemstone" placeholder="Diamond" {...register("gemstone")} />
          <FormInput label="Weight" placeholder="4.2g" {...register("weight")} />
        </div>

        <FormInput label="Tags (comma separated)" placeholder="wedding, statement, gift" {...register("tags")} />

        <div className="flex flex-wrap gap-6">
          {[
            { name: "isFeatured", label: "Featured" },
            { name: "isBestSeller", label: "Best Seller" },
            { name: "isNewArrival", label: "New Arrival" },
            ...(isEdit ? [{ name: "isActive", label: "Active" }] : []),
          ].map((f) => (
            <label key={f.name} className="flex items-center gap-2 text-sm text-luxury-white/80">
              <input type="checkbox" {...register(f.name)} className="accent-luxury-accent w-4 h-4" />
              {f.label}
            </label>
          ))}
        </div>

        {/* Existing images (edit mode) */}
        {isEdit && existingImages.length > 0 && (
          <div>
            <label className="block text-sm text-luxury-white/70 mb-2">Current Images</label>
            <div className="flex flex-wrap gap-3">
              {existingImages.map((img) => (
                <div key={img.publicId} className="relative">
                  <img
                    src={img.url}
                    alt=""
                    className={`w-20 h-20 rounded-lg object-cover ${removeImages.includes(img.publicId) ? "opacity-30" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => toggleRemoveImage(img.publicId)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-luxury-bg border border-luxury-white/20 flex items-center justify-center text-luxury-white/70 hover:text-red-400"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* New image upload */}
        <div>
          <label className="block text-sm text-luxury-white/70 mb-2">
            {isEdit ? "Add More Images" : "Product Images"}
          </label>
          <label className="flex items-center gap-2 border border-dashed border-luxury-white/20 rounded-lg px-4 py-6 text-sm text-luxury-white/50 cursor-pointer hover:border-luxury-accent transition-colors justify-center">
            <UploadCloud size={18} />
            {newFiles.length > 0 ? `${newFiles.length} file(s) selected` : "Click to upload (max 8 images)"}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => setNewFiles(Array.from(e.target.files).slice(0, 8))}
            />
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Saving..." : isEdit ? "Update Product" : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/products")}
            className="px-8 py-3 rounded-full border border-luxury-white/15 text-luxury-white/70 hover:border-luxury-accent hover:text-luxury-accent transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
