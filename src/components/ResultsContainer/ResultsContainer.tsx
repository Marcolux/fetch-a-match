
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context'
import { searchService } from "../../services/search_service.ts"
import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"

import './results-container.scss'

interface PropsResults {
    allDogsAvailable: string[]
}

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

const ResultsContainer: React.FC<PropsResults> = ({allDogsAvailable}) => {
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const { searchResultsList } = context
    const [ searchList, setSearchList] = searchResultsList

    const { searchBreedFilter } = context
    const [  breedFilter, setBreedFilter] = searchBreedFilter

    const [dogsDetailedList, setDogsDetailedList] = useState<Dog[]>([])

    useEffect( () => {
        if (searchList.length > 0 ) {
            searchService.fetchDogsDetails(searchList).then((data) => {
                setDogsDetailedList(data)
            })
        }
    },[searchList, breedFilter])

    return(
        <div id="results_container">
            {dogsDetailedList?.map((dog, i) => {
                return (
                    <SingleFriendCard key={i} singleDog={dog}/>
                )
            })}
        </div>

    )
}

export default ResultsContainer