import { useEffect, useState } from "react";
import Dog from "../interfaces/Dog";
import DogCard from "./DogCard";
import { dogs } from "../services/api";

interface FavoritesCardProps {
    handleDogClick: (id:string, img:string) => void,
    likedDogs: string
}
export default function FavoriteDogsCard({handleDogClick, likedDogs}:FavoritesCardProps) {
    const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);


    const getDogs = async (favoritedDogs:string[]) => {
        const response = await dogs(favoritedDogs);
        if(response.status == 200) {
            setFavoriteDogs(response.body);
        }
    }
    
    useEffect(() => {
        const favoritedDogs = likedDogs.split(";");
        console.log(favoriteDogs);
        if(favoritedDogs) {
            // Last entry is empty due to split
            favoritedDogs.pop();
            getDogs(favoritedDogs);
        }
    }, [likedDogs]);

    return(

        <div className="flex">
            { favoriteDogs.length > 0?
                favoriteDogs.map((dog) => (
                    <div key={dog.id} className="lg:w-1/5 p-3">
                        <DogCard currentDog={dog} handleDogClick={handleDogClick} likedDogs={likedDogs} />
                    </div>
                )) :
                <div className=" w-full">
                    <h1 className="text-xl self-center">Oops! Looks like you haven't favorited any dogs yet!</h1>
                </div>
            }
        </div>
    )
}