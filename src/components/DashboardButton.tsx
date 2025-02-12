interface DashboardButtonProps {
    selected:boolean,
    buttonText:string,
    id?:string,
    changeTab?: (id:string) => void
    clickEvent?: () => void
}

export default function DashboardButton({selected, buttonText, id, changeTab, clickEvent}:DashboardButtonProps) {
    
    const handleClick = () => {
        if(changeTab && id){
            changeTab(id);
        } else if(clickEvent){
            clickEvent();
        }
    }

    return(
        <li className="w-full">
            <button
            id={id}
            data-tabs-target={`#${id}`}
            type="button"
            role="tab"
            aria-controls={id}
            aria-selected={selected}
            className="inline-block w-full p-6 rounded-ss-lg bg-gray-100 hover:bg-gray-200 focus:outline-none"
            onClick={handleClick}
            >{buttonText}</button>
        </li>
    )
}