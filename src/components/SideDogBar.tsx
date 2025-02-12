interface dogBarProps {
    dog1?: string;
    dog2?: string;
    dog3?: string;
    dog4?: string;
}

export const SideDogBar = ({dog1, dog2, dog3, dog4}: dogBarProps) => {
    return(
        <div className=" bg-gray-700 p-2 h-full flex flex-col justify-between items-center">
            <img className="border rounded-3xl h-50 w-50 transition-opacity ease-in-out duration-700 opacity-60 hover:opacity-100" src={dog1? dog1 : "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11258.jpg"}  />
            <img className="border rounded-3xl h-50 w-50 transition-opacity ease-in-out duration-700 opacity-60 hover:opacity-100" src={dog2? dog2 : "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_11238.jpg"}  />
            <img className="border rounded-3xl h-50 w-50 transition-opacity ease-in-out duration-700 opacity-60 hover:opacity-100" src={dog3? dog3 : "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_575.jpg"}  />
            <img className="border rounded-3xl h-50 w-50 transition-opacity ease-in-out duration-700 opacity-60 hover:opacity-100" src={dog4? dog4 : "https://frontend-take-home.fetch.com/dog-images/n02085620-Chihuahua/n02085620_2973.jpg"} />
        </div>
    )
}