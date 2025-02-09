import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context'
import { searchService } from "../../services/search_service.ts"
import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"

import './results-container.scss'

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

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList, savFavsFriendsList } = context
    const [ searchList, _setSearchList] = searchResultsList
    const [favsFriendsList, setFavsFriendsList] = savFavsFriendsList
   
    const [dogsDetailedList, setDogsDetailedList] = useState<Dog[]>([])
    const [favsPageOn, setFavsPageOn] = useState<boolean>(false)

    useEffect( () => {
        if (searchList.length > 0 ) {
            searchService.fetchDogsDetails(searchList).then((data) => {
                setDogsDetailedList(data)
            })
        }
    },[searchList])

    return(
        <div id="possible-results">
            <div>
                <button onClick={() => {setFavsPageOn(true)}}>Check Your Favourites</button>
            </div>
            <div className={favsPageOn ? '' : 'hide'}>
                Favourite Page List
                <button onClick={() => {setFavsPageOn(false)}}>Close</button>
            </div>
            {
                searchList.length > 0 
                ?
                <div id="results_container">
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
    )
}

export default ResultsContainer