export default function BackgroundVideo() {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-1 overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute w-full h-full object-cover opacity-30"
        poster="https://i.postimg.cc/hjjW2RDp/63392f2e8cf52e7d7c61b853c55f02c9.jpg"
      >
        <source src="/videos/Background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-midnight/60 via-deep-navy/70 to-midnight/60" />
    </div>
  );
}
