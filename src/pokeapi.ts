import {Cache, CacheEntry} from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache: Cache;

    constructor() {
        this.cache = new Cache(5000);
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
        const url = pageURL ? pageURL : PokeAPI.baseURL + "/location-area/";

        // check the cache first
        if (this.cache.get(url)) {
            console.log(`Accessing cache for ${url}`);
            return (this.cache.get(url) as ShallowLocations);
        }

        const response = await fetch(url, {
            method: "GET",
            mode: "cors"
        })
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }
    

    //async fetchLocation(locationName: string): Promise<Location> {
    // implement this
    //}
}

export type ShallowLocations = {
    next: string;
    previous: string | null;
    results: Result[];
};

type Result = {
    name: string;
}

//export type Location = {
// add properties here
//};
