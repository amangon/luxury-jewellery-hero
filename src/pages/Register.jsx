import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import FormInput from "../components/common/FormInput.jsx";

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (values) => {
    setSubmitting(true);
    const result = await registerUser({
      name: values.name,
      email: values.email,
      password: values.password,
      phone: values.phone,
    });
    setSubmitting(false);

    if (result.success) {
      toast.success("Account created successfully!");
      navigate("/", { replace: true });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-display text-3xl text-luxury-white text-center mb-2">Create Account</h1>
        <p className="text-luxury-white/60 text-center mb-10">Join us for an exclusive shopping experience</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <FormInput
            label="Full Name"
            placeholder="Jane Doe"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
          <FormInput
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
            })}
          />
          <FormInput
            label="Phone Number"
            type="tel"
            placeholder="98765 43210"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
            })}
          />
          <FormInput
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (v) => v === password || "Passwords do not match",
            })}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold tracking-[0.04em] hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-luxury-white/60">
          Already have an account?{" "}
          <Link to="/login" className="text-luxury-accent hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
