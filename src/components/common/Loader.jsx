export default function Loader({ fullScreen = false, size = "md" }) {
  const sizes = { sm: "h-5 w-5 border-2", md: "h-9 w-9 border-2", lg: "h-14 w-14 border-[3px]" };

  const spinner = (
    <div
      className={`${sizes[size]} rounded-full border-luxury-accent/30 border-t-luxury-accent animate-spin`}
    />
  );

  if (fullScreen) {
    return (
      <div className="min-h-[60vh] w-full flex items-center justify-center bg-luxury-bg">
        {spinner}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-10">{spinner}</div>;
}
