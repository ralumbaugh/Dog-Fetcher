import { SideDogBar } from '../components/SideDogBar';
import DashboardCard from '../components/DashboardCard';
import { getThemDoggos } from '../utils/getThemDoggos';
import { useEffect, useState } from 'react';


export default function Dashboard() {
    const [likedDogs, setLikedDogs] = useState(localStorage.getItem("Liked") || "");
    const [dogImages, setDogImages] = useState(localStorage.getItem("Image") || "");
    const [dogList, setDogList] = useState<string[]>([]);
    useEffect(() => {
        setDogList(getThemDoggos(8, dogImages));
    }, [dogImages]);

    // Favoriting
    // Store the dogs in session whenever the dogs or images update
    useEffect(() => {
        localStorage.setItem("Liked", likedDogs);
    }, [likedDogs]);

    useEffect(() => {
        localStorage.setItem("Image", dogImages);
    }, [dogImages]);

    useEffect(() => {
        setLikedDogs(localStorage.getItem("Liked") || "");
        setDogImages(localStorage.getItem("Image") || "");
    }, []);

    const handleDogClick = (id: string, img:string) => {
        let newDogList = likedDogs;
        let newDogImages = dogImages;

        if(!likedDogs) {
            newDogList = id + ";";
            newDogImages = img + ";";
        }
        else if(likedDogs.includes(id + ";")) {
            newDogList = likedDogs.replace(id + ";", "");
            newDogImages = dogImages.replace(img + ";", "");
        } else {
            newDogList = newDogList + id + ";";
            newDogImages = newDogImages + img + ";";
        }
        setLikedDogs(newDogList);
        setDogImages(newDogImages);
    }
    
    return (
        <>
            <SideDogBar dog1={dogList[0]} dog2={dogList[1]} dog3={dogList[3]} dog4={dogList[4]}/>
            <DashboardCard handleFavoriting={handleDogClick} likedDogs={likedDogs}/>
            <SideDogBar dog1={dogList[5]} dog2={dogList[6]} dog3={dogList[7]} dog4={dogList[8]}/>
        </>
    )
}