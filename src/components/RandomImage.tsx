'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Modal from './Modal';

type WaifuType = 'waifu' | 'neko' | 'shinobu' | 'megumin' ;
type AnimeImage = {
  id: number;
  url: string;
  type: WaifuType;
};

export default function RandomImage() {
  const [images, setImages] = useState<AnimeImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedImage, setSelectedImage] = useState<AnimeImage | null>(null);

  const fetchImages = async () => {
    setIsLoading(true);
    setError(false);
    
    try {
      const types: WaifuType[] = ['waifu', 'neko', 'shinobu', 'megumin'];
      const newImages: AnimeImage[] = [];
      
      for (let i = 0; i < 6; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const response = await fetch(`https://api.waifu.pics/sfw/${type}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        newImages.push({
          id: i,
          url: data.url,
          type: type
        });
      }
      
      setImages(newImages);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <div className="glass-card p-6 rounded-lg overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Random Images</h3>
          <button 
            onClick={fetchImages}
            disabled={isLoading}
            className="px-4 py-2 text-sm bg-sky-500/20 hover:bg-sky-500/30 disabled:opacity-50 
              disabled:cursor-not-allowed text-sky-300 rounded-full transition-colors
              border border-sky-500/20 hover:border-sky-500/40"
          >
            {isLoading ? 'Loading...' : 'Refresh All'}
          </button>
        </div>
        
        {error ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <p className="text-ice-blue/70">Failed to load images</p>
            <button 
              onClick={fetchImages}
              className="px-4 py-2 text-sm bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 rounded-full"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {isLoading ? 
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-slate-800/50 rounded-lg animate-pulse" />
              )) : 
              images.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-[3/4] rounded-lg overflow-hidden 
                    bg-slate-800/30 backdrop-blur-sm border border-sky-500/10 
                    hover:border-sky-500/30 transition-all duration-300 
                    hover:scale-[1.02] hover:shadow-lg hover:shadow-sky-500/10
                    cursor-pointer"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={image.url}
                      alt={`Anime ${image.type}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      unoptimized
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight/90 
                    via-midnight/20 to-transparent opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300" />
                  <span className="absolute bottom-2 left-2 px-2 py-1 text-xs 
                    bg-sky-500/20 text-sky-300 rounded-full opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300
                    backdrop-blur-sm border border-sky-500/20"
                  >
                    {image.type}
                  </span>
                </div>
              ))
            }
          </div>
        )}
      </div>

      <Modal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
      >
        {selectedImage && (
          <div className="relative w-full max-w-md mx-auto bg-slate-900/90 rounded-lg overflow-hidden">
            <div className="relative w-full p-4">
              <img
                src={selectedImage.url}
                alt={`Full size ${selectedImage.type}`}
                className="w-full h-auto rounded-lg"
                style={{ maxHeight: '70vh' }}
              />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white
                hover:bg-black/70 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="absolute bottom-8 left-8 px-3 py-1.5 rounded-full bg-black/50 text-white text-sm
              backdrop-blur-sm border border-white/10">
              {selectedImage.type}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}