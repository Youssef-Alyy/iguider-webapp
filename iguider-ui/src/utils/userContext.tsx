import {
	useState,
	createContext,
	useMemo,
	useContext,
	useEffect,
	useRef,
} from 'react'
import DataFetcher from './DataFetcher'
import { UserUtils } from '@/utils/userUtils'
import { User } from 'lucide-react'

interface UserProfile {
	password: any
	full_name: string
	username: string
	email: string
	biography?: string | null
	avatar?: string | null
}

interface UserInfo {
	user_id: string
	credits: number
	is_active: boolean
	is_verified: boolean
	is_admin: boolean
	date_created: Date
	date_updated: Date
}

interface UserContextValue {
	userId: string | null
	setUserId: React.Dispatch<React.SetStateAction<string | null>>
	userInfo: UserInfo | null
	setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>
	userProfile: UserProfile | null
	setUserProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export const UserProvider = ({ children }) => {
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
	const [userId, setUserId] = useState<string | null>(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setUserId(localStorage.getItem('userId'))
				if (!userId) return
				const [userInfo, profileInfo] = await Promise.all([
					DataFetcher.getUserInformation(userId),
					DataFetcher.getUserProfile(userId),
				])
				setUserInfo(userInfo)
				setUserProfile(profileInfo)
			} catch (error) {
				console.error('Error fetching user data:', error)
			}
		}
		fetchUserData()
	}, [userId]) // Refresh user data when ID changes/updates

	const value = useMemo(
		() => ({
			userInfo,
			setUserInfo,
			userProfile,
			setUserProfile,
			userId,
			setUserId,
		}),
		[userInfo, userProfile],
	)

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => {
	return useContext(UserContext)
}
