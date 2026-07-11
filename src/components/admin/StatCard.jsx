export default function StatCard({ icon: Icon, label, value, accent = false }) {
  return (
    <div className="p-6 rounded-xl border border-luxury-white/10 bg-white/5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${accent ? "bg-luxury-accent/15 text-luxury-accent" : "bg-white/10 text-luxury-white/70"}`}>
        <Icon size={20} />
      </div>
      <div>
        <p className="text-xs uppercase tracking-wide text-luxury-white/40">{label}</p>
        <p className="font-display text-2xl text-luxury-white mt-0.5">{value}</p>
      </div>
    </div>
  );
}
