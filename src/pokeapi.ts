import {Cache, CacheEntry} from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache: Cache;

    constructor() {
        this.cache = new Cache(5000);
    }

    // gets a list of locations
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
        });
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }
    
    // gets the Pokemon available in a given location
    async fetchLocation(locationName: string): Promise<Location> {
        const url = PokeAPI.baseURL + "/location-area/" + locationName;

        // check the cache first
        if (this.cache.get(url)) {
            console.log(`Accessing cache for ${url}`);
            return (this.cache.get(url) as Location);
        }

        const response = await fetch(url, {
            method: "GET",
            mode: "cors"
        });
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }
}

export type ShallowLocations = {
    next: string;
    previous: string | null;
    results: Result[];
};

type Result = {
    name: string;
}

export interface Location {
    name: string
    pokemon_encounters: PokemonEncounter[]
}

interface PokemonEncounter {
    pokemon: Pokemon
}

interface Pokemon {
    name: string
}

