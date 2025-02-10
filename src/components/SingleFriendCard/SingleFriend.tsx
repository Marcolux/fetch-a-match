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
        <div 
            id="single_friend_card"
            className={favsFriendsList.includes(singleDog.id) ? 'highligth' : ''}
        >
            <img src={singleDog.img} alt={singleDog.name}></img>
            <div className='all_info'>

                <p className='dogName'><span>Name:</span> {singleDog.name}</p>
                <p className='dogAge'><span>Age:</span> {singleDog.age}</p>
                <p className='dogBreed'><span>Breed:</span> {singleDog.breed}</p>
                <p className='dogZipCode'><span>Zip Code:</span> {singleDog.zip_code}</p>
                <div className='input_label'>

                    <input 
                        id={`${singleDog.id}`} 
                        type="checkbox" 
                        className='check_fav' 
                        checked={favsFriendsList.includes(singleDog.id)}
                        onChange={favLogic}
                    />
                    <label 
                        htmlFor={`${singleDog.id}`}
                        className='heart_label'
                    >❤</label>
                </div>
            </div>

        </div>
    )
}

export default SingleFriendCard