import Link from 'next/link'
import {
	NavigationMenu,
	NavigationMenuList,
	NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { use, useEffect, useState } from 'react'
import Logo from '../assets/images/iGuiderLogo.png'
import DataFetcher from '@/utils/DataFetcher'
import DataSender from '@/utils/DataSender'
import { useRouter } from 'next/navigation'
import { useUser } from '@/utils/userContext'
import EarthCanvas from '@/components/Earth'

export default function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const router = useRouter()
	const { userInfo, userProfile } = useUser()

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.pageYOffset
			setIsScrolled(scrollY > 0)
		}
		window.addEventListener('scroll', handleScroll)
		return () => window.removeEventListener('scroll', handleScroll)
	}, [])

	const handleLinkClick = () => {
		setIsOpen(false)
	}

	const handleSheetToggle = () => {
		setIsOpen(!isOpen)
	}

	const handleLogout = async () => {
		await DataSender.logout()
		delete localStorage['userId']
		window.location.href = '/'
	}

	return (
		<>
			<header
				className={`sticky top-0  w-full transition-all duration-300 z-[10]  ${
					isScrolled
						? 'h-14 bg-background  outline-none border-none  shadow-md'
						: 'h-20 bg-accent-navbar  shadow-none text-white '
				}`}
			>
				<div className='container flex h-full items-center justify-between px-4 md:px-6'>
					<Link href='/' className='flex items-center justify-center'>
						<EarthCanvas styles={{ width: '50%', height: '7rem' }} />
						<h1
							className={`text-[18px] font-poppins font-bold z-[100] ${
								isScrolled ? '' : ''
							}`}
						>
							iGUIDER
						</h1>
					</Link>

					<nav className='hidden items-center gap-4 text-sm font-medium md:flex'>
						<NavigationMenu>
							<NavigationMenuList>
								<NavigationMenuLink asChild>
									<Link href='/'>
										<button className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:before:scale-x-100 hover:before:origin-left relative before:w-2/3 before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-white before:absolute before:left-1/6 before:bottom-1'>
											Home
										</button>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href='/about'>
										<button className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:before:scale-x-100 hover:before:origin-left relative before:w-2/3 before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-white before:absolute before:left-1/6 before:bottom-1'>
											About
										</button>
									</Link>
								</NavigationMenuLink>
								<NavigationMenuLink asChild>
									<Link href='/contact'>
										<button className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:before:scale-x-100 hover:before:origin-left relative before:w-2/3 before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-white before:absolute before:left-1/6 before:bottom-1'>
											Contact
										</button>
									</Link>
								</NavigationMenuLink>
								{userInfo && userInfo['is_admin'] && (
									<NavigationMenuLink asChild>
										<Link href='/dashboard'>
											<button className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:before:scale-x-100 hover:before:origin-left relative before:w-2/3 before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-white before:absolute before:left-1/6 before:bottom-1'>
												Dashboard
											</button>
										</Link>
									</NavigationMenuLink>
								)}
								{userInfo && userInfo['user_id'] && !userInfo['is_admin'] && (
									<NavigationMenuLink asChild>
										<Link href='/reports'>
											<button className='group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50 hover:before:scale-x-100 hover:before:origin-left relative before:w-2/3 before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-white before:absolute before:left-1/6 before:bottom-1'>
												Reports
											</button>
										</Link>
									</NavigationMenuLink>
								)}
							</NavigationMenuList>
						</NavigationMenu>
					</nav>
					<div className='text-white flex items-center gap-4'>
						{userInfo && userInfo['user_id'] ? (
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Avatar className='h-9 w-9 hover:outline-primary'>
										{userProfile && userProfile['avatar'] && (
											<AvatarImage src={userProfile['avatar']} />
										)}
										<AvatarFallback className='bg-accent cursor-pointer'>
											{userProfile
												? userProfile['full_name']
														.split(' ')
														.map((part: string) => part[0])
														.join('')
														.toUpperCase()
														.slice(0, 2)
												: ''}
										</AvatarFallback>
									</Avatar>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItem>
										<Link href='/profile'>My Account</Link>
									</DropdownMenuItem>
									<DropdownMenuSeparator />
									{userInfo && userInfo['user_id'] && (
										<DropdownMenuItem onClick={handleLogout}>
											Logout
										</DropdownMenuItem>
									)}
								</DropdownMenuContent>
							</DropdownMenu>
						) : (
							<Link href='/login' prefetch={true}>
								<button className='ml-auto h-9 px-4 text-sm font-medium transition-colors rounded-md bg-white text-primary hover:bg-primary hover:text-white cursor-pointer'>
									Login
								</button>
							</Link>
						)}
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button
									variant='outline'
									size='icon'
									className='md:hidden'
									onClick={handleSheetToggle}
								>
									<MenuIcon className='h-6 w-6' />
									<span className='sr-only'>Toggle navigation menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side='right'>
								<div className='grid gap-2 py-6'>
									<Link href='/about'>
										<button
											className='flex w-full items-center py-2 text-lg font-semibold group-hover:underline group-hover:text-primary-foreground'
											onClick={handleLinkClick}
										>
											About
										</button>
									</Link>
									<Link href='/contact'>
										<button
											className='flex w-full items-center py-2 text-lg font-semibold group-hover:underline group-hover:text-primary-foreground'
											onClick={handleLinkClick}
										>
											Contact
										</button>
									</Link>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</div>
			</header>
		</>
	)
}

function MenuIcon(props) {
	return (
		<svg
			{...props}
			xmlns='http://www.w3.org/2000/svg'
			width='24'
			height='24'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth='2'
			strokeLinecap='round'
			strokeLinejoin='round'
		>
			<line x1='4' x2='20' y1='12' y2='12' />
			<line x1='4' x2='20' y1='6' y2='6' />
			<line x1='4' x2='20' y1='18' y2='18' />
		</svg>
	)
}
