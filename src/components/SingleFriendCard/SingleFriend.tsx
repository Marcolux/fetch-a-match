import './single-friend-card.scss'
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


    return(
        <div id="single_friend_card">
            <img src={singleDog.img} alt={singleDog.name}></img>
            <p className='dogName'><span>Name:</span> {singleDog.name}</p>
            <p className='dogAge'><span>Age:</span> {singleDog.age}</p>
            <p className='dogBreed'><span>Breed:</span> {singleDog.breed}</p>
        </div>
    )
}

export default SingleFriendCard