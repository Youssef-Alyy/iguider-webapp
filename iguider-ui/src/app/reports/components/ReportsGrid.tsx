import React, { useState, useEffect } from 'react'
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
	ArrowDownTrayIcon,
	MagnifyingGlassIcon,
} from '@heroicons/react/24/solid'
import {
	Report,
	formatTimestamp,
	getStatusBackgroundColor,
	getStatusIcon,
	truncateHash,
} from '@/app/reports/components/ReportUtils'
import DataFetcher from '@/utils/DataFetcher'
import Link from 'next/link'

interface ReportsGridProps {
	searchTerm: string
	setReports: React.Dispatch<React.SetStateAction<Report[]>>
}

const ReportsGrid: React.FC<ReportsGridProps> = ({
	searchTerm,
	setReports,
}) => {
	const [allReports, setAllReports] = useState<Report[]>([])
	const [displayedReports, setDisplayedReports] = useState<Report[]>([])
	const [reportsShownCount, setReportsShownCount] = useState(9)
	const [loading, setLoading] = useState(false)
	const [hasMore, setHasMore] = useState(true)
	const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

	const fetchReports = async () => {
		try {
			setLoading(true)
			const data = await DataFetcher.fetchReports(
				reportsShownCount,
				0,
				searchTerm,
			)

			const formattedReports = data.map(report => ({
				...report,
				timestamp: formatTimestamp(report.timestamp),
			}))

			setAllReports(formattedReports)
			setDisplayedReports(formattedReports.slice(0, reportsShownCount))
			setHasMore(data.length === reportsShownCount)
			setLastUpdate(new Date())
			setReports(formattedReports)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchReports()

		const interval = setInterval(fetchReports, 30000)

		return () => clearInterval(interval)
	}, [searchTerm, reportsShownCount])

	const handleScroll = () => {
		if (
			window.innerHeight + document.documentElement.scrollTop >=
				document.documentElement.offsetHeight - 10 &&
			hasMore &&
			!loading
		) {
			setReportsShownCount(prevReportsPerPage => prevReportsPerPage + 9)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasMore, loading])

	return (
		<div className='w-full mb-8'>
			<div className='text-gray-500 text-sm mb-4'>
				Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : '-'}
			</div>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
				{displayedReports.map(report => (
					<Card
						key={report.report_id}
						className='shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300 flex flex-col h-full'
					>
						<CardHeader>
							<div>
								<CardTitle>{report.title}</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<div className='text-sm font-medium text-muted-foreground mb-3'>
								{truncateHash(report.hash)}
							</div>
							<div className='flex items-center justify-between'>
								<div className='text-sm font-medium text-muted-foreground'>
									{report.timestamp}
								</div>
								<div
									className={`px-2 py-1 rounded-full text-xs font-medium flex items-center ${getStatusBackgroundColor(
										report.status,
									)}`}
								>
									{getStatusIcon(report.status)}
									{report.status}
								</div>
							</div>
							{report.tags.length > 0 ? (
								<div className='mt-5 flex flex-wrap gap-2'>
									{report.tags.map(tag => (
										<div
											key={tag}
											className='inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium'
										>
											{tag}
										</div>
									))}
								</div>
							) : (
								<div className='mt-5'>
									<span className='inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium'>
										No tag
									</span>
								</div>
							)}
						</CardContent>
						<CardFooter>
							<div className='flex items-center gap-4'>
								<Link href={`/reports/${report.report_id}`} passHref>
									<Button
										variant='outline'
										className='p-2 hover:bg-primary hover:text-white'
									>
										<MagnifyingGlassIcon className='w-4 h-4' />
										<span className='text-sm pl-1'>View</span>
									</Button>
								</Link>
								<Link href={`/reports/${report.report_id}/download`} passHref>
									<Button
										variant='outline'
										className='p-2 hover:bg-primary hover:text-white'
									>
										<ArrowDownTrayIcon className='w-4 h-4' />
										<span className='text-sm pl-1'>Download</span>
									</Button>
								</Link>
							</div>
						</CardFooter>
					</Card>
				))}
			</div>
			{loading && hasMore ? (
				<div className='flex justify-center w-full'>
					<div className='loader'>
						<div className='dot'></div>
						<div className='dot'></div>
						<div className='dot'></div>
					</div>
				</div>
			) : null}
			{!hasMore && displayedReports.length === 0 && (
				<div className='p-4 bg-gray-200 rounded-md'>
					<p className='text-gray-700'>
						No reports found for <strong>"{searchTerm}"</strong>
					</p>
				</div>
			)}
		</div>
	)
}

export default ReportsGrid
