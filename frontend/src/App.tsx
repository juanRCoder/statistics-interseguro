import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import type { User } from '@my-monorepo/types';
import { capitalize } from '@my-monorepo/utils';

function App() {
  const [count, setCount] = useState(0);

  const user: User = {
    id: '123',
    name: capitalize('john doe'),
    email: '[EMAIL_ADDRESS]',
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <img src={viteLogo} className="w-8" />
          <img src={reactLogo} className="w-8" />
          <span className="font-semibold text-lg">Vite React App</span>
        </div>

        <button className="bg-green-400 text-black px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition">
          Empezar
        </button>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Construye apps modernas con
            <span className="text-green-400"> Vite + React</span>
          </h1>

          <p className="text-slate-400 text-lg">
            Una base rápida para empezar tus proyectos usando monorepos,
            utilidades compartidas y componentes reutilizables.
          </p>

          <div className="flex gap-4">
            <button className="bg-green-400 text-black px-6 py-3 rounded-xl font-semibold hover:bg-green-300 transition">
              Comenzar
            </button>

            <button className="border border-slate-600 px-6 py-3 rounded-xl hover:bg-slate-800 transition">
              Ver documentación
            </button>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl space-y-3">
          <h3 className="text-xl font-semibold text-green-400">Usuario demo</h3>

          <div className="text-slate-300">
            <p>ID: {user.id}</p>
            <p>Nombre: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>

          <button
            onClick={() => setCount((c) => c + 1)}
            className="mt-4 bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            count is {count}
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-8 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Características
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              ⚡ Vite
            </h3>
            <p className="text-slate-400">
              Desarrollo ultra rápido con HMR instantáneo.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              ⚛ React
            </h3>
            <p className="text-slate-400">
              Componentes reutilizables para crear interfaces modernas.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
            <h3 className="text-lg font-semibold text-green-400 mb-2">
              🧩 Monorepo
            </h3>
            <p className="text-slate-400">
              Comparte tipos y utilidades entre múltiples aplicaciones.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 border-t border-slate-800">
        <h2 className="text-3xl font-bold mb-4">Empieza a construir hoy</h2>

        <p className="text-slate-400 mb-8">
          Usa esta base para escalar tus aplicaciones modernas.
        </p>

        <button className="bg-green-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-green-300 transition">
          Crear proyecto
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-slate-500 text-sm border-t border-slate-800">
        Built with Vite + React
      </footer>
    </div>
  );
}

export default App;
