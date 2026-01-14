import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

interface FooterProps {
  mobileMap?: React.ReactNode;
}

const Footer: React.FC<FooterProps> = ({ mobileMap }) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-card border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/10">
                <img src="/web-app-manifest-192x192.png" className="w-8 h-8" alt="Palmignite Logo" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-heading font-medium text-foreground tracking-wide leading-none">
                  PALM<span className="text-primary">IGNITE</span>
                </h1>
                <span className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase mt-1">Premium Charcoal</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed font-light max-w-xs">
              Trusted Indonesian charcoal exporter delivering premium-quality products to international standards.
            </p>
            
            <div className="flex gap-3">
              <a href="https://instagram.com/palmignite.trade" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="mailto:palmignitecharcoaltrade@gmail.com" className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://wa.me/6282221521043" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 hover:bg-primary hover:border-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading text-xs font-semibold text-foreground mb-6 tracking-widest uppercase">Navigation</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", id: "about" },
                { name: "Product Specifications", id: "product-specifications" },
                { name: "Legal & Certification", href: "https://drive.google.com/drive/folders/1lCKQ2CY_7f2VKOeWnnzZzIF-zP9aFx0U?usp=drive_link" },
                { name: "Terms & Conditions", id: "terms-conditions" },
                { name: "Privacy Policy", id: "privacy-policy" }
              ].map((item, i) => (
                <li key={i}>
                  <a 
                    href={item.href || `#${item.id}`} 
                    target={item.href ? "_blank" : undefined}
                    rel={item.href ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-heading text-xs font-semibold text-foreground mb-6 tracking-widest uppercase">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted-foreground text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors border border-white/5">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Location</span>
                  <span className="font-medium">Yogyakarta, Indonesia</span>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors border border-white/5">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">Email</span>
                  <a href="mailto:palmignitecharcoaltrade@gmail.com" className="font-medium hover:text-primary transition-colors">palmignitecharcoaltrade@gmail.com</a>
                </div>
              </li>
              <li className="flex items-center gap-3 text-muted-foreground text-sm group">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-primary/10 transition-colors border border-white/5">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-muted-foreground/50 uppercase tracking-wider">WhatsApp</span>
                  <a href="https://wa.me/6282221521043" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-primary transition-colors">+62 822-2152-1043</a>
                </div>
              </li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="font-heading text-xs font-semibold text-foreground mb-6 tracking-widest uppercase">Certifications</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Quality Standard</p>
                <p className="text-sm font-medium">ISO 9001:2015 Certified</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Legal Status</p>
                <p className="text-sm font-medium">Registered Exporter</p>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 gap-4">
          <p className="text-xs text-muted-foreground font-light">
            © 2025 <span onClick={() => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })} className="text-foreground font-medium hover:text-primary cursor-pointer transition-colors">Palmignite Charcoal Trade</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] text-muted-foreground uppercase tracking-widest">
            <span>Premium Indonesian Export</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
