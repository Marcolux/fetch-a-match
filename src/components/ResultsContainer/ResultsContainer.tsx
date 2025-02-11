import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context'
import { searchService } from "../../services/search_service.ts"

import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"
import NavBar from '../NavBar/NavBar.tsx'
import FavsCollection from '../FavsCollection/FavsCollection.tsx'

import './results-container.scss'
import Loading from '../Loading/Loading.tsx'

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

const ResultsContainer = () => {
    const context = useContext(Context)
    
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList } = context
    const [ searchList, _setSearchList] = searchResultsList
   
    const [dogsDetailedList, setDogsDetailedList] = useState<Dog[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect( () => {
        setLoading(true)
        if (searchList.length > 0 ) {
            searchService.fetchDogsDetails(searchList).then((data) => {
                setDogsDetailedList(data)
            })
        }
    },[searchList])

    useEffect( () => {
        if (dogsDetailedList.length > 0) {
            setTimeout(() => {setLoading(false)},2000)
        }
    },[dogsDetailedList])

    return(
        <div id="possible-results">
            <NavBar/>
            <FavsCollection/>
            <div id='container_friends'>

                {
                    (loading && searchList.length > 0 ) 
                    ? <Loading/> 
                    : null
                }
                {
                    searchList.length > 0 
                    ?
                    <div 
                        id="results_container"
                        className={loading ? 'hide' : ''}
                    >
                        {dogsDetailedList.map((dog, i) => {
                            return (
                                <SingleFriendCard key={i} singleDog={dog}/>
                            )
                        })}
                    </div>
                    :
                    <div>
                        Sorry No results, try to change your filters
                    </div>
                }
            </div>
        </div>

    )
}

export default ResultsContainer