import { useNavigate } from "react-router-dom";
import { breeds, dogs, searchDogs, submitRequest } from "../services/api"
import Dog from "../interfaces/Dog";
import React, { useState, useEffect } from "react"
import SearchDropdown from "./SearchDropdown";
import SearchBarOption from "./SearchBarOption";
import DogCard from "./DogCard";

interface DogSearchPanelProps {
    handleDogClick: (id:string, img:string) => void,
    likedDogs: string
}
export default function DogSearchPanel({handleDogClick, likedDogs}:DogSearchPanelProps) {
    const navigator = useNavigate();
    const [allBreeds, setAllBreeds] = useState<string[]>([]);
    const [breedsLoaded, setBreedsLoaded] = useState(true);
    const [filteredBreeds, setFilteredBreeds] = useState<string[]>([]);
    const [textFilter, setTextFilter] = useState("");
    const [sortDir, setSortDir] = useState("asc");
    const [viewedDogs, setViewedDogs] = useState<Dog[]>([]);
    const [next, setNext] =  useState();
    const [prev, setPrev] = useState();

    const optionHandler = (optionText:string, isChecked:boolean) => {
        if(optionText == "All") {
            if(isChecked) {
                // Uncheck all non-All boxes when all is checked
                const allBreedOptions = document.querySelectorAll("DIV#breeds UL INPUT:not([id='All'])");

                allBreedOptions.forEach(box => {
                    check(box, false);
                });
                
                // Clear filter
                setFilteredBreeds([]);
            }
        }
        else {
            if(isChecked) {
                const newList = [...filteredBreeds];
                newList.push(optionText);
                setFilteredBreeds(newList);
            } else {
                setFilteredBreeds(filteredBreeds.filter(breed => breed != optionText));
            }
        }
    }

    const check = (inputElement:Element, checked:boolean) => {
        const inputBox = inputElement as HTMLInputElement;

        if(inputBox) {
            inputBox.checked = checked;
        }
    }

    const getBreeds = async () => {
        try {
            const result = await breeds();
            if(result.status == 401) {
                navigator("/");
                return;
            }
            if(result.body.length > 0) {
                setAllBreeds(result.body);
            }

        } catch {
            console.error(Error);
        } finally {
            setBreedsLoaded(false);
        }
    }

    const handleDogSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const result = await searchDogs(sortDir, filteredBreeds);
        
        if(result.status == 200 && result.body) {
            setNext(result.next);
            setPrev(result.prev);

            const dogResults = await getDogResults(result.body['resultIds']);

            if(dogResults.status == 200) {
                console.log("Dog results: ", dogResults);
            }
        }
    }

    const getDogResults = async (dogIds: string[]) => {
        const result = await dogs(dogIds);

        if(result.status == 200) {
            setViewedDogs(result.body)
        }
        return result;
    }
    
    const toggleSort = (e: React.FormEvent) => {
        e.preventDefault();

        sortDir == "asc" ? setSortDir("desc") : setSortDir("asc");
    }

    const enum pageDirection {
        nextPage,
        prevPage
    }

    const handlePages = async(direction:pageDirection) => {
        let url = null;
        if(direction == pageDirection.nextPage && next) {
            url = next;
        } else if(direction == pageDirection.prevPage && prev) {
            url = prev;
        }
        if(url){
            const myRequest = new Request("https://frontend-take-home-service.fetch.com" + url, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
    
            const result = await submitRequest(myRequest);
            if(result.status == 200 && result.body) {
                setNext(result.next);
                setPrev(result.prev);
    
                const dogResults = await getDogResults(result.body['resultIds']);
    
                if(dogResults.status == 200) {
                    console.log("Dog results: ", dogResults);
                }
            }
        }
    }

    useEffect(() => {    
        const dogBreeds = getBreeds();
        const allBox = document.querySelector("DIV#breeds INPUT#All");
        if(allBox) {
            check(allBox, true);
        }        
        console.log(dogBreeds);
      }, []);

    useEffect(() => {
        const allBox = document.querySelector("DIV#breeds INPUT#All");
        if(allBox) {
            check(allBox, filteredBreeds.length == 0);
        }
    }, [filteredBreeds]);

    return(
        <>
            <form >
                {breedsLoaded ? (
                    <p>Loading dog breeds...</p>
                ) : (
                    <>
                        <SearchDropdown id="breeds" updateFilter={(e) => setTextFilter(e.target.value)} dogSearch={handleDogSearch} sortDir={sortDir} toggleSort={ toggleSort } >
                            <li key="All">
                                <SearchBarOption text="All" inputClick={optionHandler}/>
                            </li>
                            { allBreeds.map((breed) => (
                                (breed.toLowerCase().match(textFilter.toLowerCase())?
                                <li key={breed}>
                                    <SearchBarOption key={breed} text={breed} inputClick={optionHandler} />
                                </li> :
                                <li className="hidden" key={breed}>
                                    <SearchBarOption key={breed} text={breed} inputClick={optionHandler} />
                                </li>
                                )
                            ))}
                        </SearchDropdown>
                    </>
                )}
            </form>
            <div className="flex">
                {/* Previous Dogs */}
                <div className="flex self-center w-10">
                    {(prev &&
                        <button onClick={() => handlePages(pageDirection.prevPage)}>Prev</button>
                        )}
                </div>
                <div className="flex flex-wrap">
                    {
                        viewedDogs.map((dog) => (
                            <div key={dog.id} className="lg:w-1/5 p-3">
                                <DogCard currentDog={dog} handleDogClick={handleDogClick} likedDogs={likedDogs}/>
                            </div>
                        ))
                    }
                </div>
                {/* Next Dogs */}
                <div className="flex self-center w-10">
                    {(next &&
                        <button onClick={() => handlePages(pageDirection.nextPage)}>Next</button>
                    )}
                </div>
            </div>
        </>
    )
}