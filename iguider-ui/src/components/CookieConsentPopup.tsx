'use client'
import React, { useState, useEffect } from 'react'
import { MdCookie } from 'react-icons/md'
import Link from 'next/link'

const CookieConsentPopup = () => {
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		const consent = localStorage.getItem('cookieConsent')
		if (!consent) {
			setTimeout(() => {
				setShowPopup(true)
			}, 2000)
		}
	}, [])

	const handleAccept = () => {
		localStorage.setItem('cookieConsent', 'true')
		setShowPopup(false)
	}

	const handleDecline = () => {
		localStorage.setItem('cookieConsent', 'false')
		setShowPopup(false)
	}

	return (
		<div className={`cookie-popup ${showPopup ? 'show' : ''}`}>
			<div className='cookie-content'>
				<MdCookie className='cookie-icon' />
				<p>
					We use cookies to enhance your browsing experience and provide more
					relevant content. By continuing to use our site, you consent to our
					use of cookies.{' '}
					<Link href='/privacy-policy' className='cookie-link'>
						Learn more
					</Link>
				</p>
				<div className='cookie-buttons'>
					<button onClick={handleDecline} className='cookie-button decline'>
						Necessary Only
					</button>
					<button
						onClick={handleAccept}
						className='cookie-button accept bg-primary'
					>
						Accept All
					</button>
				</div>
			</div>
		</div>
	)
}

export default CookieConsentPopup
