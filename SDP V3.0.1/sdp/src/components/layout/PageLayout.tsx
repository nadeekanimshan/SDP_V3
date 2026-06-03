import { ReactNode } from "react";

type PageLayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "7xl";
};

const maxWidthClass = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "7xl": "max-w-7xl",
};

export default function PageLayout({ children, title, subtitle, maxWidth = "7xl" }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className={`${maxWidthClass[maxWidth]} mx-auto px-4 sm:px-6 py-6`}>
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h1 className="text-3xl font-bold text-white">{title}</h1>}
            {subtitle && <p className="text-slate-400 mt-1">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
