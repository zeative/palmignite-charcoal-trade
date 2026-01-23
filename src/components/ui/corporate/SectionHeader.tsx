import React from "react";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  label,
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignClass =
    align === "left" ? "text-left mx-0" : align === "right" ? "text-right ml-auto" : "text-center mx-auto";

  return (
    <div className={`mb-12 max-w-4xl ${alignClass} ${className}`}>
      {label && (
        <p className="text-gold font-semibold mb-3 tracking-widest uppercase text-xs md:text-sm">
          {label}
        </p>
      )}
      <h2 className="font-[Onest] text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 h-1 w-20 bg-gold/30 rounded-full ${align === "center" ? "mx-auto" : ""}`} />
    </div>
  );
};
