import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext.jsx";
import FormInput from "../components/common/FormInput.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setSubmitting(true);
    const result = await login(values.email, values.password);
    setSubmitting(false);

    if (result.success) {
      toast.success("Welcome back!");
      const redirectTo = location.state?.from?.pathname || (result.user.role === "admin" ? "/admin" : "/");
      navigate(redirectTo, { replace: true });
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
        <h1 className="font-display text-3xl text-luxury-white text-center mb-2">Welcome Back</h1>
        <p className="text-luxury-white/60 text-center mb-10">Sign in to continue to your account</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-luxury-accent text-luxury-bg font-semibold tracking-[0.04em] hover:bg-luxury-secondary transition-colors disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-luxury-white/60">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-luxury-accent hover:underline">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
