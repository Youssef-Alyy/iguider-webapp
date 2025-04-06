import axios from 'axios'
axios.defaults.withCredentials = true

export default class DataFetcher {
	static async fetchReports(
		limit: number,
		skip: number,
		searchTerm?: string,
	): Promise<any[]> {
		try {
			let endpoint = `${process.env.NEXT_PUBLIC_API_URL}/reports`
			const params = {
				limit: limit.toString(),
				skip: skip.toString(),
			}

			if (searchTerm) {
				endpoint = `${process.env.NEXT_PUBLIC_API_URL}/reports/search`
				params['query'] = searchTerm
			}

			const response = await axios.get(endpoint, { params })
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch reports')
		}
	}

	static async fetchUsers(limit, page) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
				{
					params: {
						limit: limit,
						page: page,
					},
				},
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch users')
		}
	}
	static async getUserCount(): Promise<number> {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/metric/users/count`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch user count')
		}
	}
	static async getReportCount(): Promise<number> {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/metric/reports/count`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch report count')
		}
	}
	static async getErrorCount(): Promise<number> {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/metric/errors/count`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch error count')
		}
	}

	static async getUserInformation(userId: string) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/user`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch user information')
		}
	}

	static async getUserProfile(userId: string) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/profile`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch user profile')
		}
	}

	static async getUserCredits(userId: string) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/limits`,
			)
			return response.data.credits
		} catch (error) {
			throw new Error('Failed to fetch user credits')
		}
	}

	static async searchUsers(query, limit, page) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/admin/users/search`,
				{
					params: {
						limit: limit,
						page: page,
						query: query,
					},
				},
			)
			console.log('Response', response.data)
			return response.data
		} catch (error) {
			throw new Error('Failed to search users')
		}
	}

	static async getSearchUserCount(query) {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/metric/users/search/count`,
				{
					params: {
						query: query,
					},
				},
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch search user count')
		}
	}

	static async getReportStatusesCount() {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/metric/reports/status/count`,
			)
			return response.data
		} catch (error) {
			throw new Error('Failed to fetch report status counts')
		}
	}
}
