import React from 'react'
import Image from 'next/image'
import waveBg from '@/assets/images/white.png'
import { useRouter } from 'next/navigation'
import { useUser } from '@/utils/userContext'

function MainSection() {
	const router = useRouter()
	const { userInfo } = useUser()

	const handleGetStartedClick = () => {
		if (userInfo) router.push('/reports')
		else router.push('/login')
	}
	const handleAboutClick = () => {
		router.push('/about')
	}
	return (
		<>
			<div
				className='h-screen text-white flex justify-center items-center'
				style={{
					background:
						'linear-gradient(137.14deg, rgb(73, 50, 114) 24.07%, rgb(160, 107, 214) 109.47%)',
				}}
			>
				<div className='flex flex-col items-center justify-center w-full md:w-1/2 text-center px-4'>
					<h6 className='text-white text-xl font-medium leading-6 mb-5'>
						Powerful Malware Tool for Quick & Effective Analysis
					</h6>
					<h1 className='text-4xl md:text-6xl font-extralight text-white m-0'>
						Analyze Faster,
						<br />
						Secure Smarter
					</h1>
					<p className='mt-4 text-center text-white leading-6 mb-5'>
						iGuider will revolutionize how you analyze and report cyber threat
						intelligence, making your threat analysis faster and more accurate
						than ever before.
					</p>
					<div className='flex flex-col md:flex-row md:space-x-3 z-[21]'>
						<button
							className='text-black bg-white hover:bg-gray-100 transition-colors duration-300 h-12 w-40 rounded-full mt-5 shadow-lg transform hover:scale-105'
							onClick={handleGetStartedClick}
						>
							Get Started
						</button>
						<button
							className='transition-colors duration-300 h-12 w-40 rounded-full text-white mt-5 shadow-lg transform hover:scale-105 bg-primary hover:bg-primary-hover'
							onClick={handleAboutClick}
						>
							Learn more
						</button>
					</div>
				</div>
				<Image
					src={waveBg}
					alt='Wave Background'
					className='absolute top-48 left-0 w-1/2 md:w-full object-cover pointer-events-none'
				/>
			</div>
		</>
	)
}

export default MainSection
