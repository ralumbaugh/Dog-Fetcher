import { dogs, matchDog } from "../services/api";
import { useState, useEffect } from "react";
import Dog from "../interfaces/Dog";

interface PickOnePanel {
    likedDogs: string;
}

export function PickOnePanel({likedDogs}:PickOnePanel) {
    const [chosenDog, setChosenDog] = useState<Dog>()

    const pickADog = async () => {
        // Pick one of the favorites if it's an option
        const dogArray = likedDogs.split(";");
        console.log("Dog Array: ", dogArray);
        dogArray.pop();
        console.log("Dog Array: ", dogArray);
        
        if(dogArray && dogArray.length > 0) {
            const result = await matchDog(dogArray);
            
            if(result.status==200) {
                const dogResult = getDogResult(result.match);
                console.log("Dog Result: ", dogResult);
            }
        }
    }

    const getDogResult = async (dogIds: string) => {
        const result = await dogs([dogIds]);

        if(result.status == 200) {
            setChosenDog(result.body[0]);
        }
        return result;
    }

    useEffect(() => {
        pickADog();
    }, [likedDogs])


    return(
        <div className="flex flex-col">
            {(likedDogs.length == 0 && <p>Please favorite some dogs before attempting to match with one.</p>)}
            {chosenDog && 
            <div className="flex flex-col justify-center items-center">
                <h1>Get ready to take {chosenDog.name} home!</h1>
                <img className="max-w-xl min-w-fit" src={chosenDog.img} alt={`Your new dog ${chosenDog.name}!`} />
            </div>
            }
        </div>
    )
}