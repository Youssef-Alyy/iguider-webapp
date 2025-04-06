'use client'

import { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { Badge } from '@/registry/new-york/ui/badge'
import Toggle from '@/app/dashboard/components/Toggle'
import { labels, verificationStatus, activeStatus } from '../data/data'
import { DataTableColumnHeader } from './data-table-column-header'
import { Button } from '@/registry/new-york/ui/button'
import DataSender from '@/utils/DataSender'
import { useRouter } from 'next/navigation'
import { Tooltip } from 'flowbite-react'

function handleReportsRedirection(router, userId) {
	router.push(`/reports/${userId}`)
}

export const columns: ColumnDef<any>[] = [
	{
		accessorKey: 'user_id',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='User ID' />
		),
		cell: ({ row }) => {
			const router = useRouter()
			return (
				<Tooltip
					className='text-white text-xs bg-popover-foreground'
					style='light'
					arrow={false}
					placement='top'
					content='View Reports'
				>
					<div
						className='w-[300px] underline cursor-pointer'
						onClick={e =>
							handleReportsRedirection(router, row.getValue('user_id'))
						}
					>
						{row.getValue('user_id')}
					</div>
				</Tooltip>
			)
		},
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'username',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Username' />
		),
		cell: ({ row }) => {
			return (
				<div className='flex space-x-2'>
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('username')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'email',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Email' />
		),
		cell: ({ row }) => {
			const label = labels.find(
				label => label.value === row.original.is_verified,
			)

			return (
				<div className='flex space-x-2'>
					{label && (
						<Badge className={`${label.color} text-white`} variant='outline'>
							{label.label}
						</Badge>
					)}
					<span className='max-w-[500px] truncate font-medium'>
						{row.getValue('email')}
					</span>
				</div>
			)
		},
	},
	{
		accessorKey: 'credits',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Credits' />
		),
		cell: ({ row }) => {
			const [credits, setCredits] = useState<number | string>(
				row.getValue('credits'),
			)
			const [isEditing, setIsEditing] = useState(false)
			const [tempCredits, setTempCredits] = useState(credits)

			const handleSave = async () => {
				const userId = row.getValue('user_id')
				try {
					const response = await DataSender.updateUserLimits(userId, tempCredits)
					if (response.status === 200) {
						setCredits(tempCredits)
						setIsEditing(false)
					}
				} catch (error) {
					console.error('Failed to update credits')
				}
			}

			const handleCancel = () => {
				setIsEditing(false)
				setTempCredits(credits)
			}

			const handleChange = e => {
				const newCredits = e.target.value
				setTempCredits(newCredits)
			}

			return (
				<div
					className={`w-36 font-semibold rounded-md p-1 text-center ${
						isEditing ? '' : 'border border-gray-200'
					}`}
				>
					{isEditing ? (
						<div className='flex flex-col'>
							<input
								type='text'
								value={tempCredits}
								onChange={handleChange}
								className='p-1 text-center border border-gray-200 rounded mb-2'
							/>
							<div className='flex justify-between'>
								<Button
									size='sm'
									className='px-4 border-black'
									variant='outline'
									onClick={handleCancel}
								>
									Cancel
								</Button>
								<Button
									size='sm'
									className='px-4 ml-2 bg-primary hover:bg-primary-hover'
									onClick={handleSave}
								>
									Save
								</Button>
							</div>
						</div>
					) : (
						''
					)}
					<div onClick={e => setIsEditing(true)}>
						{isEditing ? '' : credits}
					</div>
				</div>
			)
		},
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'is_active',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Active Status' />
		),
		cell: ({ row }) => {
			const active = activeStatus.find(
				isActive => isActive.value === row.getValue('is_active'),
			)

			if (!active) {
				return null
			}

			return (
				<div className='ml-4'>
					<Toggle
						defaultChecked={active.value}
						user_id={row.getValue('user_id')}
					></Toggle>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
	{
		accessorKey: 'is_verified',
		header: ({ column }) => (
			<DataTableColumnHeader
				column={column}
				className='w-0 hidden'
				title='Verification Status'
			/>
		),
		cell: ({ row }) => {
			const verified = verificationStatus.find(
				verified => verified.value === row.getValue('is_verified'),
			)

			if (!verified) {
				return null
			}

			return (
				<div className='w-0 items-center hidden'>
					{verified.icon && (
						<verified.icon className='mr-2 h-4 w-4 text-muted-foreground' />
					)}
					<span>{verified.label}</span>
				</div>
			)
		},
		filterFn: (row, id, value) => {
			return value.includes(row.getValue(id))
		},
	},
]
