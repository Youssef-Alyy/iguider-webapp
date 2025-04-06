import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function Component() {
	return (
		<>
			<header>
				<title>Contact - Iguider</title>
				<meta name='description' content='Iguider Contact Page' />
			</header>
			<div className='flex flex-col items-center'>
				<section className='w-full py-20 bg-muted'>
					<div className='container mx-auto'>
						<div className='text-center mb-8'>
							<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none py-8'>
								Message Us
							</h2>
							<p className='text-muted-foreground md:text-xl py-3'>
								Have a question or need help? Fill out the form below and we'll
								get back to you as soon as possible.
							</p>
						</div>
						<form className='space-y-8 max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg'>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
								<div className='space-y-2'>
									<Label htmlFor='first-name'>First Name</Label>
									<Input
										id='first-name'
										placeholder='First Name'
										className='rounded-md focus:ring-2 focus:ring-teal-500'
									/>
								</div>
								<div className='space-y-2'>
									<Label htmlFor='last-name'>Last Name</Label>
									<Input
										id='last-name'
										placeholder='Last Name'
										className='rounded-md focus:ring-2 focus:ring-teal-500'
									/>
								</div>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									placeholder='Email'
									type='email'
									className='rounded-md focus:ring-2 focus:ring-teal-500'
								/>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='comments'>Comments</Label>
								<Textarea
									id='comments'
									placeholder='Enter your comments'
									className='min-h-[100px] rounded-md focus:ring-2 focus:ring-teal-500'
								/>
							</div>
							<Button className='text-white w-full transition duration-300 rounded-md'>
								Submit
							</Button>
						</form>
					</div>
				</section>

				<section className='w-full py-12 md:py-24 lg:py-20 bg-primary'>
					<div className='container px-4 md:px-6 text-center text-white'>
						<h2 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none mb-8'>
							Get In Touch
						</h2>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
							<div className='space-y-4'>
								<MapPinIcon className='w-12 h-12 mx-auto' />
								<h3 className='text-xl font-semibold'>Address</h3>
								<a
									href='https://www.google.com/maps/place/Qatar+Computing+Research+Institute/@25.3215509,51.4257011,18.69z/data=!4m6!3m5!1s0x3e45dea60775c423:0x5d2ced32b92a1b47!8m2!3d25.3215914!4d51.4257738!16s%2Fm%2F0h7nc75?entry=ttu'
									target='_blank'
								>
									Education City, Ar-Rayyan
								</a>
							</div>
							<div className='space-y-4'>
								<PhoneIcon className='w-12 h-12 mx-auto' />
								<h3 className='text-xl font-semibold'>Phone</h3>
								<a
									href='tel:+974 6666 1111'
									target='_blank'
									rel='noopener noreferrer'
								>
									+974 6666 1111
								</a>
							</div>
							<div className='space-y-4'>
								<MailIcon className='w-12 h-12 mx-auto' />
								<h3 className='text-xl font-semibold'>Email</h3>
								<a href='mailto:example@gmail.com'>example@gmail.com</a>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	)
}

function MailIcon(props) {
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
			<rect width='20' height='16' x='2' y='4' rx='2' />
			<path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
		</svg>
	)
}

function MapPinIcon(props) {
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
			<path d='M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' />
			<circle cx='12' cy='10' r='3' />
		</svg>
	)
}

function PhoneIcon(props) {
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
			<path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
		</svg>
	)
}
