// import { useNavigate } from "react-router-dom"
import { searchService } from "../../services/search_service.ts"
// import { loginService } from "../../services/login_service.ts"
import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context'
import './results-container.scss'
import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"
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

    const [dogsDetailedList, setDogsDetailedList] = useState<Dog[]>([])

    useEffect( () => {
        if (searchList.length > 0 ) {

            searchService.fetchDogsDetails(searchList).then((data) => {
                setDogsDetailedList(data)
            })
        }

    },[searchList])


    return(
        <div id="results_container">
            {dogsDetailedList?.map((dog) => {
                return (
                    <SingleFriendCard singleDog={dog}/>
                )
            })}
        </div>

    )
}

export default ResultsContainer