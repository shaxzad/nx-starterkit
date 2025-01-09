import './../../../tailwind.css';
import React from 'react';

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  args?: any;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick} style={{ padding: '10px', backgroundColor: 'blue', color: 'white' }}>
    {label}
  </button>
);
