import { Metadata } from 'next'
import Image from 'next/image'
import '@/app/globals.css'

import { Button } from '@/registry/new-york/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/registry/new-york/ui/card'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/registry/new-york/ui/tabs'
import { useEffect } from 'react'

export interface Card {
	title: string
	count: number
	description: string
}

export interface ContainerProps {
	cards: Card[]
}

export default function CardContainer({ ContainerProps }) {
	return (
		<>
			<div className='hidden flex-col md:flex'>
				<div className='flex-1 space-y-4 p-8 pt-6'>
					<div className='flex items-center justify-between space-y-2'></div>
					<Tabs defaultValue='overview' className='space-y-4'>
						<TabsContent value='overview' className='space-y-4'>
							<div className='grid gap-3 md:grid-cols-1 lg:grid-cols-3'>
								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-green-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[0] ? ContainerProps[0].title : ''}
										</CardTitle>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='none'
											stroke='Currentcolor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											className='h-4 w-4 text-green-500'
										>
											<path d='M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
											<circle cx='9' cy='7' r='4' />
											<path d='M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' />
										</svg>
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold text-green-500'>
											{ContainerProps[0] ? ContainerProps[0].count : 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{ContainerProps[0] ? ContainerProps[0].description : ''}
										</p>
									</CardContent>
								</Card>

								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-blue-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[1] ? ContainerProps[1].title : ''}
										</CardTitle>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='none'
											stroke='Currentcolor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											className='h-4 w-4  text-blue-500'
										>
											<rect width='20' height='14' x='2' y='5' rx='2' />
											<path d='M2 10h20' />
										</svg>
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold text-blue-500'>
											{ContainerProps[1] ? ContainerProps[1].count : 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{ContainerProps[1] ? ContainerProps[1].description : ''}
										</p>
									</CardContent>
								</Card>

								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-red-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[2] ? ContainerProps[2].title : ''}
										</CardTitle>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											viewBox='0 0 24 24'
											fill='none'
											stroke='Currentcolor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											className='h-4 w-4 text-red-500'
										>
											<path d='M22 12h-4l-3 9L9 3l-3 9H2' />
										</svg>
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold text-red-500'>
											{ContainerProps[2] ? ContainerProps[2].count : 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{ContainerProps[2] ? ContainerProps[2].description : ''}
										</p>
									</CardContent>
								</Card>
							</div>
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</>
	)
}
