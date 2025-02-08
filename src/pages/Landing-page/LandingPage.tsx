import { useEffect, useState, useContext } from "react"
import { Context } from "../../services/context/Context"
import { searchService } from "../../services/search_service.ts"
import SearchBar from "../../components/SearchBar/SearchBar"
import ResultsContainer from "../../components/ResultsContainer/ResultsContainer"
import './landing_page.scss'

const LandingPage = () => {
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const [searchResults, setSearchResults] = useState<string[]>([])

    const { searchResultsList } = context
    const [ searchList, setSearchList] = searchResultsList

    const searchAllPossible = async () => {
        const results = await searchService.allDogsAvailable()
        setSearchList(results.resultIds)
    }

    useEffect(()=>{
        searchAllPossible()
    },[])

    return(
        <main className="page p-0" id="landing_page">
            <SearchBar></SearchBar>
            <ResultsContainer allDogsAvailable={searchResults}/>
            

        </main>
    )
}

export default LandingPage