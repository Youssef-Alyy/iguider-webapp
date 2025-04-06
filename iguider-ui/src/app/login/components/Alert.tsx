import { AlertCircle } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface AlertProps  {
    message: string
    className?: string
}

export function AlertDestructive(AlertProps) {
	return (
		<Alert variant='destructive' className={AlertProps.className}>
			<AlertCircle className='h-4 w-4' />
			<AlertTitle>Error</AlertTitle>
			<AlertDescription>{AlertProps.message}</AlertDescription>
		</Alert>
	)
}