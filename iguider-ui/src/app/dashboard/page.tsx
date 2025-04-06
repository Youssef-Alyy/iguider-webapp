'use client'
import { useEffect, useState } from 'react'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import '@/app/globals.css'
import CardContainer from './components/CardContainer'
import DataFetcher from '@/utils/DataFetcher'
import { Card } from './components/CardContainer'

interface User {
	user_id: string
	username: string
	email: string
	is_active: string
	is_verified: string
	credits: string
}

export default function Page() {
	const [users, setUsers] = useState<User[]>([])
	const [limit, setLimit] = useState<number>(10)
	const [pageIndex, setPageIndex] = useState(1)
	const [cards, setCards] = useState<Card[]>([])
	const [isSearching, setIsSearching] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [searchUsersCount, setSearchUsersCount] = useState(0)

	useEffect(() => {
		const fetchmetrics = async () => {
			try {
				if (isSearching)
					setSearchUsersCount(await DataFetcher.getSearchUserCount(searchQuery))
				setCards([
					{
						title: 'Users',
						count: await DataFetcher.getUserCount(),
						description: 'Total number of users',
					},
					{
						title: 'Reports',
						count: await DataFetcher.getReportCount(),
						description: 'Total number of reports',
					},
					{
						title: 'Errors',
						count: await DataFetcher.getErrorCount(),
						description: 'Total number of errors',
					},
				])
			} catch (error) {
				console.error(error)
			}
		}
		const fetchUsers = async () => {
			try {
				isSearching
					? setUsers(
							await DataFetcher.searchUsers(searchQuery, limit, pageIndex),
					  )
					: setUsers(await DataFetcher.fetchUsers(limit, pageIndex))
			} catch (error) {
				console.error(error)
			}
			console.log('isSearching', isSearching)
		}
		fetchmetrics()
		fetchUsers()
	}, [limit, pageIndex, isSearching])

	return (
		<>
			<header>
				<title>Admin Dashboard - Iguider</title>
				<meta name='description' content='Iguider Admin Dashboard Page' />
			</header>
			<div className='h-full flex-1 flex-col space-y-8 p-8'>
				<div className='flex items-center justify-center space-y-2'>
					<div className='w-full '>
						<h2 className='text-3xl text-center font-bold tracking-tight'>
							Dashboard
						</h2>
					</div>
				</div>
				<div className='border border-slate-200 rounded-2xl'>
					<CardContainer ContainerProps={cards} />
				</div>
				<DataTable
					data={users}
					columns={columns}
					setLimit={setLimit}
					setPage={setPageIndex}
					userCount={
						isSearching ? searchUsersCount : cards[0] ? cards[0].count : 0
					}
					setIsSearching={setIsSearching}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
			</div>
		</>
	)
}
