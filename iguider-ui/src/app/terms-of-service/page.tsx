// pages/terms-of-service.tsx
import { FC } from 'react'
import Link from 'next/link'

const TermsOfService: FC = () => {
	return (
		<>
			<header>
				<title>Terms of Service - Iguider</title>
				<meta name='description' content='Iguider Terms of Service' />
			</header>
			<main className='max-w-4xl mx-auto p-6'>
				<h1 className='text-4xl font-bold text-primary mb-4'>
					Terms of Service
				</h1>
				<p className='text-lg mb-4'>Last Updated: 21/07/2024</p>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						1. Introduction
					</h2>
					<p className='mb-4'>
						Welcome to Iguider ("we," "our," "us"). These Terms of Service
						("Terms") govern your use of our website{' '}
						<Link
							href='https://iguider.com'
							target='_blank'
							rel='noopener noreferrer'
							className='text-primary underline'
						>
							https://iguider.com
						</Link>{' '}
						and any services or features provided by us. By accessing or using
						our website or services, you agree to be bound by these Terms. If
						you do not agree with these Terms, please do not use our website or
						services.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						2. Use of Our Services
					</h2>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						2.1 Eligibility
					</h3>
					<p className='mb-4'>
						You must be at least 18 years old to use our website or services. By
						using our website or services, you represent and warrant that you
						meet this eligibility requirement.
					</p>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						2.2 Account Responsibilities
					</h3>
					<p className='mb-4'>
						If you create an account with us, you are responsible for
						maintaining the confidentiality of your account information and for
						all activities that occur under your account. You agree to notify us
						immediately of any unauthorized use of your account or any other
						breach of security.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						3. Intellectual Property
					</h2>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						3.1 Ownership
					</h3>
					<p className='mb-4'>
						All content, trademarks, and other intellectual property on our
						website and provided through our services are owned by us or our
						licensors. You may not use, reproduce, distribute, or modify any
						content without our prior written consent.
					</p>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						3.2 User Content
					</h3>
					<p className='mb-4'>
						You retain ownership of any content you submit or post to our
						website or services. By submitting content, you grant us a
						worldwide, royalty-free, and non-exclusive license to use, display,
						and distribute your content in connection with our website and
						services.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						4. Prohibited Activities
					</h2>
					<p className='mb-4'>You agree not to:</p>
					<ul className='list-disc list-inside mb-4'>
						<li>Engage in any unlawful, fraudulent, or deceptive activities</li>
						<li>
							Use our website or services to harass, abuse, or harm others
						</li>
						<li>
							Attempt to gain unauthorized access to our systems or networks
						</li>
						<li>
							Disrupt or interfere with the functioning of our website or
							services
						</li>
					</ul>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						5. Termination
					</h2>
					<p className='mb-4'>
						We reserve the right to suspend or terminate your access to our
						website or services at any time, with or without cause, and with or
						without notice. Upon termination, your right to use our website and
						services will cease immediately.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						6. Disclaimers and Limitation of Liability
					</h2>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						6.1 Disclaimers
					</h3>
					<p className='mb-4'>
						Our website and services are provided "as is" and "as available"
						without any warranties of any kind, whether express or implied. We
						do not guarantee the accuracy, completeness, or reliability of any
						content or information provided.
					</p>
					<h3 className='text-xl font-semibold text-primary mb-2'>
						6.2 Limitation of Liability
					</h3>
					<p className='mb-4'>
						To the fullest extent permitted by law, we shall not be liable for
						any indirect, incidental, special, or consequential damages arising
						out of or in connection with your use of our website or services.
						Our total liability for any claims related to these Terms shall not
						exceed the amount you paid to us, if any, for the use of our
						services.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						7. Indemnification
					</h2>
					<p className='mb-4'>
						You agree to indemnify and hold us harmless from any claims,
						liabilities, damages, losses, or expenses arising out of or related
						to your use of our website or services, your violation of these
						Terms, or your infringement of any rights of another party.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						8. Changes to These Terms
					</h2>
					<p className='mb-4'>
						We may update these Terms from time to time. Any changes will be
						posted on this page with an updated effective date. Your continued
						use of our website or services after any changes constitutes your
						acceptance of the revised Terms.
					</p>
				</section>

				<section className='mb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						9. Governing Law
					</h2>
					<p className='mb-4'>
						These Terms are governed by and construed in accordance with the
						laws of Qatar, without regard to its conflict of law principles. Any
						disputes arising out of or relating to these Terms shall be resolved
						in the courts located in Qatar.
					</p>
				</section>

				<section className='pb-8'>
					<h2 className='text-2xl font-semibold text-primary mb-2'>
						10. Contact Us
					</h2>
					<p className='mb-4'>
						If you have any questions or concerns about these Terms, please
						contact us at:
					</p>
					<address className='not-italic'>
						Iguider
						<br />
						HBKU Research Complex B1, Education City, Al Rayyan, Qatar
						<br />
						<Link
							href='mailto:terms-of-service@iguider.com'
							className='text-primary underline'
						>
							terms-of-service@iguider.com
						</Link>
						<br />
						+97466661111
					</address>
				</section>
			</main>
		</>
	)
}

export default TermsOfService
