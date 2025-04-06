import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

function Footer() {
	return (
		<footer className='bg-gray-800 text-white py-4 text-center mt-auto'>
			<p className='mb-2'>
				<FontAwesomeIcon icon={faCopyright} /> {new Date().getFullYear()}{' '}
				Iguider. All rights reserved.
			</p>
			<div>
				<Link
					className='text-gray-400 hover:text-white mx-2'
					href='/privacy-policy'
				>
					Privacy Policy
				</Link>
				|
				<Link
					className='text-gray-400 hover:text-white mx-2'
					href='/terms-of-service'
				>
					Terms of Service
				</Link>
			</div>
		</footer>
	)
}

export default Footer
