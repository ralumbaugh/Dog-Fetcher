import Dog from "../interfaces/Dog";

interface DogCardProps {
    currentDog: Dog,
    handleDogClick: (id:string, img:string) => void,
    likedDogs: string,
    pictureDimensions?: number
}

export default function DogCard({ currentDog, handleDogClick, likedDogs, pictureDimensions}:DogCardProps) {   

    const dogLiked = likedDogs?.includes(currentDog.id + ";");

    const onDogClick = () => {
        handleDogClick(currentDog.id, currentDog.img);
    }

    return(
        <div className={`flex flex-col rounded-3xl w-${pictureDimensions? pictureDimensions : 50}`}>
            <div className={`${dogLiked? "bg-red-500" : "bg-blue-500"} rounded-t-3xl text-white`}>
                <p>{currentDog.name} - Age: {currentDog.age}</p>
                <p>Zip Code: {currentDog.zip_code}</p>
                <p>Breed: {currentDog.breed}</p>
            </div>
            <img className={`h-${pictureDimensions? pictureDimensions: 50} w-${pictureDimensions? pictureDimensions : 50}`} src={currentDog.img} alt={`${currentDog.name} the ${currentDog.age} year old ${currentDog.breed}`} />
            <button className={`rounded-b-3xl ${dogLiked? "bg-red-500" : "bg-blue-500"} text-white`} onClick={onDogClick}>{dogLiked? `You already like ${currentDog.name}`: `Click me to like ${currentDog.name}`}</button>
        </div>
    )
}