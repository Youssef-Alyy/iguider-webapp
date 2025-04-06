'use client'
import { useEffect, useRef, useState } from 'react'
import { useUser } from '@/utils/userContext'
import DataSender from '@/utils/DataSender'
import { useRouter } from 'next/navigation'
import { AvatarImage, AvatarFallback, Avatar } from '@/components/ui/avatar'
import {
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
	Card,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export default function ProfilePage() {
	const { userInfo, userProfile, setUserProfile } = useUser()
	const router = useRouter()
	const [loading, setLoading] = useState(false)
	const [currentPassword, setCurrentPassword] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [isEditPass, setIsEditPass] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [showValidatePassword, setShowValidatePassword] = useState(true)
	const [passwordChanged, setPasswordChanged] = useState(false)
	const [passwordError, setPasswordError] = useState('')
	const [verifyError, setVerifyError] = useState('')

	const nameRef = useRef<HTMLInputElement>(null)
	const emailRef = useRef<HTMLInputElement>(null)
	const bioRef = useRef<HTMLTextAreaElement>(null)

	const validateCurrentPassword = async (
		userId: string,
		currentPassword: string,
	) => {
		try {
			const response = await DataSender.validatePassword(
				userId,
				currentPassword,
			)
			return response
		} catch (error) {
			console.error('Error validating password:', error.message)
			return false
		}
	}

	async function handleSaveChanges() {
		if (!userProfile || !userInfo) return

		const name = nameRef.current ? nameRef.current.value : ''
		const email = emailRef.current ? emailRef.current.value : ''
		const bio = bioRef.current ? bioRef.current.value : ''

		const updatedProfile = {
			...userProfile,
			full_name: name || userProfile.full_name,
			email: email || userProfile.email,
			biography: bio || userProfile.biography,
		}

		setLoading(true)

		const response = await DataSender.updateProfile(
			userInfo.user_id,
			updatedProfile,
		)

		setLoading(false)

		if (response) {
			setUserProfile(updatedProfile)
			setIsEditing(false)
		} else {
			console.error('Failed to update profile')
		}
	}

	const handleValidatePass = async () => {
		if (!currentPassword) {
			console.error('Current password cannot be empty')
			return
		}

		setLoading(true)

		setVerifyError('')

		try {
			const isValid = await validateCurrentPassword(
				userInfo.user_id,
				currentPassword,
			)
			setLoading(false)
			setCurrentPassword('')

			if (isValid) {
				console.log('Provided password matches the stored hash')
				setIsEditPass(true)
			} else {
				console.error('Provided password does not match the stored hash')
				setVerifyError('Incorrect password, please try again.')
			}
		} catch (error) {
			console.error('Error verifying password', error.message)
			setLoading(false)
		}
	}

	const handlePasswordChange = async () => {
		if (
			!newPassword ||
			!confirmPassword ||
			newPassword !== confirmPassword ||
			!userProfile ||
			!userInfo
		) {
			setPasswordError('Password fields must match and cannot be empty')
			console.error('Password fields must match and cannot be empty')
			return
		}

		setPasswordError('')

		const updatedProfile = {
			...userProfile,
			password: newPassword,
		}

		setLoading(true)

		try {
			const response = await DataSender.updateProfile(
				userInfo.user_id,
				updatedProfile,
			)

			setLoading(false)

			if (response) {
				console.log('Password updated successfully')
				setNewPassword('')
				setConfirmPassword('')
				setPasswordChanged(true)
				setIsEditPass(false)
				setTimeout(() => setPasswordChanged(false), 3000)
			} else {
				console.error('Failed to update password')
			}
		} catch (error) {
			console.error('Error updating password:', error.message)
			setLoading(false)
		}
	}

	return (
		<>
			<header>
				<title>Profile - Iguider</title>
				<meta name='description' content='Iguider Profile Page' />
			</header>
			<div className='flex flex-col min-h-screen'>
				<main className='flex-1 bg-gray-100 dark:bg-gray-800 p-4 md:p-8'>
					<div className='max-w-4xl mx-auto grid gap-8'>
						<Card>
							<CardHeader>
								<div className='flex items-center gap-4'>
									<Avatar>
										{userProfile && userProfile['avatar'] && (
											<AvatarImage src={userProfile['avatar']} />
										)}
										<AvatarFallback>
											{userProfile && userProfile.full_name
												? userProfile.full_name
														.split(' ')
														.map((part: string) => part[0])
														.join('')
														.toUpperCase()
														.slice(0, 2)
												: ''}
										</AvatarFallback>
									</Avatar>
									<div className='grid gap-0.5'>
										<div className='text-lg font-semibold '>
											{userProfile ? userProfile['full_name'] : ''}
										</div>
										<div className='text-sm text-gray-500 dark:text-gray-400'>
											@{userProfile ? userProfile['username'] : ''}
										</div>
									</div>
								</div>
							</CardHeader>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Credits</CardTitle>
								<CardDescription>View your remaining credits.</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-1'>
										<p className='text-sm font-medium'>Total Credits</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											You have {`${userInfo ? userInfo['credits'] : 0}`} credits
											remaining.
										</p>
									</div>
									<div className='text-2xl font-bold'>
										{`${userInfo ? userInfo['credits'] : 0}`}
									</div>
								</div>
								{/* <Button>Buy More Credits</Button> */}
							</CardContent>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Personal Information</CardTitle>
								<CardDescription>Update your personal details.</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-6'>
								<div className='grid md:grid-cols-2 gap-4'>
									<div className='space-y-2'>
										<Label htmlFor='name'>Name</Label>
										<Input
											defaultValue={userProfile ? userProfile.full_name : ''}
											id='name'
											ref={nameRef}
											disabled={!isEditing}
										/>
									</div>
									<div className='space-y-2'>
										<Label htmlFor='email'>Email</Label>
										<Input
											defaultValue={userProfile ? userProfile.email : ''}
											id='email'
											type='email'
											ref={emailRef}
											disabled={!isEditing}
										/>
									</div>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='bio'>Bio</Label>
									<Textarea
										className='min-h-[100px]'
										defaultValue={userProfile ? userProfile.biography : ''}
										id='bio'
										ref={bioRef}
										disabled={!isEditing}
									/>
								</div>
							</CardContent>
							<CardFooter>
								<Button
									onClick={
										isEditing ? handleSaveChanges : () => setIsEditing(true)
									}
									disabled={loading}
									className='text-white'
								>
									{isEditing
										? loading
											? 'Saving...'
											: 'Save Changes'
										: 'Edit Profile'}
								</Button>
							</CardFooter>
						</Card>
						{/* Change Password Card */}
						<Card>
							<CardHeader>
								<CardTitle>Change Password</CardTitle>
								<CardDescription>Update your account password.</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-6'>
								{passwordChanged ? (
									<Card className='bg-green-100 p-4'>
										<p className='text-green-500'>
											Password changed successfully!
										</p>
									</Card>
								) : (
									<>
										{!isEditPass ? (
											<>
												<div className='space-y-2'>
													<Label htmlFor='current-password'>
														Current Password
													</Label>
													<Input
														id='current-password'
														type='password'
														value={currentPassword}
														onChange={e => setCurrentPassword(e.target.value)}
														disabled={loading}
													/>
													{verifyError && (
														<div className='text-red-500'>{verifyError}</div>
													)}
												</div>
											</>
										) : (
											<>
												<div className='space-y-2'>
													<Label htmlFor='new-password'>New Password</Label>
													<Input
														id='new-password'
														type='password'
														value={newPassword}
														onChange={e => setNewPassword(e.target.value)}
														disabled={loading}
													/>
												</div>
												<div className='space-y-2'>
													<Label htmlFor='confirm-password'>
														Confirm Password
													</Label>
													<Input
														id='confirm-password'
														type='password'
														value={confirmPassword}
														onChange={e => setConfirmPassword(e.target.value)}
														disabled={loading}
													/>
												</div>
												{passwordError && (
													<div className='text-red-500'>{passwordError}</div>
												)}
											</>
										)}
									</>
								)}
							</CardContent>
							<CardFooter>
								{passwordChanged ? (
									<div>
										<p className='text-green-500'></p>
									</div>
								) : (
									<>
										{!isEditPass ? (
											<Button
												onClick={handleValidatePass}
												disabled={loading}
												className='text-white'
											>
												{loading ? 'Validating...' : 'Validate Password'}
											</Button>
										) : (
											<>
												<Button
													onClick={handlePasswordChange}
													disabled={loading}
													className='text-white'
												>
													{loading ? 'Updating...' : 'Update Password'}
												</Button>
											</>
										)}
									</>
								)}
							</CardFooter>
						</Card>
						<Card>
							<CardHeader>
								<CardTitle>Notification Preferences</CardTitle>
								<CardDescription>
									Manage your notification settings.
								</CardDescription>
							</CardHeader>
							<CardContent className='grid gap-4'>
								<div className='flex items-center justify-between'>
									<div className='space-y-1'>
										<p className='text-sm font-medium'>Email Notifications</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											Receive email notifications for important updates.
										</p>
									</div>
									<Switch defaultChecked id='email-notifications' />
								</div>
								<div className='flex items-center justify-between'>
									<div className='space-y-1'>
										<p className='text-sm font-medium'>Push Notifications</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											Receive push notifications for real-time updates.
										</p>
									</div>
									<Switch id='push-notifications' />
								</div>
								<div className='flex items-center justify-between'>
									<div className='space-y-1'>
										<p className='text-sm font-medium'>SMS Notifications</p>
										<p className='text-sm text-gray-500 dark:text-gray-400'>
											Receive SMS notifications for critical alerts.
										</p>
									</div>
									<Switch id='sms-notifications' />
								</div>
							</CardContent>
							<CardFooter>
								<Button className='text-white'>Save Preferences</Button>
							</CardFooter>
						</Card>
					</div>
				</main>
			</div>
		</>
	)
}
