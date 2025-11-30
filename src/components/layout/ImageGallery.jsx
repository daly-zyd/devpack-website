import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';


export default function ImageGallery({ images, title, columns = 3 }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageError, setImageError] = useState(false);

  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  useEffect(() => {
    // reset any previous image error when a new image is selected
    setImageError(false);
  }, [selectedImage]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:gap-6">
        <div className={`grid ${gridColsClass} gap-6`}>
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedImage(image)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer border border-teal-500/20 hover:border-teal-500/40 transition-all"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Title below image (always visible) */}
              <div className="p-3 bg-white/0 dark:bg-transparent">
                <h3 className="text-gray-900 dark:text-white font-semibold text-lg truncate">{image.title}</h3>
                {image.description && <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{image.description}</p>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-teal-400 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {!imageError ? (
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full rounded-2xl"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full rounded-2xl bg-gray-800 flex items-center justify-center" style={{minHeight: 320}}>
                <div className="text-center p-6">
                  <svg className="mx-auto w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3v18h18M3 9h18M9 3v6" />
                  </svg>
                  <p className="mt-4 text-gray-200">Image non disponible</p>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-2">
              <h2 className="text-2xl font-bold text-white">{selectedImage.title}</h2>
              <p className="text-gray-300">{selectedImage.description}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
      
    </>
  );
}

