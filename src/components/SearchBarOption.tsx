import { ChangeEvent } from "react";

interface searchBarOptionProps {
    text:string,
    inputClick: (text:string, isChecked:boolean) => void,
    checked?: boolean;
}

export default function SearchBarOption ({text, inputClick, checked}:searchBarOptionProps){

    const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
        inputClick(text, e.target.checked);
    }
    
    return(
        <div className="flex items-center ps-2 rounded-sm hover:bg-gray-100">
            <input onChange={handleClick} id={text} type="checkbox" checked={checked} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2"/>
            <label htmlFor={text} className="w-full py-2 ms-2 text-sm font-medium text-gray-900 rounded-sm">{text}</label>
        </div>
    )
}