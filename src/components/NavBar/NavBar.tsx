
import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { loginService } from "../../services/login_service.ts"
import { searchService } from "../../services/search_service.ts"
import { Context } from "../../services/context/Context.tsx"
import './nav-bar.scss'

const NavBar = () => {
    const navigator = useNavigate()
    const context = useContext(Context)
        
    // Always check if it's not null
    if (!context) { throw new Error("context not valid") }

    const { 
        searchResultsList, 
        searchBreedFilter,
        searchZipCodesFilter,
        searchAgeMinFilter,
        searchAgeMaxFilter,
        savfavsPageOn
    } = context

    const [ _searchList, setSearchList] = searchResultsList
    const [  breedFilter, _setBreedFilter] = searchBreedFilter
    const [zipCodeFilter, _setZipCodeFilter] = searchZipCodesFilter
    const [ageMinFilter, _setAgeMinFilter] = searchAgeMinFilter
    const [ageMaxFilter, _setAgeMaxFilter] = searchAgeMaxFilter
    const [_favsPageOn, setFavsPageOn] = savfavsPageOn 

    const [sortBy, setSortBy] = useState<'breed' | "name" | "age">('breed')
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
    const [nextPage, setNextPage] = useState<string>('')
    const [prevPage, setPrevPage] = useState<string>('')


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
        if (nextOrPrev) {
            const newResults = await searchService.allDogsAvailableNavPage(nextOrPrev)
            if (newResults) {
                updateAllInfo(newResults)
            }
        }
    }

    const updateAllInfo = (results: any) => {
        setSearchList(results.resultIds)
        results.total > parseInt(results.next.split('from=')[1]) ? setNextPage(results.next) : setNextPage('')
        results.prev ? setPrevPage(results.prev) : setPrevPage('')
    }

    const logoutClick = async () => {
        await loginService.logoutUser()
        window.dispatchEvent(new Event("storage"))
        navigator('/login', { replace: true })
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
             
        <div id='nav_bar'>
            <div className="filter_container">

                <div className='nav_bar_filters'>
                    <h3><u>Sort by:</u></h3>
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
                    </div>
                </div>

                <div id="asc_desc" className='nav_bar_filters'>
                    <div>
                        <label htmlFor="order-asc">Ascending</label>
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
                        <label htmlFor="order-desc">Descending</label>
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
                
            <div id="pageNavigation">
                <button id="prevPage" className={prevPage === '' ? 'greyOut' : ''} onClick={() => { movePage(prevPage)}}>Prev Page</button>
                <button id="nextPage" className={nextPage === '' ? 'greyOut' : ''} onClick={() => { movePage(nextPage)}}>Next Page</button>
            </div>

            <div id="logout_favs">
                <button onClick={() => {setFavsPageOn(true)}}>Check Your Favourites</button>
                <button id="logoutBtn" onClick={logoutClick}>Logout</button>
            </div>
        </div>
    )
}

export default NavBar