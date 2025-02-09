import { useNavigate } from "react-router-dom"
import { useEffect, useState, useContext } from "react"
import { searchService } from "../../services/search_service.ts"
import { loginService } from "../../services/login_service.ts"
import { Context } from "../../services/context/Context.tsx"
import AdvancedSearch from "../AdvancedSearch/AdvancedSearch.tsx"
import './search-bar.scss'

const SearchBar = () => {
    const navigator = useNavigate()
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) { throw new Error("context not valid") }

    const { 
        searchResultsList, 
        searchBreedFilter,
        searchZipCodesFilter,
        searchAgeMinFilter,
        searchAgeMaxFilter 
    } = context

    const [ _searchList, setSearchList] = searchResultsList
    const [  breedFilter, _setBreedFilter] = searchBreedFilter
    const [zipCodeFilter, _setZipCodeFilter] = searchZipCodesFilter
    const [ageMinFilter, _setAgeMinFilter] = searchAgeMinFilter
    const [ageMaxFilter, _setAgeMaxFilter] = searchAgeMaxFilter

    const [sortBy, setSortBy] = useState<'breed' | "name" | "age">('breed')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [nextPage, setNextPage] = useState<string>('')
    const [prevPage, setPrevPage] = useState<string>('')

    const logoutClick = async () => {
        await loginService.logoutUser()
        window.dispatchEvent(new Event("storage"))
        navigator('/login', { replace: true })
    }

    const searchAllPossible = async () => {
        const newBreeds = breedFilter
        const results = await searchService.allDogsAvailable(
            {
                breeds : newBreeds,
                zipCodes: zipCodeFilter,
                ageMin: ageMinFilter ,
                ageMax: ageMaxFilter
            },
            {
                sortBy: sortBy,
                order: sortOrder
            }
        )
        return results
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
    
    useEffect( 
        () => {
            const fetchResults = async () => {
                const results = await searchAllPossible()
                updateAllInfo(results)
            }
            fetchResults()
        },[
            breedFilter,
            zipCodeFilter,
            ageMinFilter,
            ageMaxFilter, 
            sortBy,
            sortOrder
        ]
    )

    return(
        <div id="search_bar">
            <button id="logoutBtn" onClick={logoutClick}>Logout</button>
                        
            <div className='inputFilters'>
                <label>Sort by</label>
                <div id="inputZipCode">
                    <select value={sortBy} onChange={(e) => {
                        if (e.target.value === 'breed'|| 
                            e.target.value === 'name' || 
                            e.target.value === 'age') {
                            setSortBy(e.target.value)
                        }
                    }}>
                        <option value={"breed"}>Breed</option>
                        <option value={"name"}>Name</option>
                        <option value={"age"}>Age</option>
                    </select>
                    <div>
                        <div>
                            <label htmlFor="order-asc">Ascendentant</label>
                            <input 
                                name="order" 
                                id='order-asc' 
                                type="radio" 
                                value={sortOrder}
                                checked={sortOrder === "asc" ? true : false}
                                onChange={() => {setSortOrder('asc')}}
                            />
                        </div>
                        <div>
                            <label htmlFor="order-desc">Descendant</label>
                            <input 
                                name="order" 
                                id='order-desc' 
                                type="radio" 
                                checked={sortOrder === "desc" ? true : false}
                                onChange={() => {setSortOrder('desc')}}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <AdvancedSearch/>
            <div id="pageNavigation">
                <button id="prevPage" className={prevPage === '' ? 'greyOut' : ''} onClick={() => { movePage(prevPage)}}>Prev Page</button>
                <button id="nextPage" className={nextPage === '' ? 'greyOut' : ''} onClick={() => { movePage(nextPage)}}>Next Page</button>
            </div>
        </div>
    )
}

export default SearchBar