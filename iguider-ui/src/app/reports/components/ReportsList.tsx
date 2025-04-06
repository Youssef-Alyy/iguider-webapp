import React, { useState, useEffect } from 'react'
import {
	Table,
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
} from '@/components/ui/table'
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

interface ReportsListProps {
	searchTerm: string
	setReports: React.Dispatch<React.SetStateAction<Report[]>>
}

const ReportsList: React.FC<ReportsListProps> = ({
	searchTerm,
	setReports,
}) => {
	const [allReports, setAllReports] = useState<Report[]>([])
	const [displayedReports, setDisplayedReports] = useState<Report[]>([])
	const [reportsShownCount, setReportsShownCount] = useState(10)
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
			console.error('Failed to fetch reports:', error)
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
			setReportsShownCount(prevReportsPerPage => prevReportsPerPage + 10)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [hasMore, loading])

	return (
		<div>
			<div className='text-gray-500 text-sm mb-4'>
				Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : '-'}
			</div>
			{displayedReports.length > 0 ? (
				<div className='overflow-x-auto'>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Title</TableHead>
								<TableHead>Hash</TableHead>
								<TableHead>Submission Time</TableHead>
								<TableHead>Tags</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Actions</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{displayedReports.map((report, index) => (
								<TableRow key={report.report_id}>
									<TableCell className='px-4 py-2'>{report.title}</TableCell>
									<TableCell className='px-4 py-2'>
										{truncateHash(report.hash)}
									</TableCell>
									<TableCell className='px-4 py-2'>
										{report.timestamp}
									</TableCell>
									<TableCell className='px-4 py-2'>
										{report.tags.length > 0 ? (
											<div className='mt-2 flex flex-wrap gap-2'>
												{report.tags.map((tag, tagIndex) => (
													<div
														key={tagIndex}
														className='inline-block bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-xs font-medium'
													>
														{tag}
													</div>
												))}
											</div>
										) : (
											<div className='mt-2 inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs font-medium'>
												No Tag
											</div>
										)}
									</TableCell>
									<TableCell className='px-4 py-2 max-w-xs overflow-hidden text-center'>
										<div
											className={`px-2 py-1 rounded-full text-xs font-medium flex items-center justify-center ${getStatusBackgroundColor(
												report.status,
											)}`}
										>
											{getStatusIcon(report.status)}
											{report.status}
										</div>
									</TableCell>
									<TableCell className='px-4 py-2 flex items-center ml-1'>
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
											<Link
												href={`/reports/${report.report_id}/download`}
												passHref
											>
												<Button
													variant='outline'
													className='p-2 hover:bg-primary hover:text-white'
												>
													<ArrowDownTrayIcon className='w-4 h-4' />
													<span className='text-sm pl-1'>Download</span>
												</Button>
											</Link>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			) : (
				<div className='p-4 bg-gray-200 rounded-md'>
					<p className='text-gray-700'>
						No reports found for <strong>"{searchTerm}"</strong>
					</p>
				</div>
			)}
			<div className='flex justify-center my-4'>
				{loading && hasMore ? (
					<div className='loader'>
						<div className='dot'></div>
						<div className='dot'></div>
						<div className='dot'></div>
					</div>
				) : null}
			</div>
		</div>
	)
}

export default ReportsList
