import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";
import AccountSidebar from "../components/common/AccountSidebar.jsx";
import FormInput from "../components/common/FormInput.jsx";

export default function EditProfile() {
  const { user, updateStoredUser } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { name: user?.name, phone: user?.phone || "" } });

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("phone", values.phone || "");
      if (avatarFile) formData.append("avatar", avatarFile);

      const { data } = await api.put("/users/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateStoredUser(data.user);
      toast.success("Profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-12 flex flex-col sm:flex-row gap-10">
      <AccountSidebar />

      <div className="flex-1 max-w-lg">
        <h1 className="font-display text-3xl text-luxury-white mb-8">Edit Profile</h1>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={user?.avatar?.url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || "U")}&background=CFA36A&color=0F0F0F`}
            alt="Avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
          <label className="text-sm text-luxury-accent cursor-pointer hover:underline">
            Change photo
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setAvatarFile(e.target.files[0])} />
          </label>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            label="Full Name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <FormInput label="Phone Number" {...register("phone")} />
          <FormInput label="Email Address" value={user?.email} disabled className="opacity-50 cursor-not-allowed" />

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
