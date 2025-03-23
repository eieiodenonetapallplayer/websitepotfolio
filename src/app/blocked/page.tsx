export default function BlockedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center p-8">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-ice-blue/70 mb-4">
          Developer tools are not allowed on this site.
        </p>
        <a
          href="/"
          className="px-4 py-2 bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-full 
            transition-colors inline-block"
        >
          Return Home
        </a>
      </div>
    </div>
  );
}
