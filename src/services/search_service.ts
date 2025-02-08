interface SearchFilters {
    breeds: string[]
    zipCodes: string[]
    ageMin: string
    ageMax: string
}

export class SearchService {

    allBreads = async () => {
        const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const allBreads = await response.json()
            return allBreads
          
        } catch (error: any) {
          console.error(error.message);
        }

        return false
    }

    allDogsAvailable = async (filters?: SearchFilters) => {
        let url = "https://frontend-take-home-service.fetch.com/dogs/search"

        if (filters) {
            const queryParams = new  URLSearchParams()

            if (filters.breeds) queryParams.append("breeds", filters.breeds.join(','))
            if (filters.zipCodes) queryParams.append("zipCodes", filters.zipCodes.join(','))
            if (filters.ageMin) queryParams.append("ageMin", filters.ageMin)
            if (filters.ageMax) queryParams.append("ageMax", filters.ageMax)

            url += `?${queryParams.toString()}`
        }
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            if (!response.ok) throw new Error(` Error: ${response.status}`)

            const allDogs = await response.json()
            return allDogs

          
        } catch (error: any) {
          console.error(error.message);
        }

        return false
    }

    allDogsAvailableNavPage = async (navigationLink: string) => {
        let url = `https://frontend-take-home-service.fetch.com${navigationLink}`
    
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            if (!response.ok) throw new Error(` Error: ${response.status}`)

            const allDogs = await response.json()
            return allDogs

          
        } catch (error: any) {
          console.error(error.message);
        }

        return false
    }

    fetchDogsDetails = async (dogIds: string[]) => {
        let url = "https://frontend-take-home-service.fetch.com/dogs"
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(dogIds)
            })

            if (!response.ok) throw new Error(` Error: ${response.status}`)

            const allDogs = await response.json()
            return allDogs

          
        } catch (error: any) {
          console.error(error.message);
        }
    }

}

export const searchService = new SearchService()