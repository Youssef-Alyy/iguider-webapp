'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faEye,
	faEyeSlash,
	faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons'
import PasswordStrengthBar from '@/app/login/components/PasswordStrengthBar'
import { useRouter } from 'next/navigation'
import DataSender from '@/utils/DataSender'
import { AlertDestructive } from './Alert'
import zxcvbn from 'zxcvbn'
export default function SignUpForm({ className, children, onSignUpSuccess }) {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const router = useRouter()
	const [showAlert, setShowAlert] = useState(false)
	const [score, setScore] = useState(zxcvbn(password).score)
	const [alertMessage, setAlertMessage] = useState(
		'Failed to sign up. Please try again.',
	)
	const [username, setUsername] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')

	const hideAlertAfterTimeout = () => {
		setTimeout(() => {
			setShowAlert(false)
		}, 4000)
	}

	async function handleSignUpSubmit(e) {
		e.preventDefault()
		if (score <= 2) {
			setAlertMessage('Password is too weak. Please try again.')
			setShowAlert(true)
			return
		}
		const formData = new FormData(e.target)
		const userData = {}
		formData.forEach((value, key) => {
			userData[key] = value
		})

		const user = {
			full_name: `${userData['firstName']} ${userData['lastName']}`,
			username: userData['username'],
			email: userData['email'],
			password: userData['password'],
			biography: '',
			avatar: '',
		}

		try {
			const response = await DataSender.registerUser(user)
			if (response.status === 201) {
				onSignUpSuccess(user.email)
			} else {
				setShowAlert(true)
				hideAlertAfterTimeout()
			}
		} catch (error) {
			if (error.response.status === 400) {
				setAlertMessage(error.response.data.detail)
			}
			setShowAlert(true)
			hideAlertAfterTimeout()
		}
	}

	function handlePasswordChange(e) {
		const password = e.target.value
		setPassword(password)
		const result = zxcvbn(password)
		setScore(result.score)
	}

	return (
		<>
			<div
				className={`relative flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8 ${className}`}
			>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm rounded-2xl shadow-2xl'>
					<h2 className='text-center text-2xl font-bold leading-9 tracking-tight text-white'>
						Sign up
					</h2>
					<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
						<form className='space-y-4' onSubmit={handleSignUpSubmit}>
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium leading-6 text-white'
								>
									Name
								</label>
								<div className='mt-2 flex space-x-2'>
									<input
										id='firstName'
										name='firstName'
										type='text'
										placeholder='First Name'
										className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
									<input
										id='lastName'
										name='lastName'
										type='text'
										placeholder='Last Name'
										className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

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
										className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-white'
								>
									Email address
								</label>
								<div className='mt-2'>
									<input
										id='email'
										name='email'
										type='email'
										autoComplete='email'
										className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
								</div>
								<div className='mt-2'>
									<div className='relative w-full'>
										{showPassword ? (
											<input
												id='password'
												name='password'
												type='text'
												value={password}
												onChange={e => handlePasswordChange(e)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										) : (
											<input
												id='password'
												name='password'
												type='password'
												value={password}
												onChange={e => handlePasswordChange(e)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
									{password.length > 0 ? (
										<PasswordStrengthBar
											className='mt-2'
											password={password}
											score={score}
										></PasswordStrengthBar>
									) : (
										''
									)}
								</div>
							</div>

							<div>
								<div className='flex items-center justify-between'>
									<label
										htmlFor='confirm-password'
										className='block text-sm font-medium leading-6 text-white'
									>
										Confirm Password
									</label>
								</div>
								<div className='mt-2'>
									<div className='relative w-full'>
										{showConfirmPassword ? (
											<input
												id='confirm-password'
												name='confirmPassword'
												type='text'
												value={confirmPassword}
												onChange={e => setConfirmPassword(e.target.value)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										) : (
											<input
												id='confirm-password'
												name='confirmPassword'
												type='password'
												value={confirmPassword}
												onChange={e => setConfirmPassword(e.target.value)}
												className='block w-full rounded-md border-0 py-1.5 px-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											/>
										)}

										<span className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500'>
											{showConfirmPassword ? (
												<FontAwesomeIcon
													icon={faEye}
													onClick={e =>
														setShowConfirmPassword(!showConfirmPassword)
													}
												/>
											) : (
												<FontAwesomeIcon
													icon={faEyeSlash}
													onClick={e =>
														setShowConfirmPassword(!showConfirmPassword)
													}
												/>
											)}
										</span>
									</div>
									{!showConfirmPassword &&
										confirmPassword !== '' &&
										password !== confirmPassword && (
											<div className='flex items-center mt-2 text-sm'>
												<FontAwesomeIcon
													icon={faExclamationCircle}
													className='text-red-600 mr-2'
												/>
												<p className='text-red-600'>Passwords do not match</p>
											</div>
										)}
								</div>
							</div>
							{showAlert && <p className='text-red-600'>{alertMessage}</p>}
							<div>
								<button
									type='submit'
									className='flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
								>
									Sign up
								</button>
							</div>
							{children}
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
