import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { searchService } from "../../services/search_service.ts"
import { loginService } from "../../services/login_service.ts"
import { Context } from "../../services/context/Context.tsx"
import './search-bar.scss'

const SearchBar = () => {
    const navigator = useNavigate()
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList } = context
    const [ searchList, setSearchList] = searchResultsList

    const [nextPage, setNextPage] = useState<string>('')
    const [prevPage, setPrevPage] = useState<string>('')

    const logoutClick = async () => {
        await loginService.logoutUser()
        window.dispatchEvent(new Event("storage"))
        navigator('/login', { replace: true })
    }

    const searchAllPossible = async () => {
        const results = await searchService.allDogsAvailable()
        updateAllInfo(results)
    }

    const movePage = async (nextOrPrev: string) => {
        const newResults = await searchService.allDogsAvailableNavPage(nextOrPrev)
        updateAllInfo(newResults)
    }

    const updateAllInfo = (results: any) => {
        setSearchList(results.resultIds)
        results.next ? setNextPage(results.next) : setNextPage('')
        results.prev ? setPrevPage(results.prev) : setPrevPage('')
    }

    useEffect(()=>{
        searchAllPossible()
    },[])

    return(
        <div id="search_bar">
            <button id="logoutBtn" onClick={logoutClick}>Logout</button>
            <button id="searchAllBtn" onClick={searchAllPossible}>Search All</button>

            <div id="pageNavigation">
                <button id="prevPage" className={prevPage === '' ? 'greyOut' : ''} onClick={() => { movePage(prevPage)}}>Prev Page</button>
                <button id="nextPage" className={nextPage === '' ? 'greyOut' : ''} onClick={() => { movePage(nextPage)}}>Next Page</button>
            </div>
        </div>

    )
}

export default SearchBar