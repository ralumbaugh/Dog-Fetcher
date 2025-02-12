export const getThemDoggos = (numberOfDogs:number, dogImages:string) => {

    const defaultDoggos = [
        // Photogenic beagles
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_10108.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_12440.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_12816.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_161.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_16519.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_17314.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02088364-beagle/n02088364_17474.jpg",
        // Photogenic Boxers
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_1159.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_1619.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_2106.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_2831.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_5423.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_6295.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02108089-boxer/n02108089_922.jpg",
        // Photogenic German Shephards
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_104.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_10715.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_24768.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_3260.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_13368.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_620.jpg",
        "https://frontend-take-home.fetch.com/dog-images/n02106662-German_shepherd/n02106662_2753.jpg",
    ];

    let likedArray:string[] = [];

    if(dogImages) {
        likedArray = dogImages.split(";");
    }

    if(numberOfDogs >= likedArray.length) {
        // We are looking for more dog images than we have liked dogs. Use all liked images and some default ones.
        numberOfDogs -= likedArray.length;

        const checkedNumbers: { [key: number]:boolean } = {};

        for(let i=0; i<numberOfDogs; i++) {
            let numberFound = false;
            let dogToAdd = 0;
            while(!numberFound && numberOfDogs < defaultDoggos.length) {
                dogToAdd = Math.floor(Math.random() * defaultDoggos.length);
                if(checkedNumbers[dogToAdd] == null) {
                    checkedNumbers[dogToAdd] = true
                    likedArray.push(defaultDoggos[dogToAdd]);
                    numberFound = true;
                }
            }
        }
    }

    return likedArray;
}