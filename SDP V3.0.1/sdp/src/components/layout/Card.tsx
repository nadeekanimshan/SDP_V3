import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 shadow-xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
