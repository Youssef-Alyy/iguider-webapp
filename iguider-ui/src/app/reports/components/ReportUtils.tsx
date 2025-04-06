import {
	CheckCircleIcon,
	InformationCircleIcon,
	CogIcon,
	XCircleIcon,
} from '@heroicons/react/24/solid'
import styles from '@/app/reports/reports.module.css'

export interface Report {
	report_id: string
	hash: string
	title: string
	timestamp: string
	tags: string[]
	status: 'Completed' | 'In Analysis' | 'In Generation' | 'Failed'
}

export function formatTimestamp(timestamp) {
	const date = new Date(timestamp)
	const day = String(date.getDate()).padStart(2, '0')
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const year = date.getFullYear()
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')

	return `${day}-${month}-${year} ${hours}:${minutes}`
}

export const getStatusBackgroundColor = (status: Report['status']) => {
	switch (status) {
		case 'Completed':
			return 'bg-green-100 text-green-800'
		case 'In Analysis':
			return 'bg-yellow-100 text-yellow-800'
		case 'In Generation':
			return 'bg-blue-100 text-blue-800'
		case 'Failed':
			return 'bg-red-100 text-red-800'
		default:
			return ''
	}
}

export const getStatusIcon = (status: Report['status']) => {
	switch (status) {
		case 'Completed':
			return <CheckCircleIcon className='w-4 h-4 mr-1' />
		case 'In Analysis':
			return <InformationCircleIcon className='w-4 h-4 mr-1' />
		case 'In Generation':
			return <CogIcon className={`w-4 h-4 mr-1 ${styles.spin}`} />
		case 'Failed':
			return <XCircleIcon className='w-4 h-4 mr-1' />
		default:
			return null
	}
}

export const truncateHash = (hash: string) => {
	return hash.length > 1
		? hash.substring(0, Math.ceil(hash.length / 2)) + '...'
		: hash
}
