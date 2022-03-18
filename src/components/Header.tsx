import React from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  centerTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, centerTitle }) => {
  const BASE_HEADER_CLASS_NAME = 'flex items-center px-4 py-2';
  const JUSTIFY_BY_POSITION = centerTitle
    ? 'justify-center'
    : 'justify-between';
  const HEADER_CLASS_NAME = BASE_HEADER_CLASS_NAME + ' ' + JUSTIFY_BY_POSITION;

  return (
    <section className="w-full rounded-b-sm bg-blue-500">
      <header className={HEADER_CLASS_NAME}>
        <h1 className="text-3xl font-bold text-slate-100">{title}</h1>
        {subtitle && (
          <h2 className="text-lg font-bold text-slate-100">{subtitle}</h2>
        )}
      </header>
    </section>
  );
};

export default Header;
