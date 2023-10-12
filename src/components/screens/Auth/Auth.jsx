import { useState } from 'react'
import { useMutation } from 'react-query'
import { useAuth } from '../../../providers/AuthProvider'
import { AuthService } from '../../../services/auth.service'
import Button from '../../ui/Button'

const Auth = () => {
	const [data, setData] = useState({
		email: '',
		password: '',
	})
	const [type, setType] = useState('login')

	const { setUser } = useAuth()

	const { mutateAsync: loginAsync } = useMutation(
		'login',
		() => AuthService.login(data.email, data.password),
		{
			onError: err => {
				console.error(err)
			},
			onSuccess: ({ data }) => {
				setUser(data.user)
			},
		}
	)

	const { mutateAsync: registerAsync } = useMutation(
		'register',
		() => AuthService.register(data.email, data.password),
		{
			onError: err => {
				console.error(err)
			},
			onSuccess: ({ data }) => {
				setUser(data.user)
			},
		}
	)

	const isAuthType = type === 'login'

	const handleSubmit = e => {
		e.preventDefault()

		if (isAuthType) loginAsync()
		else registerAsync()
	}

	return (
		<div className='text-white w-4/5 mx-auto'>
			<h1 className='text-2xl font-bold text-center mb-10'>Authorization</h1>

			<form onSubmit={handleSubmit}>
				<div className='flex items-center justify-between mb-5 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full mt-10'>
					<input
						type='email'
						placeholder='Email'
						className='bg-transparent w-full border-none outline-none'
						value={data.email}
						onChange={e => setData({ ...data, email: e.target.value })}
						required
					/>
				</div>

				<div className='flex items-center justify-between mb-2 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full'>
					<input
						type='password'
						placeholder='Password'
						className='bg-transparent w-full border-none outline-none'
						value={data.password}
						onChange={e => setData({ ...data, password: e.target.value })}
						required
					/>
				</div>

				<Button type='submit'>{isAuthType ? 'Login' : 'Register'}</Button>

				<div
					className='cursor-pointer mt-3 opacity-50'
					onClick={() => setType(isAuthType ? 'register' : 'login')}
				>
					I want {isAuthType ? 'register' : 'login'}
				</div>
			</form>
		</div>
	)
}

export default Auth
