'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'

import { Button } from '@/registry/new-york/ui/button'
import { Input } from '@/registry/new-york/ui/input'
import { DataTableViewOptions } from '@/app/dashboard/components/data-table-view-options'

import { activeStatus, verificationStatus } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'
import DataFetcher from '@/utils/DataFetcher'
import { set } from 'zod'
interface DataTableToolbarProps<TData> {
	table: Table<TData>
	setIsSearching: (isSearching: boolean) => void
	searchQuery: string
	setSearchQuery: (searchQuery: string) => void
}

export function DataTableToolbar<TData>({
	table,
	setIsSearching,
	searchQuery,
	setSearchQuery,
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0

	const onSearchQueryChange = e => {
		setSearchQuery(e.target.value)
		if (e.target.value.length === 0) {
			setIsSearching(false)
		}
	}

	async function searchUsers(query) {
		if (query.length > 0) {
			setIsSearching(true)
		}
	}
	return (
		<div className='flex items-center justify-between'>
			<div className='flex flex-1 items-center space-x-2'>
				<Input
					placeholder='Search by Username or Email'
					defaultValue={searchQuery}
					onChange={onSearchQueryChange}
					className='h-8 w-[150px] lg:w-[250px]'
				/>
				<Button
					className='bg-primary hover:bg-primary-hover text-white'
					onClick={() => searchUsers(searchQuery)}
				>
					Search
				</Button>
				{table.getColumn('is_active') && (
					<DataTableFacetedFilter
						column={table.getColumn('is_active')}
						title='is Active'
						options={activeStatus}
					/>
				)}
				{table.getColumn('is_verified') && (
					<DataTableFacetedFilter
						column={table.getColumn('is_verified')}
						title='is Verified'
						options={verificationStatus}
					/>
				)}
				{isFiltered && (
					<Button
						variant='ghost'
						onClick={() => table.resetColumnFilters()}
						className='h-8 px-2 lg:px-3'
					>
						Reset
						<Cross2Icon className='ml-2 h-4 w-4' />
					</Button>
				)}
			</div>
			<DataTableViewOptions table={table} />
		</div>
	)
}
