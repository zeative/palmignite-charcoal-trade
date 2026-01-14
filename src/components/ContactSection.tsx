import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { SectionHeader } from "./ui/corporate/SectionHeader";
import { CorporateCard } from "./ui/corporate/CorporateCard";

const ContactSection = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    try {
      await emailjs.sendForm(
        "service_91q839e",
        "template_8l4j7uo",
        formRef.current,
        "user_mJ3q7Xk8y9z0pL1n2"
      );
      toast.success("Message sent successfully!");
      formRef.current.reset();
      setPhoneNumber("");
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("EmailJS Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <SectionHeader 
          label="Get in Touch"
          title={t("contact.title")}
          subtitle={t("contact.subtitle")}
        />

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 order-1 lg:order-2">
              <CorporateCard className="p-8 border-white/10 bg-white/5">
                <form ref={formRef} noValidate className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        {t("contact.form.name")}
                      </label>
                      <input
                        id="name"
                        name="user_name"
                        type="text"
                        required
                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        {t("contact.form.email")}
                      </label>
                      <input
                        id="email"
                        name="user_email"
                        type="email"
                        required
                        className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-300">
                      Phone Number (Optional)
                    </label>
                    <input
                      id="phone"
                      name="user_phone"
                      type="tel"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none"
                      placeholder="123-456-7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      className="w-full p-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-gold/50 focus:ring-1 focus:ring-gold/50 transition-all outline-none resize-none"
                      placeholder="Tell us about your needs..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-gold hover:bg-gold-dark text-charcoal font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </button>
                </form>
              </CorporateCard>
            </div>

            <div className="lg:col-span-2 order-2 lg:order-1 space-y-6">
              <CorporateCard className="p-6 space-y-6 border-white/10 bg-white/5">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Visit Us</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      Jl. Wates Km 3, Ngestiharjo, Kasihan, Bantul,
                      <br />
                      Yogyakarta 55182, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Email Us</h3>
                    <a href="mailto:palmignitecharcoaltrade@gmail.com" className="text-sm text-gray-400 hover:text-gold transition-colors">
                      palmignitecharcoaltrade@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-gold/10 text-gold">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Call Us</h3>
                    <a href="tel:+6281234567890" className="text-sm text-gray-400 hover:text-gold transition-colors">
                      +62 812 3456 7890
                    </a>
                  </div>
                </div>
              </CorporateCard>

              <div className="h-64 rounded-xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.974917646544!2d110.33446697411646!3d-7.792461677338002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a58066236b937%3A0x6854178553176535!2sJl.%20Wates%20No.Km.3%2C%20Onggobayan%2C%20Ngestiharjo%2C%20Kec.%20Kasihan%2C%20Kabupaten%20Bantul%2C%20Daerah%20Istimewa%20Yogyakarta%2055182!5e0!3m2!1sen!2sid!4v1709628876543!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
