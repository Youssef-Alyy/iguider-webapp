import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import Image from 'next/image'
import aboutImage from '../../assets/images/about.png'
import missionImage from '../../assets/images/mission.png'

export default function Component() {
	return (
		<>
			<header>
				<title>About - Iguider</title>
				<meta name='description' content='Iguider About Page' />
			</header>
			<div className='flex flex-col min-h-[100dvh]'>
				<main className='flex-1'>
					<section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
						<div className='container px-4 md:px-6'>
							<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
								<div className='flex flex-col justify-center space-y-4'>
									<div className='space-y-2'>
										<h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none'>
											About iGuider
										</h1>
										<p className='max-w-[600px] text-muted-foreground md:text-xl'>
											iGuider is a leading technology company that specializes
											in providing innovative solutions to businesses of all
											sizes. Our mission is to empower our clients with the
											tools and resources they need to succeed in the digital
											age.
										</p>
									</div>
								</div>
								<Image
									src={aboutImage}
									alt='About'
									width={550}
									height={550}
									className='aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square'
								/>
							</div>
						</div>
					</section>
					<section className='w-full py-12 md:py-24 lg:py-32'>
						<div className='container px-4 md:px-6'>
							<div className='space-y-4 text-center'>
								<div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm'>
									Our Leadership Team
								</div>
								<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
									Meet the Experts Behind IGUIDER
								</h2>
							</div>
							<div className='grid gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
								<div className='flex flex-col items-center justify-center space-y-2'>
									<Avatar>
										<AvatarImage src='/placeholder-user.jpg' />
										<AvatarFallback>JD</AvatarFallback>
									</Avatar>
									<div className='space-y-1 text-center'>
										<h3 className='text-lg font-bold'>John Doe</h3>
										<p className='text-sm text-muted-foreground'>
											CEO and Co-Founder
										</p>
									</div>
								</div>
								<div className='flex flex-col items-center justify-center space-y-2'>
									<Avatar>
										<AvatarImage src='/placeholder-user.jpg' />
										<AvatarFallback>JS</AvatarFallback>
									</Avatar>
									<div className='space-y-1 text-center'>
										<h3 className='text-lg font-bold'>Jane Smith</h3>
										<p className='text-sm text-muted-foreground'>
											CTO and Co-Founder
										</p>
									</div>
								</div>
								<div className='flex flex-col items-center justify-center space-y-2'>
									<Avatar>
										<AvatarImage src='/placeholder-user.jpg' />
										<AvatarFallback>MJ</AvatarFallback>
									</Avatar>
									<div className='space-y-1 text-center'>
										<h3 className='text-lg font-bold'>Michael Johnson</h3>
										<p className='text-sm text-muted-foreground'>
											Chief Operating Officer
										</p>
									</div>
								</div>
								<div className='flex flex-col items-center justify-center space-y-2'>
									<Avatar>
										<AvatarImage src='/placeholder-user.jpg' />
										<AvatarFallback>SL</AvatarFallback>
									</Avatar>
									<div className='space-y-1 text-center'>
										<h3 className='text-lg font-bold'>Sarah Lee</h3>
										<p className='text-sm text-muted-foreground'>
											Chief Marketing Officer
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
					<section className='w-full py-12 md:py-24 lg:py-32 bg-muted'>
						<div className='container px-4 md:px-6'>
							<div className='grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]'>
								<Image
									src={missionImage}
									width='550'
									height='310'
									alt='Mission'
									className='mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last'
								/>
								<div className='flex flex-col justify-center space-y-4'>
									<div className='space-y-2'>
										<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
											Our Mission and Values
										</h2>
										<p className='max-w-[600px] text-muted-foreground md:text-xl'>
											At Iguider Inc, our mission is to empower businesses with
											the tools and resources they need to thrive in the digital
											age. We are committed to delivering high-quality products
											and services that help our clients achieve their goals.
											Our core values include innovation, integrity, and a
											relentless focus on customer satisfaction.
										</p>
									</div>
								</div>
							</div>
						</div>
					</section>
				</main>
			</div>
		</>
	)
}

function MountainIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			fill='none'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<path d='m8 3 4 8 5-5 5 15H2L8 3z' />
		</svg>
	)
}
