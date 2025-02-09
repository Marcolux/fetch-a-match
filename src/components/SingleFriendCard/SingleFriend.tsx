import './single-friend-card.scss'
import { useContext } from 'react'
import { Context } from '../../services/context/Context'
interface Dog {
    id: string
    img: string
    name: string
    age: number
    zip_code: string
    breed: string
}

interface SingleDog {
    singleDog: Dog
}

const SingleFriendCard: React.FC<SingleDog> = ({singleDog}) => {
    const context = useContext(Context)

    // Always check if it's not null
    if (!context) {
        throw new Error("context not valid")
    }

    const {savFavsFriendsList } = context
    const [favsFriendsList, setFavsFriendsList] = savFavsFriendsList

    const favLogic = () => {
        setFavsFriendsList((prevFavs) => {
            return prevFavs.includes(singleDog.id) 
                ? favsFriendsList.filter((id) => id !== singleDog.id) 
                : [...prevFavs, singleDog.id]
        })
    }
    return(
        <div id="single_friend_card">
            <img src={singleDog.img} alt={singleDog.name}></img>
            <p className='dogName'><span>Name:</span> {singleDog.name}</p>
            <p className='dogAge'><span>Age:</span> {singleDog.age}</p>
            <p className='dogBreed'><span>Breed:</span> {singleDog.breed}</p>
            <p className='dogZipCode'><span>Zip Code:</span> {singleDog.zip_code}</p>
            <input 
                type='checkbox' 
                className='dogZipCode' 
                checked={favsFriendsList.includes(singleDog.id)}
                onChange={favLogic}
            /><label>Fav</label>

        </div>
    )
}

export default SingleFriendCard