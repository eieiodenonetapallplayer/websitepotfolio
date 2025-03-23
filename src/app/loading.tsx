export default function Loading() {
  return (
    <div className="fixed inset-0 bg-midnight flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
    </div>
  );
}
