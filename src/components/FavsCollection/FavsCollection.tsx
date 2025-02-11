import { useContext, useState, useEffect } from 'react'
import { Context } from '../../services/context/Context.tsx'
import { searchService } from "../../services/search_service.ts"

import SingleFriendCard from "../SingleFriendCard/SingleFriend.tsx"
import Loading from '../Loading/Loading.tsx'
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

    if (!context) {
        throw new Error("context not valid")
    }

    const emptyMatch = {
        id: '',
        img: 'https://frontend-take-home.fetch.com/dog-images/n02110627-affenpinscher/n02110627_10225.jpg',
        name: 'no name',
        age: 0,
        zip_code: '',
        breed: '',
    }

    const {savFavsFriendsList, savfavsPageOn } = context
    const [favsFriendsList, _setFavsFriendsList] = savFavsFriendsList
    const [favsPageOn, setFavsPageOn] = savfavsPageOn 

    const [favDetailedList, setFavDetailedList] = useState<Dog[]>([])
    const [match, setMatch] = useState<Dog>(emptyMatch)
    const [matchPopUpShowing, setMatchPopUpShowing] = useState<boolean>(false)
    const [matchLoading, setMatchLoading] = useState<boolean>(false)

    const matchLogic = async () => {
        const finalMatch = await searchService.findTheMatch(favsFriendsList)
        console.log(finalMatch)
        return finalMatch
    }

    useEffect( () => {
        if (favsFriendsList.length > 0 ) {
            searchService.fetchDogsDetails(favsFriendsList).then((data) => {
                setFavDetailedList(data)
            })
        }
    },[favsPageOn,favsFriendsList])

    useEffect(() => {
        setMatchLoading(true)
        if (matchPopUpShowing) {
            matchLogic().then(data => {
                searchService.fetchDogsDetails([data]).then(matched_details => {
                    setMatch(() =>{
                        setMatchLoading(false)
                        return matched_details[0]
                    })
                })
            })
        }
    },[matchPopUpShowing])

    return(

        <div id='fav_collection' className={favsPageOn ? '' : 'hide'}>
            <div id='button_div'>
                <button 
                    className={favsFriendsList.length > 1 ? '' : 'greyOut'}
                    onClick={() => {setMatchPopUpShowing(prev => {return !prev})}}
                >
                    { 
                        !matchPopUpShowing
                        ? 'Check Your Match'
                        : 'Close Your Match'
                    }
                </button>
                <button  className={!matchPopUpShowing ? '' : 'hide'} onClick={() => {setFavsPageOn(false)}}>Close</button>
            </div>
            <div id='listContainer'>
                <div 
                    id='all_faves' 
                    className={matchPopUpShowing ? 'blur' : ''}
                >
                    {
                        favDetailedList.map((dog,i) => {
                            return (
                                <SingleFriendCard singleDog={dog} key={i}/>
                            )
                        })
                    }
                </div>
                <div 
                    className={matchPopUpShowing ? '' : 'hide'}
                    id='final_match'
                >   
                    {
                        matchLoading 
                        ? 
                        <Loading/>
                        :
                        <>
                            <p className='title'>Here's your match!! </p>
                            <SingleFriendCard singleDog={match}/>
                        </>
                    }
                </div>
            </div>
        </div>
        /* HTML: <div class="loader"></div> */

    )
}

export default FavsCollection