'use client'
import React from 'react'
import MainSection from '../components/home/MainSection'
import FlowSection from '../components/home/FlowSection'
import { StarsCanvas } from '@/components/canvas'

const Page = () => {
	return (
		<>
			<header>
				<title>Home - Iguider</title>
				<meta name='description' content='Iguider Home Page' />
			</header>
			<MainSection />
			<FlowSection />
			<StarsCanvas />
		</>
	)
}

export default Page
