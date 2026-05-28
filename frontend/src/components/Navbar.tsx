import reactLogo from '../assets/react.svg';
import viteLogo from '../../public/vite.svg';
import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3">
        <img src={viteLogo} className="w-8" />
        <img src={reactLogo} className="w-8" />
        <span className="font-semibold text-lg">Vite React App</span>
      </div>

      <button
        onClick={() => setOpen(!open)}
        className="bg-green-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition"
      >
        {open ? 'Detener' : 'Empezar'}
      </button>
    </nav>
  );
};

export default Navbar;
