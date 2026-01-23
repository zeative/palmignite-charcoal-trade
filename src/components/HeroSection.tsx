import backgroundVideo from "@/assets/background.mp4";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRef } from "react";
import CountUp from "react-countup";

const HeroSection = () => {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section
      id="home"
      className="
        relative
        min-h-screen
        flex
        items-center
        w-full
        max-w-full
        py-20
      "
    >
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video ref={videoRef} autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/[94%]" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-gold-radial)" }} />
      </div>

      <div className="hidden lg:block absolute top-20 right-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse z-10" />
      <div className="hidden lg:block absolute bottom-20 left-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl animate-pulse z-10" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 container mx-auto px-4 py-12 sm:py-16 lg:py-20 mt-5">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 items-center">
            <div className="text-center lg:text-left space-y-8 animate-fade-in-left">
              <div className="mt-4">
                <h1 className="font-[poppins] text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold !leading-[1.1]">
                  <span className="text-foreground">{t("hero.title").split(" ").slice(0, 3).join(" ")}</span>
                  <br />
                  <span className="text-gold bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text animate-shimmer">{t("hero.title").split(" ").slice(3).join(" ")}</span>
                </h1>
              </div>

              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">{t("hero.subtitle")}</p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    document.getElementById("contact")?.scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                  className="border-2 border-gold/30 text-gold hover:text-gold hover:bg-gold/10"
                >
                  {t("hero.cta")}
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-1 text-center lg:text-left">
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={3} duration={3} />+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.suppliers.label")}</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={10} duration={5} />+
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.experience.label")}</p>
                </div>
                <div>
                  <p className="text-3xl md:text-4xl font-extrabold text-gold">
                    <CountUp end={95} duration={5} />%
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">{t("hero.stats.quality.label")}</p>
                </div>
              </div>
            </div>

            <div className="hidden lg:block animate-fade-in-right">
              <div className="relative">
                <div className="glass-card p-6 rounded-2xl backdrop-blur-xl bg-card/40 border border-glass-border shadow-2xl">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("hero.features.quality.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("hero.features.quality.desc")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("hero.features.export.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("hero.features.export.desc")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-charcoal" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{t("hero.features.supplier.title")}</h3>
                        <p className="text-sm text-muted-foreground">{t("hero.features.supplier.desc")}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 glass-card p-4 sm:p-6 rounded-xl backdrop-blur-xl bg-gold/10 border border-gold/20 shadow-gold">
                  <p className="text-xs sm:text-sm text-gold font-semibold">{t("hero.badge.title")}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">{t("hero.badge.desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
