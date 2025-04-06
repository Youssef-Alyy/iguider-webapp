import * as Switch from '@radix-ui/react-switch'
import React, { useState } from 'react'
import DataSender from '@/utils/DataSender'
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogFooter,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogAction,
	AlertDialogCancel,
} from '@/components/ui/alert-dialog' 

export default function Toggle({ defaultChecked, user_id }) {
	const [isChecked, setChecked] = useState(defaultChecked)
	const [open, setOpen] = useState(false)

	async function handleToggleActive() {
		try {
			const response = await DataSender.activateUser(user_id)
			if (response.status === 200) {
				setChecked(!isChecked)
				console.log('User active status updated')
			} else {
				console.error('Failed to update user active status')
			}
		} catch (error) {
			console.error('Error updating user active status', error)
		}
		setOpen(false) // Close the dialog after attempting to update the status
	}

	return (
		<form>
			<div className='flex items-center'>
				<Switch.Root
					className='w-[42px] h-[25px] bg-blackA6 bg-red-500 rounded-full relative border data-[state=checked]:bg-green-500 outline-none cursor-default'
					checked={isChecked}
					onCheckedChange={() => setOpen(true)} // Open the dialog when the switch is toggled
				>
					<Switch.Thumb className='block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]' />
				</Switch.Root>

				<AlertDialog open={open} onOpenChange={setOpen}>
					<AlertDialogTrigger asChild>
						<div />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Confirm Activation</AlertDialogTitle>
							<AlertDialogDescription>
								Are you sure you want to change the user status?
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel asChild>
								<button className='btn'>Cancel</button>
							</AlertDialogCancel>
							<AlertDialogAction asChild>
								<button className='btn' onClick={handleToggleActive}>
									Confirm
								</button>
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</form>
	)
}
