import { useState, type FormEvent } from 'react';

/**
 * Componente Suma (Persona 2)
 * Permite sumar dos números y mostrar el resultado en pantalla.
 * Estilizado con Tailwind CSS siguiendo el diseño de la pizarra.
 */
export default function Addition() {
  const [num1, setNum1] = useState<string>('');
  const [num2, setNum2] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');

  const handleSum = (e?: FormEvent) => {
    if (e) e.preventDefault();

    if (num1.trim() === '' || num2.trim() === '') {
      setError('Por favor, ingresa ambos números.');
      setResult(null);
      return;
    }

    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      setError('Uno o ambos valores no son números válidos.');
      setResult(null);
      return;
    }

    setError('');
    const sumResult = Number((n1 + n2).toFixed(6));
    setResult(sumResult);
  };

  const handleReset = () => {
    setNum1('');
    setNum2('');
    setResult(null);
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-8 transition-all hover:shadow-2xl">
      {/* Encabezado */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Suma de dos números</h2>
          <p className="text-sm text-slate-500 mt-0.5">Ingresa los valores para calcular la suma</p>
        </div>
        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 font-semibold text-xs rounded-full border border-indigo-100">
          Persona 2
        </span>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSum} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="num1" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Num 1
            </label>
            <input
              id="num1"
              type="number"
              step="any"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="Ej: 15"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="num2" className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">
              Num 2
            </label>
            <input
              id="num2"
              type="number"
              step="any"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Ej: 27"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-medium text-rose-700">
            ⚠️ {error}
          </div>
        )}

        {/* Botones de acción */}
        <div className="grid grid-cols-3 gap-3 pt-2">
          <button
            type="submit"
            className="col-span-2 py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl shadow-md hover:shadow-indigo-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Sumar</span>
            <span className="text-indigo-200 text-lg font-bold">+</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="col-span-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-700 font-semibold rounded-xl transition-all cursor-pointer"
          >
            Limpiar
          </button>
        </div>

        {/* Tarjeta de Resultado */}
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Resultado</span>
            {result !== null && (
              <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                {num1} + {num2}
              </span>
            )}
          </div>
          <div className="mt-2 text-3xl font-extrabold text-slate-800 tracking-tight">
            {result !== null ? (
              <span className="text-indigo-600">{result}</span>
            ) : (
              <span className="text-slate-300 font-normal text-2xl">—</span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
