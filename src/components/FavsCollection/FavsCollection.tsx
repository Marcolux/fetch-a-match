import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context.tsx'
import { searchService } from "../../services/search_service.ts"

import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"
import './favs-collection.scss'

interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

const FavsCollection = () => {
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const {savFavsFriendsList, savfavsPageOn } = context
    const [favsFriendsList, setFavsFriendsList] = savFavsFriendsList
    const [favsPageOn, setFavsPageOn] = savfavsPageOn 

    const [favDetailedList, setFavDetailedList] = useState<Dog[]>([])
    const [match, setMatch] = useState<string>()

    const matchLogic = async () => {
        const finalMatch = await searchService.findTheMatch(favsFriendsList)
        setMatch(finalMatch)
    }

    
    useEffect( () => {
        if (favsFriendsList.length > 0 ) {
            searchService.fetchDogsDetails(favsFriendsList).then((data) => {
                setFavDetailedList(data)
            })
        }
    },[favsPageOn,favsFriendsList])

    useEffect(() => {
        const matchId = favsFriendsList.filter(dog => dog === match)
        setFavsFriendsList(matchId)
    },[match])

    return(

        <div id='fav_collection' className={favsPageOn ? '' : 'hide'}>
            <div id='button_div'>
                <button onClick={() => {matchLogic()}}>Check Your Match</button>
                <button onClick={() => {setFavsPageOn(false)}}>Close</button>
            </div>
            <div id='listContainer'>
                {
                    favDetailedList.map((dog,i) => {
                        return (
                            <SingleFriendCard singleDog={dog} key={i}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default FavsCollection