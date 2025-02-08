import { SearchService } from "../../services/search_service"
import SearchBar from "../../components/SearchBar/SearchBar"
import ResultsContainer from "../../components/ResultsContainer/ResultsContainer"
import './landing_page.scss'
import { useState } from "react"

const LandingPage = () => {
    const [searchResults, setSearchResults] = useState<string[]>([])

    return(
        <main className="page p-0" id="landing_page">
            <SearchBar></SearchBar>
            <ResultsContainer allDogsAvailable={searchResults}/>
            

        </main>
    )
}

export default LandingPage