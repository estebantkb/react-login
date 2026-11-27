import { useState } from 'react';

type Operation = '+' | '−' | '×' | '÷';
type CalculationResult = { value: number } | { error: string };
type KeyStyle = 'digit' | 'operation' | 'action' | 'reset' | 'equals' | 'zero';

const keyClasses: Record<KeyStyle, string> = {
  digit:
    'h-14 rounded-xl border border-slate-200 bg-white text-xl font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 active:scale-95 sm:h-16',
  operation:
    'h-14 rounded-xl border border-indigo-100 bg-indigo-50 text-xl font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-100 active:scale-95 sm:h-16',
  action:
    'h-14 rounded-xl border border-slate-200 bg-slate-100 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-200 active:scale-95 sm:h-16',
  reset:
    'h-14 rounded-xl border border-rose-100 bg-rose-50 text-sm font-semibold text-rose-700 shadow-sm transition hover:bg-rose-100 active:scale-95 sm:h-16',
  equals:
    'calculator-keypad-equals rounded-xl border border-indigo-600 bg-indigo-600 text-xl font-bold text-white shadow-md transition hover:bg-indigo-700 active:scale-95',
  zero:
    'calculator-keypad-zero h-14 rounded-xl border border-slate-200 bg-white text-xl font-semibold text-slate-700 shadow-sm transition hover:border-indigo-200 hover:bg-indigo-50 active:scale-95 sm:h-16',
};

function calculate(left: number, right: number, operation: Operation): CalculationResult {
  if (operation === '÷' && right === 0) {
    return { error: 'No se puede dividir entre cero.' };
  }

  let result: number;

  switch (operation) {
    case '+':
      result = left + right;
      break;
    case '−':
      result = left - right;
      break;
    case '×':
      result = left * right;
      break;
    case '÷':
      result = left / right;
      break;
  }

  if (!Number.isFinite(result)) {
    return { error: 'El resultado está fuera del rango permitido.' };
  }

  // Redondea para ocultar pequeños errores de precisión decimal.
  return { value: Number(result.toPrecision(12)) };
}

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  // Guarda el primer número y la operación mientras se ingresa el segundo.
  const [storedValue, setStoredValue] = useState<number | null>(null);
  const [pendingOperation, setPendingOperation] = useState<Operation | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [error, setError] = useState('');

  const enterDigit = (digit: string) => {
    // Empieza un número nuevo tras una operación o agrega el dígito actual.
    const nextDisplay = waitingForOperand || display === '0' ? digit : `${display}${digit}`;

    if (nextDisplay.length <= 16) {
      setDisplay(nextDisplay);
      setWaitingForOperand(false);
      setError('');
    }
  };

  const enterDecimal = () => {
    const currentValue = waitingForOperand ? '0' : display;

    if (!currentValue.includes('.')) {
      setDisplay(`${currentValue}.`);
    }

    setWaitingForOperand(false);
    setError('');
  };

  const deleteDigit = () => {
    setDisplay(waitingForOperand ? '0' : display.slice(0, -1) || '0');
    setWaitingForOperand(false);
    setError('');
  };

  const reset = () => {
    setDisplay('0');
    setExpression('');
    setStoredValue(null);
    setPendingOperation(null);
    setWaitingForOperand(false);
    setError('');
  };

  const chooseOperation = (operation: Operation) => {
    let value = Number(display);

    // Resuelve la operación anterior antes de guardar la siguiente.
    if (storedValue !== null && pendingOperation !== null && !waitingForOperand) {
      const calculation = calculate(storedValue, value, pendingOperation);

      if ('error' in calculation) {
        setError(calculation.error);
        setStoredValue(null);
        setPendingOperation(null);
        return;
      }

      value = calculation.value;
      setDisplay(String(value));
    }

    setStoredValue(value);
    setPendingOperation(operation);
    setWaitingForOperand(true);
    setExpression(`${value} ${operation}`);
    setError('');
  };

  const evaluate = () => {
    if (storedValue === null || pendingOperation === null) {
      return;
    }

    // Calcula el resultado con el número visible y la operación pendiente.
    const right = Number(display);
    const calculation = calculate(storedValue, right, pendingOperation);

    if ('error' in calculation) {
      setError(calculation.error);
      return;
    }

    setDisplay(String(calculation.value));
    setExpression(`${storedValue} ${pendingOperation} ${right} =`);
    setStoredValue(null);
    setPendingOperation(null);
    setWaitingForOperand(true);
    setError('');
  };

  const keys: Array<{
    label: string;
    style: KeyStyle;
    onClick: () => void;
    ariaLabel?: string;
  }> = [
    { label: 'Reset', style: 'reset', onClick: reset },
    { label: '÷', ariaLabel: 'Dividir', style: 'operation', onClick: () => chooseOperation('÷') },
    { label: '×', ariaLabel: 'Multiplicar', style: 'operation', onClick: () => chooseOperation('×') },
    { label: 'DEL', ariaLabel: 'Borrar último dígito', style: 'action', onClick: deleteDigit },
    { label: '7', style: 'digit', onClick: () => enterDigit('7') },
    { label: '8', style: 'digit', onClick: () => enterDigit('8') },
    { label: '9', style: 'digit', onClick: () => enterDigit('9') },
    { label: '−', ariaLabel: 'Restar', style: 'operation', onClick: () => chooseOperation('−') },
    { label: '4', style: 'digit', onClick: () => enterDigit('4') },
    { label: '5', style: 'digit', onClick: () => enterDigit('5') },
    { label: '6', style: 'digit', onClick: () => enterDigit('6') },
    { label: '+', ariaLabel: 'Sumar', style: 'operation', onClick: () => chooseOperation('+') },
    { label: '1', style: 'digit', onClick: () => enterDigit('1') },
    { label: '2', style: 'digit', onClick: () => enterDigit('2') },
    { label: '3', style: 'digit', onClick: () => enterDigit('3') },
    { label: '=', ariaLabel: 'Calcular resultado', style: 'equals', onClick: evaluate },
    { label: '0', style: 'zero', onClick: () => enterDigit('0') },
    { label: '.', style: 'digit', onClick: enterDecimal },
  ];

  return (
    <section className="mx-auto w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-5">
      <h1 className="sr-only">Calculadora</h1>

      <div
        aria-live="polite"
        className="mb-4 flex min-h-28 flex-col justify-end overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-right"
      >
        <div className="min-h-5 truncate text-sm font-medium text-slate-500">
          {error ? '' : expression}
        </div>
        <div className="overflow-x-auto whitespace-nowrap text-4xl font-bold tracking-tight text-slate-900">
          {display}
        </div>
      </div>

      {error && (
        <p role="alert" className="mb-3 text-center text-sm font-medium text-rose-600">
          {error}
        </p>
      )}

      <div className="calculator-keypad">
        {/* Cada botón toma su etiqueta, estilo y acción de la lista de teclas. */}
        {keys.map(({ label, style, onClick, ariaLabel }) => (
          <button
            key={label}
            type="button"
            aria-label={ariaLabel ?? label}
            onClick={onClick}
            className={keyClasses[style]}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}
