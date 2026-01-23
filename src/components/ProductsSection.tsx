import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { Flame, Timer, Scale, Zap, Droplets, Wind, ArrowRight } from "lucide-react";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";
import coconutImage from "@/assets/product-coconut.png";
import briquetteImage from "@/assets/product-briquette.png";

const ProductsSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  const products = [
    {
      grade: t("products.gradeA.title"),
      image: coconutImage,
      description: t("products.gradeA.desc"),
      specs: [
        { label: t("products.specs.ash.label"), value: "Max 5%", icon: Scale },
        { label: t("products.specs.calories.label"), value: "Above 7000 Kcal", icon: Flame },
        { label: t("products.specs.carbon.label"), value: "Min 75%", icon: Zap },
        { label: t("products.specs.moisture.label"), value: "Max 5%", icon: Droplets },
        { label: t("products.specs.volatile.label"), value: "Max 15%", icon: Wind },
        { label: t("products.specs.time.label"), value: "7-8 Hours", icon: Timer },
      ],
      highlight: true,
      showShapeNote: true,
    },
    {
      grade: t("products.gradeAplus.title"),
      image: briquetteImage,
      description: t("products.gradeAplus.desc"),
      specs: [
        { label: t("products.specs.ash.label"), value: "8-10%", icon: Scale },
        { label: t("products.specs.calories.label"), value: "6500 - 7500 Kcal", icon: Flame },
        { label: t("products.specs.carbon.label"), value: "70-75%", icon: Zap },
        { label: t("products.specs.moisture.label"), value: "Max 5%", icon: Droplets },
        { label: t("products.specs.volatile.label"), value: "15% - 18%", icon: Wind },
        { label: t("products.specs.time.label"), value: "6-7 Hours", icon: Timer },
      ],
      highlight: false,
      showShapeNote: true,
    },
  ];

  return (
    <section id="products" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeader label={t("products.label")} title={t("products.title")} subtitle={t("products.subtitle")} />

        <div className="space-y-24 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 group">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl  aspect-[4/3]">
                  <img src={product.image} alt={product.grade} className="w-full h-full ml-6 object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  {product.highlight && <div className="absolute top-4 left-4 bg-gold text-charcoal text-xs font-bold px-4 py-2 rounded-full shadow-lg">{t("products.badge.bestseller")}</div>}

                  {product.showShapeNote && <div className="absolute bottom-4 left-4 text-white text-xs font-bold px-4 py-2">*Shape Depending on Request</div>}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 space-y-8">
                <div>
                  <h3 className="font-[Onest] text-4xl md:text-5xl font-bold text-white mb-4">{product.grade}</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">{product.description}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specs.map((spec, i) => {
                    const Icon = spec.icon;
                    return (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-gold/20 hover:bg-gold/5 transition-all duration-300 group/item">
                        <div className="p-2.5 rounded-lg bg-black/40 text-gold group-hover/item:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-0.5">{spec.label}</p>
                          <p className="text-white font-bold text-base">{spec.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                    className="group inline-flex items-center gap-2 text-gold font-bold text-lg hover:text-white transition-colors"
                  >
                    {t("products.cta")} {product.grade}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <p className="text-gray-500 text-sm">{t("products.disclaimer")}</p>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
