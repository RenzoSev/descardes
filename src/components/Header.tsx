import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  title: string;
  subtitle?: string;
  centerTitle?: boolean;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle, centerTitle }) => {
  const navigate = useNavigate();

  const BASE_HEADER_CLASS_NAME = 'flex items-center px-4 py-2';
  const JUSTIFY_BY_POSITION = centerTitle
    ? 'justify-center text-center'
    : 'justify-between';
  const HEADER_CLASS_NAME = BASE_HEADER_CLASS_NAME + ' ' + JUSTIFY_BY_POSITION;

  return (
    <section className="w-full rounded-b-sm bg-blue-500">
      <header className={HEADER_CLASS_NAME}>
        <h1
          className="text-3xl font-bold tracking-wide text-slate-100"
          onClick={() => navigate(-1)}
        >
          {title}
        </h1>
        {subtitle && (
          <h2 className="text-lg font-bold text-slate-100">{subtitle}</h2>
        )}
      </header>
    </section>
  );
};

export default Header;
