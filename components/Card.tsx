
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <section className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-cyan-400 mb-6 border-b border-slate-700 pb-4">{title}</h2>
      {children}
    </section>
  );
};

export default Card;
