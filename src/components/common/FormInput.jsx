import { forwardRef } from "react";

const FormInput = forwardRef(function FormInput(
  { label, error, as = "input", className = "", children, ...props },
  ref
) {
  const Component = as;
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm text-luxury-white/70 mb-1.5 font-body">{label}</label>
      )}
      <Component
        ref={ref}
        {...props}
        className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-luxury-white placeholder:text-luxury-white/35 outline-none transition-colors focus:border-luxury-accent ${
          error ? "border-red-500/60" : "border-luxury-white/15"
        } ${className}`}
      >
        {children}
      </Component>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  );
});

export default FormInput;
