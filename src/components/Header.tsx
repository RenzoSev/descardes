import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <section className="w-full rounded-b-sm bg-blue-500">
      <header className="flex items-center justify-between px-4 py-2">
        <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
        {subtitle && (
          <h2 className="text-lg font-bold text-slate-100">{subtitle}</h2>
        )}
      </header>
    </section>
  );
};

export default Header;
