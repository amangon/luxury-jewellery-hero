import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api, { getErrorMessage } from "../api/axios.js";
import AccountSidebar from "../components/common/AccountSidebar.jsx";
import FormInput from "../components/common/FormInput.jsx";

export default function ChangePassword() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = async (values) => {
    setSubmitting(true);
    try {
      await api.put("/users/change-password", {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      toast.success("Password changed successfully");
      reset();
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
        <h1 className="font-display text-3xl text-luxury-white mb-8">Change Password</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            label="Current Password"
            type="password"
            error={errors.currentPassword?.message}
            {...register("currentPassword", { required: "Required" })}
          />
          <FormInput
            label="New Password"
            type="password"
            error={errors.newPassword?.message}
            {...register("newPassword", {
              required: "Required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
          />
          <FormInput
            label="Confirm New Password"
            type="password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Required",
              validate: (v) => v === newPassword || "Passwords do not match",
            })}
          />

          <button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
