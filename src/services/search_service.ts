interface SearchFilters {
    breeds: string[]
    zipCodes: string[]
    ageMin: string
    ageMax: string
}

interface SearchSort {
    sortBy: "breed" | "name" | "age"
    order: "asc" | "desc"
}

export class SearchService {

    allBreads = async () => {
        const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include'
            })

            const allBreads = await response.json()
            return allBreads
          
        } catch (error: any) {
          console.error(error.message);
        }

        return false
    }

    allDogsAvailable = async (filters?: SearchFilters, sortRules?: SearchSort ) => {
        let url = "https://frontend-take-home-service.fetch.com/dogs/search"
        let additionalParams = ''

        if (filters) {
            const queryParams = new URLSearchParams()
            
            if (filters.breeds.length > 0) filters.breeds.forEach(breed => queryParams.append("breeds", breed) )
            if (filters.zipCodes.length > 0) filters.zipCodes.forEach(zipCode => queryParams.append("zipCodes", zipCode))
            if (filters.ageMin !== '') queryParams.append("ageMin", filters.ageMin)
            if (filters.ageMax !== '') queryParams.append("ageMax", filters.ageMax)
                            
            url += `?${queryParams.toString()}`
        }

        if (sortRules) {
            additionalParams = `&sort=${sortRules.sortBy}:${sortRules.order}`
        } else {
            additionalParams = '&sort=breed:asc'
        }

        url = url + additionalParams
    
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