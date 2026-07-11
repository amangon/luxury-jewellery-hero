import { useForm } from "react-hook-form";
import { useState } from "react";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../../api/axios.js";
import { useAuth } from "../../context/AuthContext.jsx";
import FormInput from "../../components/common/FormInput.jsx";

export default function AdminSettings() {
  const { user, updateStoredUser } = useAuth();
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const profileForm = useForm({ defaultValues: { name: user?.name, phone: user?.phone || "" } });
  const passwordForm = useForm();

  const onProfileSubmit = async (values) => {
    setSavingProfile(true);
    try {
      const { data } = await api.put("/users/profile", values);
      updateStoredUser(data.user);
      toast.success("Admin profile updated");
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingProfile(false);
    }
  };

  const onPasswordSubmit = async (values) => {
    setSavingPassword(true);
    try {
      await api.put("/users/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password updated");
      passwordForm.reset();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-lg space-y-12">
      <div>
        <h1 className="font-display text-3xl text-luxury-white mb-8">Settings</h1>

        <h2 className="font-display text-lg text-luxury-white mb-4">Admin Profile</h2>
        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
          <FormInput label="Full Name" {...profileForm.register("name", { required: "Required" })} />
          <FormInput label="Phone" {...profileForm.register("phone")} />
          <FormInput label="Email" value={user?.email} disabled className="opacity-50 cursor-not-allowed" />
          <button
            type="submit"
            disabled={savingProfile}
            className="px-6 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium text-sm hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {savingProfile ? "Saving..." : "Save Profile"}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-lg text-luxury-white mb-4">Change Password</h2>
        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
          <FormInput label="Current Password" type="password" {...passwordForm.register("currentPassword", { required: "Required" })} />
          <FormInput label="New Password" type="password" {...passwordForm.register("newPassword", { required: "Required", minLength: { value: 6, message: "Min 6 characters" } })} />
          <button
            type="submit"
            disabled={savingPassword}
            className="px-6 py-2.5 rounded-full bg-luxury-accent text-luxury-bg font-medium text-sm hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {savingPassword ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
