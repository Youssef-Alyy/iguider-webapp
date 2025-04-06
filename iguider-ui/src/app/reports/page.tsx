'use client'
import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faThLarge,
	faBars,
	faXmarkCircle,
} from '@fortawesome/free-solid-svg-icons';
import SearchBar from '@/app/reports/components/SearchBar';
import ReportsGrid from '@/app/reports/components/ReportsGrid';
import ReportsList from '@/app/reports/components/ReportsList';
import { Report, formatTimestamp } from '@/app/reports/components/ReportUtils';
import { useRouter } from 'next/navigation';
import { Input } from '@/registry/new-york/ui/input';
import Upload from './components/Upload';
import CardContainer, { Card } from '@/app/reports/components/CardContainer';
import { ArrowUpTrayIcon } from '@heroicons/react/24/solid';
import { Button } from '@/components/ui/button';
import DataFetcher from '@/utils/DataFetcher';
import './reports.module.css';

export default function Page() {
	const [searchTerm, setSearchTerm] = useState<string>('');
	const [isGridView, setIsGridView] = useState(false);
	const [reports, setReports] = useState<Report[]>([]);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
	const dialogRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [cards, setCards] = useState<Card[]>([]);

	const fetchReports = async (searchTerm: string) => {
		const response = await fetch('http://localhost:3000/api/reports?limit=10', {
			method: 'GET',
			credentials: 'include',
		});

		if (response.ok) {
			setIsAuthenticated(true);
		} else if (response.status === 401) {
			setIsAuthenticated(false);
			router.push('/login');
		} else {
			console.error('Failed to fetch reports');
			alert('Failed to fetch reports, please try again later');
			router.push('/');
		}
	};

	useEffect(() => {
		const fetchMetrics = async () => {
			try {
				const counts = await DataFetcher.getReportStatusesCount();
				setCards([
					{
						title: 'Completed',
						count: counts['Completed'],
						description: '',
					},
					{
						title: 'In Generation',
						count: counts['In Generation'],
						description: '',
					},
					{
						title: 'In Analysis',
						count: counts['In Analysis'],
						description: '',
					},
					{
						title: 'Failed',
						count: counts['Failed'],
						description: '',
					},
				]);
			} catch (error) {
				console.error(error);
			}
		};

		fetchMetrics();

		const interval = setInterval(() => {
			fetchMetrics();
		}, 30000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		fetchReports(searchTerm);
	}, [searchTerm]);

	const handleSearch = () => {
		fetchReports(searchTerm);
	};

	const toggleView = () => {
		setIsGridView(!isGridView);
	};

	const openDialog = () => {
		setIsDialogOpen(true);
	};

	const closeDialog = () => {
		setIsDialogOpen(false);
		window.location.reload();
	};

	return (
		<div className='w-full mx-auto px-4 md:px-6 py-8'>
			<div className='flex flex-col items-center justify-center'>
				<h1 className='text-4xl font-bold mb-7 pb-2 text-black text-center'>Reports</h1>
				<div className='border border-slate-200 rounded-2xl w-full mb-4'>
					<CardContainer ContainerProps={cards} />
				</div>
				<div className='w-full flex justify-between items-center mb-4 mt-2'>
					<div className='flex items-center'>
						<Input
							placeholder='Search reports...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='h-10 w-[30rem]'
						/>
						<Button onClick={handleSearch} className='ml-2 px-3 py-2 text-white font-semibold rounded-md focus:outline-none'>
							Search
						</Button>
					</div>
					<div className='flex justify-end items-center'>
						<Button
							onClick={toggleView}
							variant='outline'
							className='flex items-center p-2 rounded-md hover:bg-gray-200 focus:outline-none'
						>
							<FontAwesomeIcon icon={isGridView ? faBars : faThLarge} className='text-gray-600 text-md mr-1' />
							<span className='text-gray-600 text-sm'>
								{isGridView ? 'Switch to List View' : 'Switch to Grid View'}
							</span>
						</Button>
						<Button className='ml-4' onClick={openDialog}>
							<ArrowUpTrayIcon className='w-4 h-4 text-white' />
							<span className='text-sm text-white pl-1'>Upload</span>
						</Button>
					</div>
				</div>
			</div>
			{isGridView ? (
				<ReportsGrid setReports={setReports} searchTerm={searchTerm} />
			) : (
				<ReportsList setReports={setReports} searchTerm={searchTerm} />
			)}

			{isDialogOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
					<div ref={dialogRef} className='bg-white rounded-md p-2 flex flex-col shadow-md'>
						<button onClick={closeDialog} className='self-end'>
							<FontAwesomeIcon icon={faXmarkCircle}></FontAwesomeIcon>
						</button>
						<Upload onClose={closeDialog} />
					</div>
				</div>
			)}
		</div>
	);
}
