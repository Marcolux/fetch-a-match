import { useEffect, useContext } from "react"
import { Context } from "../../services/context/Context"
import { searchService } from "../../services/search_service.ts"
import ResultsContainer from "../../components/ResultsContainer/ResultsContainer"
import AdvancedSearch from "../../components/AdvancedSearch/AdvancedSearch.tsx"
import './landing_page.scss'

const LandingPage = () => {
    const context = useContext(Context)
    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList } = context
    const [ _searchList, setSearchList] = searchResultsList

    const searchAllPossible = async () => {
        const results = await searchService.allDogsAvailable()
        
        if (results) {
            setSearchList(results.resultIds)
        } else {
            localStorage.removeItem('is_user_login')
        }
    }

    useEffect(()=>{ searchAllPossible() },[])

    return(
        <main className="page p-0" id="landing_page">
            <AdvancedSearch/>
            <ResultsContainer/>
        </main>
    )
}

export default LandingPage