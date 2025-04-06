'use client'
import React, { Suspense, useEffect, useState } from 'react'
import LoginForm from './components/LoginForm'
import Logo from '@/assets/images/main-logo.png'
import '@/app/globals.css'
import Image from 'next/image'
const VerifyEmail = React.lazy(() => import('./components/VerifyEmail'))
const SignUpForm = React.lazy(() => import('./components/SignUpForm'))
import EarthCanvas from '@/components/Earth'
import { StarsCanvas } from '@/components/canvas'

export default function Page() {
	const imageUrl = Logo.src
	const [isSigningUp, setShowSignUp] = useState(false)
	const [showEmailDialog, setShowEmailDialog] = useState(false)
	const [email, setEmail] = useState('')

	const handleSignUpSuccess = email => {
		setEmail(email)
		setShowEmailDialog(true)
	}

	return (
		<>
			<header>
				<title>Login - Iguider</title>
				<meta name='description' content='Iguider Login Page' />
			</header>
			<div className='flex flex-col h-screen overflow-hidden'>
				<div className='flex-grow md:flex md:flex-row'>
					<div className='hidden md:block h-full w-1/2 bg-accent'>
						{/* <Image
							width='500'
							height='500'
							src={imageUrl}
							alt='iguider-logo'
							className='object-contain w-full h-full'
						></Image> */}
						<StarsCanvas />
						<EarthCanvas />
					</div>
					<div className='w-full md:w-1/2  overflow-auto bg-accent'>
						{isSigningUp ? (
							<SignUpForm className='' onSignUpSuccess={handleSignUpSuccess}>
								<p className='text-center text-sm text-gray-500'>
									Already have an account?{' '}
									<button
										className='font-semibold leading-6 text-primary hover:text-primary-hover'
										onClick={e => setShowSignUp(false)}
									>
										Log in
									</button>
								</p>
							</SignUpForm>
						) : (
							<LoginForm className='z-50'>
								<p className='text-center text-sm text-gray-500'>
									Not a member?{' '}
									<button
										className='font-semibold leading-6 text-primary hover:text-primary-hover'
										onClick={e => setShowSignUp(true)}
									>
										Register
									</button>
								</p>
							</LoginForm>
						)}
					</div>
				</div>
				{showEmailDialog && (
					<VerifyEmail
						email={email}
						openModal={showEmailDialog}
						setOpenModal={setShowEmailDialog}
					></VerifyEmail>
				)}
			</div>
		</>
	)
}
