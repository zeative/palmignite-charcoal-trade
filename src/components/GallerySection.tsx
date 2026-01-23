import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";
import { X, ZoomIn, ArrowUpRight } from "lucide-react";
import galleryEfficient from "@/assets/gallery-efficient.jpg";
import galleryTeams from "@/assets/gallery-teams.jpg";
import galleryProduct from "@/assets/gallery-product.jpg";
import gallerySafety from "@/assets/gallery-safety.jpg";
import { SectionHeader } from "./ui/corporate/SectionHeader";

const GallerySection = () => {
  const { t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const images = [
    {
      src: galleryEfficient,
      alt: t("gallery.images.efficient.alt"),
      category: t("gallery.categories.production"),
      className: "md:col-span-2 md:row-span-2",
    },
    {
      src: galleryTeams,
      alt: t("gallery.images.teams.alt"),
      category: t("gallery.categories.team"),
      className: "md:col-span-2 md:row-span-1",
    },
    {
      src: galleryProduct,
      alt: t("gallery.images.product.alt"),
      category: t("gallery.categories.product"),
      className: "md:col-span-1 md:row-span-1",
    },
    {
      src: gallerySafety,
      alt: t("gallery.images.safety.alt"),
      category: t("gallery.categories.logistics"),
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imgContainerRef.current) return;
    const rect = imgContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 100;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 100;
    setOffset({ x, y });
  };

  return (
    <section id="gallery" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[120px] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader label={t("gallery.label")} title={t("gallery.title")} subtitle={t("gallery.subtitle")} className="mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto auto-rows-[200px] md:auto-rows-[250px]">
          {images.map((image, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-white/10 bg-white/5 transition-all duration-700 ${image.className} ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
              onClick={() => {
                setSelectedImage(image.src);
                setIsZoomed(false);
              }}
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300" />

              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>
                </div>

                <div className="transform translate-y-0 transition-transform duration-300">
                  <h3 className="text-xl font-bold text-white leading-tight">{image.alt}</h3>
                  <span className="inline-block px-3 py-1 rounded-sm text-xs font-bold bg-gold text-charcoal mb-2">{image.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">{t("gallery.explore")}</p>
        </div>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in" onClick={() => setSelectedImage(null)}>
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-gold bg-white/10 backdrop-blur-sm rounded-full transition-all hover:scale-110 z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            ref={imgContainerRef}
            className="relative max-w-7xl max-h-[90vh] animate-scale-in overflow-hidden cursor-grab active:cursor-grabbing rounded-lg border border-white/10 shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
              setIsZoomed(!isZoomed);
              setOffset({ x: 0, y: 0 });
            }}
            onMouseMove={handleMouseMove}
          >
            <img
              src={selectedImage}
              alt="Gallery"
              className={`max-w-full max-h-[90vh] object-contain transition-transform duration-300 ${isZoomed ? "scale-150 cursor-grab" : "scale-100 cursor-zoom-in"}`}
              style={{
                transform: isZoomed ? `scale(1.5) translate(${offset.x / 3}%, ${offset.y / 3}%)` : "scale(1) translate(0, 0)",
              }}
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
            <p className="text-sm text-gray-400 flex items-center gap-2">
              <ZoomIn className="w-4 h-4" />
              {t("gallery.zoom")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
