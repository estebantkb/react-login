import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterFormValues } from '../model/registerSchema'

const fields = [
  { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Tu nombre' },
  { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@correo.com' },
  { name: 'password', label: 'Contraseña', type: 'password', placeholder: 'Mínimo 8 caracteres' },
  { name: 'confirmPassword', label: 'Confirmar contraseña', type: 'password', placeholder: 'Repite tu contraseña' },
] as const

export function RegisterForm() {
  const [submittedName, setSubmittedName] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(values: RegisterFormValues) {
    setSubmittedName(values.name.trim())
  }

  return (
    <>
      {submittedName ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status">
          <h2 className="font-semibold text-emerald-900">¡Gracias, {submittedName}!</h2>
          <p className="mt-2 text-sm leading-6 text-emerald-800">
            El formulario se validó correctamente. Esta práctica no guarda cuentas todavía.
          </p>
        </div>
      ) : (
        <form className="space-y-4" noValidate onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field) => {
            const error = errors[field.name]

            return (
              <div key={field.name}>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700" htmlFor={field.name}>
                  {field.label}
                </label>
                <input
                  autoComplete={field.name === 'name' ? 'name' : field.name === 'email' ? 'email' : 'new-password'}
                  className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                    error
                      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
                      : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100'
                  }`}
                  id={field.name}
                  placeholder={field.placeholder}
                  type={field.type}
                  {...register(field.name)}
                  aria-describedby={error ? `${field.name}-error` : undefined}
                  aria-invalid={Boolean(error)}
                />
                {error?.message && (
                  <p className="mt-1.5 text-sm text-rose-700" id={`${field.name}-error`}>
                    {error.message}
                  </p>
                )}
              </div>
            )
          })}

          <button
            className="w-full rounded-xl bg-indigo-600 px-5 py-3.5 font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-200"
            type="submit"
          >
            Crear cuenta
          </button>
        </form>
      )}
    </>
  )
}
