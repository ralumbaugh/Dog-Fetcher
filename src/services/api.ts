const baseUrl = "https://frontend-take-home-service.fetch.com/";
// const baseUrl = "https://website.com/";

export const login = async (name:string, email:string) => {
    const apiUrl = baseUrl + "auth/login";

    const myRequest = new Request(apiUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: name, email: email})
    });

    return submitRequest(myRequest);
}

export const logout = async () => {
    const apiUrl = baseUrl + "auth/logout";

    const myRequest = new Request(apiUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        }
    });

    return submitRequest(myRequest);
}

export const breeds = async() => {
    const apiUrl = baseUrl + "dogs/breeds"

    const myRequest = new Request(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    return submitRequest(myRequest);
}

export const dogs = async (myDogs:string[]) => {
    const apiUrl = baseUrl + "dogs";

    const myRequest = new Request(apiUrl, {
        method: "POST",
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myDogs)
    });

    return submitRequest(myRequest);
}

export const matchDog = async (myDogs:string[]) => {
    const apiUrl = baseUrl + "dogs/match";

    const myRequest = new Request(apiUrl, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(myDogs)
    });

    return submitRequest(myRequest);
}

export const searchDogs = async (breedSort: string, breeds?: string[], zipCodes?: number[], ageMin?: number, ageMax?: number, size?: number, from?: number ) => {
    //Can take the following parameters: Breeds, zipCodes, ageMin, ageMax, size(size of search), from(start at different location), sort
    let apiUrl = baseUrl + "dogs/search";

    //Append urls:
    if(breeds && breeds.length > 0) {
        apiUrl = apiUrl + "?breeds="
        for (let i = 0; i < breeds?.length-1; i++) {
            apiUrl = apiUrl + breeds[i] + "&breeds="
        }
        apiUrl = apiUrl + breeds[breeds.length-1];
    }

    if(zipCodes && zipCodes.length > 0) {
        apiUrl = apiUrl + "?zipCodes="
        for (let i = 0; i < zipCodes?.length-1; i++) {
            apiUrl = apiUrl + zipCodes[i] + "&zipcodes="
        }
        apiUrl = apiUrl + zipCodes[zipCodes.length-1];
    }

    if(ageMin) {
        apiUrl = apiUrl + "?ageMin=" + ageMin;
    }

    if(ageMax) {
        apiUrl = apiUrl + "?ageMax=" + ageMax;
    }

    if(size) {
        apiUrl = apiUrl + "?size=" + size;
    }

    if(from) {
        apiUrl = apiUrl + "?from=" + from;
    }

    if(breedSort) {
        apiUrl = apiUrl + "?sort=breed:" + breedSort;
    }


    const myRequest = new Request(apiUrl, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const response = await submitRequest(myRequest);
    return response;
}

export const submitRequest = async (myRequest:Request) => {
    try {
        const response = await fetch(myRequest);
        try {
            const body = await response.json();

            return {
                "status": response.status,
                "body": body,
                "next": body.next || null,
                "prev": body.prev || null,
                "match": body.match || null,
            };
        } catch { 
            console.log("Whoops!");
            return { "status": response.status }
        }
    } catch (error) {
        console.error("Error: ", error);
        throw new Error("Error Signing In");
    }
}