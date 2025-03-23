export const getVideoPath = (filename: string) => {
  // Always use the public path
  return `/videos/${filename}`;
};

export const preloadVideo = (src: string) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "auto";
    video.onloadeddata = () => resolve(src);
    video.onerror = reject;
    video.src = src;
  });
};
