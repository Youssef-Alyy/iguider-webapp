import { FC } from 'react'
import Link from 'next/link'

const PrivacyPolicy: FC = () => {
	return (
		<>
			<header>
				<title>Privacy Policy - Iguider</title>
				<meta name='description' content='Iguider Privacy Policy' />
			</header>
			<main className='max-w-4xl mx-auto p-6'>
				<h1 className='text-4xl font-bold text-primary mb-4'>Privacy Policy</h1>
				<p className='text-lg mb-4'>Last Updated: 21/07/2024</p>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						1. Introduction
					</h2>
					<p className='mb-4'>
						Welcome to Iguider ("we," "our," "us"). We are committed to
						protecting your personal information and your right to privacy. This
						Privacy Policy explains how we collect, use, disclose, and safeguard
						your information when you visit our website{' '}
						<Link
							href='https://iguider.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-primary underline'
						>
							https://iguider.com
						</Link>{' '}
						or use our services. Please read this policy carefully.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						2. Information We Collect
					</h2>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						2.1 Personal Information
					</h3>
					<p className='mb-4'>
						We may collect personal information that you provide to us, such as:
					</p>
					<ul className='list-disc list-inside mb-4'>
						<li>Name</li>
						<li>Email address</li>
						<li>Phone number</li>
						<li>Payment information</li>
					</ul>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						2.2 Non-Personal Information
					</h3>
					<p className='mb-4'>
						We may also collect non-personal information, such as:
					</p>
					<ul className='list-disc list-inside mb-4'>
						<li>IP address</li>
						<li>Browser type</li>
						<li>Operating system</li>
						<li>Usage data (e.g., pages visited, time spent on the site)</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						3. How We Use Your Information
					</h2>
					<p className='mb-4'>
						We may use the information we collect in various ways, including to:
					</p>
					<ul className='list-disc list-inside mb-4'>
						<li>Provide, operate, and maintain our website and services</li>
						<li>Process transactions and send you related information</li>
						<li>Improve our website and services</li>
						<li>
							Communicate with you, including for customer support and marketing
							purposes
						</li>
						<li>
							Monitor and analyze usage and trends to enhance user experience
						</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						4. How We Share Your Information
					</h2>
					<p className='mb-4'>
						We do not sell or rent your personal information to third parties.
						However, we may share your information with:
					</p>
					<ul className='list-disc list-inside mb-4'>
						<li>
							Service providers who assist us in operating our website and
							services
						</li>
						<li>
							Law enforcement or government authorities if required by law
						</li>
						<li>
							Third parties in connection with a business transfer, such as a
							merger or acquisition
						</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						5. Cookies and Tracking Technologies
					</h2>
					<p className='mb-4'>
						We use cookies and similar tracking technologies to enhance your
						browsing experience and collect data about how you use our website.
						You can control your cookie preferences through your browser
						settings.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						6. Data Security
					</h2>
					<p className='mb-4'>
						We implement reasonable security measures to protect your personal
						information from unauthorized access, use, or disclosure. However,
						no method of transmission over the internet or electronic storage is
						100% secure.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						7. Your Rights
					</h2>
					<p className='mb-4'>
						Depending on your location, you may have certain rights regarding
						your personal information, such as:
					</p>
					<ul className='list-disc list-inside mb-4'>
						<li>Accessing or updating your information</li>
						<li>Requesting deletion of your information</li>
						<li>Objecting to or restricting processing of your information</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						8. Changes to This Privacy Policy
					</h2>
					<p className='mb-4'>
						We may update this Privacy Policy from time to time. Any changes
						will be posted on this page with an updated effective date. We
						encourage you to review this policy periodically.
					</p>
				</section>

				<section className='pb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						9. Contact Us
					</h2>
					<p className='mb-4'>
						If you have any questions or concerns about this Privacy Policy or
						our data practices, please contact us at:
					</p>
					<address className='not-italic'>
						Iguider
						<br />
						HBKU Research Complex B1, Education City, Al Rayyan, Qatar
						<br />
						<a
							href='mailto:privacy-policy@iguider.com'
							className='text-primary underline'
						>
							privacy-policy@iguider.com
						</a>
						<br />
						+97466661111
					</address>
				</section>
			</main>
		</>
	)
}

export default PrivacyPolicy
