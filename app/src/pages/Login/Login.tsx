import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'

import Input from '../../components/input/Input'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  lastName: z.string().min(2, 'Last Name must be at least 2 characters long')
})

type DataProps = z.infer<typeof schema>

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DataProps>({
    mode: 'onBlur',
    resolver: zodResolver(schema)
  })

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Input
        type="text"
        {...register('name')}
        placeholder="Name"
        label="Name"
        helperText={errors.name?.message}
      />

      <Input
        type="text"
        {...register('lastName')}
        placeholder="Last Name"
        label="Last Name"
        helperText={errors.lastName?.message}
      />

      <button type="submit">Enter</button>
    </form>
  )
}
