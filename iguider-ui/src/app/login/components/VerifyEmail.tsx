'use client'

import { Button } from 'flowbite-react'
import { useEffect, useState, useRef } from 'react'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
} from '@/components/ui/alert-dialog'
import mailLogo from '@/assets/images/mail.png'
import DataSender from '@/utils/DataSender'

export default function VerifyEmail({ email, openModal, setOpenModal }) {
	const [timer, setTimer] = useState(0)
	const [disabled, setDisabled] = useState(false)
	const hasMounted = useRef(false)
	useEffect(() => {
		if (!hasMounted.current) {
			sendVerification()
			hasMounted.current = true
		}
	}, [])

	const sendVerification = async () => {
		try {
			if (disabled) {
				return
			}
			const interval = setInterval(() => {
				setTimer(prevTimer => {
					if (prevTimer > 0) {
						return prevTimer - 1
					} else {
						clearInterval(interval)
						setDisabled(false)
						return 0
					}
				})
			}, 1000)
			setTimer(60)
			setDisabled(true)
			const response = await DataSender.sendVerification(email)
		} catch (error) {
			console.error('Failed to send verification email')
		}
	}

	const handleProceedToLogin = () => {
		setOpenModal(false)
		window.location.reload()
	}

	return (
		<AlertDialog open={openModal} onOpenChange={setOpenModal}>
			<AlertDialogTrigger asChild></AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-xl text-center'>
						Verify your Email Account
					</AlertDialogTitle>
					<hr />
					<AlertDialogDescription>
						<div className='space-y-6 flex flex-col items-center'>
							<img className='w-1/3' src={mailLogo.src} alt='Mail Logo' />
							<p className='text-center text-base leading-relaxed text-gray-500 dark:text-gray-400'>
								Check your email for the verification link sent to{' '}
								<b>{email}</b>
							</p>
						</div>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<div className='flex flex-col items-center w-full'>
						<Button
							className='bg-primary hover:bg-primary-hover w-full'
							onClick={handleProceedToLogin}
						>
							Proceed to Login
						</Button>
						<div className='flex items-baseline justify-center w-full mt-2'>
							<p className='text-sm leading-relaxed text-gray-500 dark:text-gray-400'>
								Still can't find the email?
							</p>
							&nbsp;
							<a
								onClick={sendVerification}
								className={`text-blue-500 text-sm ${
									!disabled &&
									'cursor-pointer hover:text-blue-600 hover:underline'
								}`}
							>
								{disabled ? `Resend in ${timer} seconds` : 'Resend'}
							</a>
						</div>
					</div>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
