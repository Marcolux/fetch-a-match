import { useNavigate } from "react-router-dom"
import './search-bar.scss'
import { searchService } from "../../services/search_service.ts"
import { loginService } from "../../services/login_service.ts"
import { useContext } from "react"
import { Context } from "../../services/context/Context.tsx"
const SearchBar = () => {
    const navigator = useNavigate()
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList } = context
    const [ searchList, setSearchList] = searchResultsList

    const logoutClick = async () => {
        await loginService.logoutUser()
        window.dispatchEvent(new Event("storage"))
        navigator('/login', { replace: true })
    }

    const searchAllPossible = async () => {
        const results = await searchService.allDogsAvailable()
        setSearchList(results.resultIds)
        console.log(results.resultIds)
    }

    return(
        <div id="search_bar">
            Seaarch Bar
            <button id="logoutBtn" onClick={logoutClick}>Logout</button>
            <button id="searchAllBtn" onClick={searchAllPossible}>Search All</button>
        </div>

    )
}

export default SearchBar