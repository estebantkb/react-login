import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Ingresa tu nombre.'),
    email: z.string().trim().email('Ingresa un correo válido.'),
    password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  })

export type RegisterFormValues = z.infer<typeof registerSchema>
