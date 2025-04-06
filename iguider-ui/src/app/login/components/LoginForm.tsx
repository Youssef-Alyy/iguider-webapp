'use client'
import React, { use, useState, useContext, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import ForgotPassword from './ForgotPassword'
import RateLimiter from '@/utils/rateLimiter'
import { useRouter } from 'next/navigation'
import { AlertDestructive } from './Alert'
import { UserUtils } from '@/utils/userUtils'
import DataSender from '@/utils/DataSender'
import { useUser } from '@/utils/userContext'
export default function LoginForm({ className, children }) {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [showForgotPassword, setShowForgotPassword] = useState(false)
	const router = useRouter()
	const limiter = new RateLimiter(3, 10000)
	const [showAlert, setShowAlert] = useState(false)
	const [alertMessage, setAlertMessage] = useState(
		'Failed to log in. Please try again.',
	)
	const { setUserId } = useUser()
	const hideAlertAfterTimeout = () => {
		setTimeout(() => {
			setShowAlert(false)
		}, 4000)
	}
	async function handleLoginSubmit(e) {
		e.preventDefault()
		if (!limiter.isAllowed()) setAlertMessage('Rate limit exceeded.')
		try {
			const response = await DataSender.loginUser(username, password)
			if (response.status === 200) {
				const token = response.data['access_token']
				const userId = UserUtils.getUserId(token)
				localStorage.setItem('userId', userId)
				setUserId(userId)
				router.push('/')
				router.refresh()
			} else {
				setShowAlert(true)
				hideAlertAfterTimeout()
			}
		} catch (error) {
			setAlertMessage(error.response.data.detail)
			setShowAlert(true)
			hideAlertAfterTimeout()
		}
	}
	return (
		<>
			<div
				className={`relative flex min-h-full flex-col justify-center px-6 py-3 lg:px-8 ${className}`}
			>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white'>
						Sign in
					</h2>
					<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
						<form className='space-y-6' onSubmit={handleLoginSubmit}>
							<div>
								<label
									htmlFor='username'
									className='block text-sm font-medium leading-6 text-white'
								>
									Username
								</label>
								<div className='mt-2'>
									<input
										id='username'
										name='username'
										type='text'
										onChange={e => setUsername(e.target.value)}
										required
										className='block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='password'
										className='block text-sm font-medium leading-6 text-white'
									>
										Password
									</label>
									<div className='text-sm'>
										<a
											onClick={e => setShowForgotPassword(true)}
											className='font-semibold text-primary hover:text-primary-hover focus:outline-none'
										>
											Forgot password?
										</a>
									</div>
								</div>
								<div className='mt-2'>
									<div className='relative w-full'>
										{showPassword ? (
											<input
												id='password'
												name='password'
												type='text'
												required
												onChange={e => setPassword(e.target.value)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										) : (
											<input
												id='password'
												name='password'
												type='password'
												required
												onChange={e => setPassword(e.target.value)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-accent shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										)}
										<span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'>
											{showPassword ? (
												<FontAwesomeIcon
													icon={faEye}
													onClick={e => setShowPassword(!showPassword)}
												/>
											) : (
												<FontAwesomeIcon
													icon={faEyeSlash}
													onClick={e => setShowPassword(!showPassword)}
												/>
											)}
										</span>
									</div>
								</div>
							</div>
							{showAlert && <p className='text-red-600'>{alertMessage}</p>}
							<div>
								<button
									type='submit'
									className='flex w-full mb-3 justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								>
									Sign in
								</button>

								{children}
							</div>
						</form>
					</div>
				</div>
				{showForgotPassword && (
					<div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75'>
						<div className='bg-white p-6 rounded-md'>
							<ForgotPassword
								onClose={e => setShowForgotPassword(false)}
							></ForgotPassword>
						</div>
					</div>
				)}
			</div>
		</>
	)
}
