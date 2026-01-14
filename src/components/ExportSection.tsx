import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Globe, TrendingUp, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const ExportSection = () => {
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
      { threshold: 0.2 }
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

  const regions = [
    {
      region: "Asia",
      countries: [
        { name: "South Korea", code: "kr" },
        { name: "Japan", code: "jp" },
        { name: "China", code: "cn" },
        { name: "Vietnam", code: "vn" },
        { name: "Saudi Arabia", code: "sa" },
      ],
    },
    {
      region: "Europe",
      countries: [
        { name: "United Kingdom", code: "gb" },
        { name: "Nederland", code: "nl" },
      ],
    },
    {
      region: "America",
      countries: [{ name: "United States", code: "us" }],
    },
  ];

  return (
    <section id="export" ref={sectionRef} className="py-16 md:py-20 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <SectionHeader 
          label="Global Presence"
          title={t("export.title")}
          subtitle={t("export.subtitle")}
          className="mb-10"
        />

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {regions.map((region, regionIndex) => (
              <div key={regionIndex} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`} style={{ transitionDelay: `${regionIndex * 150}ms` }}>
                <CorporateCard className="h-full p-6 hover:bg-white/5 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-gold/10">
                      <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    </div>
                    <h3 className="font-semibold text-lg text-white">{region.region}</h3>
                  </div>

                  <div className="space-y-3 flex-1">
                    {region.countries.map((country, countryIndex) => (
                      <div key={countryIndex} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                        <img src={`https://flagicons.lipis.dev/flags/4x3/${country.code}.svg`} alt="" className="w-5 rounded-sm shadow-sm" />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-gold transition-colors">{country.name}</span>
                      </div>
                    ))}
                  </div>
                </CorporateCard>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 border-t border-white/10 pt-8">
            {[
              { count: 8, label: "Countries Served", icon: Globe },
              { count: 5, label: "Continents", icon: TrendingUp },
              { count: 24, label: "Support", suffix: "/7", icon: Users }
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center group">
                  <div className="inline-flex p-3 rounded-full bg-gold/5 text-gold mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white font-[Onest] mb-1">
                    <CountUp end={stat.count} duration={3} enableScrollSpy />
                    {stat.suffix || "+"}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExportSection;
