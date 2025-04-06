import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/registry/new-york/ui/card'
import { Tabs, TabsContent } from '@/registry/new-york/ui/tabs'
import { FaCheckCircle, FaCog, FaSearch, FaTimesCircle } from 'react-icons/fa'

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
				<div className='flex-1 space-y-4 p-6 pt-6'>
					<Tabs defaultValue='overview' className='space-y-4'>
						<TabsContent value='overview' className='space-y-4'>
							<div className='grid gap-3 md:grid-cols-1 lg:grid-cols-4'>
								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-green-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[0] ? ContainerProps[0].title : ''}
										</CardTitle>
										<FaCheckCircle className='h-4 w-4 text-green-500' />
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
										<FaCog className='h-4 w-4 text-blue-500 slowSpin' />
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

								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-yellow-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[2] ? ContainerProps[2].title : ''}
										</CardTitle>
										<FaSearch className='h-4 w-4 text-yellow-500' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold text-yellow-500'>
											{ContainerProps[2] ? ContainerProps[2].count : 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{ContainerProps[2] ? ContainerProps[2].description : ''}
										</p>
									</CardContent>
								</Card>

								<Card className='shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 border-l-8 border-l-red-500'>
									<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
										<CardTitle className='text-sm font-medium'>
											{ContainerProps[3] ? ContainerProps[3].title : ''}
										</CardTitle>
										<FaTimesCircle className='h-4 w-4 text-red-500' />
									</CardHeader>
									<CardContent>
										<div className='text-2xl font-bold text-red-500'>
											{ContainerProps[3] ? ContainerProps[3].count : 0}
										</div>
										<p className='text-xs text-muted-foreground'>
											{ContainerProps[3] ? ContainerProps[3].description : ''}
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
