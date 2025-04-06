import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon,
} from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/registry/new-york/ui/button'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/registry/new-york/ui/select'
import { createContext, useState } from 'react'

interface DataTablePaginationProps<TData> {
	table: Table<TData>
	setLimit: (limit: number) => void
	setPage: (page: number) => void
	userCount: number
}

export function DataTablePagination<TData>({
	table,
	setLimit,
	setPage,
	userCount,
}: DataTablePaginationProps<TData>) {
	const [pageIndex, setPageIndex] = useState(1)

	const handlePageChange = (direction: string) => {
		if (direction == 'first') {
			table.setPageIndex(0)
			setPageIndex(1)
			setPage(1)
		}
		if (direction == 'next') {
			table.nextPage()
			setPageIndex(pageIndex => pageIndex + 1)
			setPage(pageIndex + 1)
		} else if (direction == 'prev') {
			table.previousPage()
			setPageIndex(pageIndex => pageIndex - 1)
			setPage(pageIndex - 1)
		}
		if (direction == 'last') {
			table.setPageIndex(
				Math.ceil(userCount / table.getState().pagination.pageSize) - 1,
			)
			setPageIndex(Math.ceil(userCount / table.getState().pagination.pageSize))
			setPage(Math.ceil(userCount / table.getState().pagination.pageSize))
		}
	}
	return (
		<div className='flex items-center justify-between px-20 items'>
			<div className='flex items-center space-x-6 lg:space-x-8 w-full justify-end  font-medium'>
				<div className='flex items-center space-x-2'>
					<p className='text-sm font-medium'>Rows per page</p>
					<Select
						value={`${table.getState().pagination.pageSize}`}
						onValueChange={value => {
							table.setPageSize(Number(value))
							setLimit(Number(value))
							setPage(1)
							setPageIndex(1)
						}}
					>
						<SelectTrigger className='h-8 w-[70px]'>
							<SelectValue placeholder={table.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent side='top'>
							{[10, 20, 30, 40, 50].map(pageSize => (
								<SelectItem key={pageSize} value={`${pageSize}`}>
									{pageSize}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className='flex w-[200px]  items-center justify-center text-sm font-medium'>
					Page {pageIndex} of{' '}
					{Math.ceil(userCount / table.getState().pagination.pageSize)}
				</div>
				<div className='flex items-center space-x-2'>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => handlePageChange('first')}
						disabled={pageIndex === 1}
					>
						<span className='sr-only'>Go to first page</span>
						<DoubleArrowLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => handlePageChange('prev')}
						disabled={pageIndex === 1}
					>
						<span className='sr-only'>Go to previous page</span>
						<ChevronLeftIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='h-8 w-8 p-0'
						onClick={() => handlePageChange('next')}
						disabled={
							Math.ceil(userCount / table.getState().pagination.pageSize) ===
							pageIndex
						}
					>
						<span className='sr-only'>Go to next page</span>
						<ChevronRightIcon className='h-4 w-4' />
					</Button>
					<Button
						variant='outline'
						className='hidden h-8 w-8 p-0 lg:flex'
						onClick={() => handlePageChange('last')}
						disabled={
							Math.ceil(userCount / table.getState().pagination.pageSize) ===
							pageIndex
						}
					>
						<span className='sr-only'>Go to last page</span>
						<DoubleArrowRightIcon className='h-4 w-4' />
					</Button>
				</div>
			</div>
		</div>
	)
}
