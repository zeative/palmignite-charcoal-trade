import hexa from "@/assets/hexa-shapes.png";
import pillow from "@/assets/pillow-shapes.png";
import cubes from "@/assets/cubes-shapes.png";
import MasterBox from "@/assets/masterbox.png";
import MasterInnerBox from "@/assets/masterbox-inner.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Box, CheckCircle2, Layers, Package, Hexagon, Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CorporateCard } from "./ui/corporate/CorporateCard";
import { SectionHeader } from "./ui/corporate/SectionHeader";

const PackagingSection = () => {
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
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const options = [
    {
      title: "Hexa Charcoal",
      image: hexa,
      icon: Hexagon,
      content: (
        <div className="mt-1 cursor-default">
          <div className="mb-3 border-t border-white/10" />
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-300 justify-end">
            <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-left transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-white/10">5 × 5 cm</div>
            <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-left transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-white/10">5 × 20 cm</div>
          </div>
        </div>
      ),
    },
    {
      title: "Pillow Charcoal",
      image: pillow,
      icon: Circle,
      content: (
        <div className="mt-1 cursor-default">
          <div className="mb-3 border-t border-white/10" />
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-300 justify-end">
            <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-left transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-white/10">8 cm</div>
            <div className="px-3 py-1 rounded border border-white/10 bg-white/5 text-left transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-white/10">6 cm</div>
          </div>
        </div>
      ),
    },
    {
      title: "Cube Charcoal",
      image: cubes,
      icon: Box,
      content: (
        <div className="mt-1">
          <div className="mb-3 border-t border-white/10" />

          <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-gray-300 cursor-default">
            {["20 × 20 × 20", "22 × 22 × 22", "23.5 × 23.5 × 23.5", "25 × 25 × 25", "26 × 26 × 26", "27 × 27 × 27", "28 × 28 × 28", "29 × 29 × 29", "30 × 30 × 30", "31 × 31 × 31"].map((size) => (
              <div key={size} className="py-1 px-2 rounded border border-white/10 bg-white/5 text-left transition-all duration-200 hover:scale-105 hover:border-gold/60 hover:bg-white/10">
                {size}
              </div>
            ))}

            {/* FULL WIDTH */}
            <div className="col-span-2 ">
              <p className="mt-3 text-gray-400">{t("note.shape")}</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="packaging" ref={sectionRef} className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 cursor-default">
        <SectionHeader label={t("packaging.label")} title={t("packaging.title")} subtitle={t("packaging.subtitle")} />

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {options.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${index * 200}ms` }}>
                  <div className="h-full flex flex-col overflow-hidden group rounded-xl border border-gold transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-20px_rgba(212,175,55,0.5)]">
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img src={option.image} alt={option.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/20" />
                    </div>

                    <div className="p-6 flex-1 flex flex-col transition-all duration-500 group-hover:translate-y-[-4px]">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon
                          className="w-5 h-5 text-gold/70 transition-all duration-300 group-hover:text-gold group-hover:drop-shadow-[0_0_6px_rgba(212,175,55,0.9)] group-hover:scale-110 group-hover:rotate-6"
                          strokeWidth={1.5}
                        />
                        <h4 className="font-bold text-white text-lg">{option.title}</h4>
                      </div>

                      {option.content}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <SectionHeader label={t("packaging.label2")} title={t("packaging.title2")} subtitle={t("packaging.subtitle2")} />

          <div className={`transition-all duration-1000 delay-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <div className="grid md:grid-cols-2 gap-8">
              <CorporateCard className="p-8 border-l-4 border-l-gold">
                <div className="overflow-hidden rounded-t-xl">
                  <img className="w-full h-full transition-transform duration-300 hover:scale-105" src={MasterBox} alt="img" />
                </div>

                <h4 className="text-white font-bold text-xl mb-1.5 flex items-center gap-2">
                  <Box className="w-5 h-5 text-gold" />
                  {t("packaging.masterBox.title")}
                </h4>
                <hr />
                <ul className="space-y-1 mt-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <span>{t("packaging.masterBox.sizes")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <span>{t("packaging.masterBox.color")}</span>
                  </li>
                </ul>
              </CorporateCard>

              <CorporateCard className="p-8 border-l-4 border-l-gold">
                <div className="overflow-hidden rounded-t-xl">
                  <img className="w-full h-full transition-transform duration-300 hover:scale-105" src={MasterInnerBox} alt="img" />
                </div>

                <h4 className="text-white font-bold text-xl mb-1.5 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-gold" />
                  {t("packaging.innerBox.title")}
                </h4>
                <hr />
                <ul className="space-y-1 mt-3">
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <span>{t("packaging.innerBox.sizes")}</span>
                  </li>
                  <li className="flex items-start gap-3 text-gray-300">
                    <CheckCircle2 className="w-5 h-5 text-gold mt-0.5" />
                    <span>{t("packaging.innerBox.color")}</span>
                  </li>
                </ul>
              </CorporateCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PackagingSection;
