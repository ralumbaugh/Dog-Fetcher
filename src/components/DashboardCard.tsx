import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { logout } from "../services/api";
import DashboardButton from "./DashboardButton";
import DogSearchPanel from "./DogSearchPanel";
import FavoriteDogsCard from "./FavoriteDogsCard";
import { PickOnePanel } from "./PickOnePanel";

interface DashboardProps {
    handleFavoriting: (id:string, img:string) => void,
    likedDogs: string
}

export default function DashboardCard({handleFavoriting, likedDogs}:DashboardProps) {
    const [currentTab, setCurrentTab] = useState('dogSearch');

    // Navigation
    const navigator = useNavigate();

    const updateCurrentTab = (label:string) => {
        if(currentTab == label) {
            return;
        }

        const previousTab = document.querySelector(`[aria-labelledby=${currentTab}]`);
        const nextTab = document.querySelector(`[aria-labelledby=${label}]`);

        if(previousTab && nextTab) {
            previousTab.classList.add("hidden");
            nextTab.classList.remove("hidden");
        }

        setCurrentTab(label);
    }

    const onSignOut = async () => {
        const result = await logout();

        if(result.status == 200) {
            console.log("Signout successful!");
            navigator("/");
        }
    }
    
    return(
        <div className="w-full overflow-y-auto overflow-x-hidden bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Select tab</label>
                <select id="tabs" >
                    <option>Find New Dogs</option>
                    <option>View Favorite Dogs</option>
                    <option>Pick One For Me</option>
                    <option>Sign Out</option>
                </select>
            </div>
            <ul className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex rtl:divide-x-reverse" id="fullWidthTab" data-tabs-toggle="#fullWidthTabContent" role="tablist">
                <DashboardButton selected={true} buttonText="Find New Dogs" id="dogSearch" changeTab={updateCurrentTab} />
                <DashboardButton selected={false} buttonText="View Favorite Dogs" id="favorites" changeTab={updateCurrentTab} />
                <DashboardButton selected={false} buttonText="Pick One For Me" id="pick" changeTab={updateCurrentTab} />
                <DashboardButton selected={false} buttonText="Sign Out" clickEvent={onSignOut} />
            </ul>
            <div id="fullWidthTabContent" className="border-t border-gray-200 dark:border-gray-600">
                <div className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="stats" role="tabpanel" aria-labelledby="dogSearch">
                    <DogSearchPanel handleDogClick={handleFavoriting} likedDogs={likedDogs} />
                </div>
                <div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="favorites" role="tabpanel" aria-labelledby="favorites">
                    <FavoriteDogsCard handleDogClick={handleFavoriting} likedDogs={likedDogs} />
                </div>
                <div className="hidden p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800" id="pick" role="tabpanel" aria-labelledby="pick">
                    <PickOnePanel likedDogs={likedDogs} />
                </div>
            </div>
        </div>
    )
}