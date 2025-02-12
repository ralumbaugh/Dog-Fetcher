import React from "react";

interface FormProps {
    id: string,
    children: React.ReactNode,
    updateFilter: (e: React.ChangeEvent<HTMLInputElement>) => void,
    toggleSort: (e: React.FormEvent) => void,
    sortDir: string,
    dogSearch: (e: React.FormEvent) => void,
}
export default function SearchDropdown({id, children, updateFilter, toggleSort, sortDir, dogSearch}:FormProps) {
    const buttonClick = () => {
        const dropdown = document.querySelector("DIV#dropdownSearch");

        if(dropdown) {
            if(dropdown.classList.contains("hidden")) {
                dropdown.classList.remove("hidden");
            } else {
                dropdown.classList.add("hidden");
            }
        }
    }

    return (
        <div id={id} className="flex flex-col justify-center items-center h-full">
            <div className="flex flex-row space-x-3">
                <button onClick={buttonClick} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center" type="button">Filter by Breed
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                    </svg>
                </button>
                <button onClick={toggleSort} className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Breed Name {sortDir}</button>
                <button onClick={dogSearch} className='text-white bg-purple-500 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'>Search for Dogs</button>
            </div>

            {/* Dropdown Menu */}
            <div id="dropdownSearch" className="z-10 hidden bg-white rounded-lg shadow-sm w-60 dark:bg-gray-700">
                <div className="p-6">
                <label htmlFor="input-group-search" className="sr-only">Search</label>
                
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                    </div>
                    <input onChange={updateFilter} type="text" id="input-group-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Breed"/>
                </div>
                </div>
                <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                    {children}
                </ul>
            </div>
            
        </div>
    )
}