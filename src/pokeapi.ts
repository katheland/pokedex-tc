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

    // gets a Pokemon species' catch rate (and also Pokedex entries)
    async fetchCatchRate(species: string): Promise<CatchRate> {
        const url = PokeAPI.baseURL + "/pokemon-species/" + species;

        // check the cache first
        if (this.cache.get(url)) {
            console.log(`Accessing cache for ${url}`);
            return (this.cache.get(url) as CatchRate);
        }

        const response = await fetch(url, {
            method: "GET",
            mode: "cors"
        });
        const data = await response.json();
        this.cache.add(url, data);
        return data;
    }

    // gets a Pokmeon's stats
    async fetchPokemon(species: string): Promise<PokemonData> {
        const url = PokeAPI.baseURL + "/pokemon/" + species;

        // check the cache first
        if (this.cache.get(url)) {
            console.log(`Accessing cache for ${url}`);
            return (this.cache.get(url) as PokemonData);
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

// list of locations
export type ShallowLocations = {
    next: string
    previous: string | null
    results: Result[]
};

type Result = {
    name: string
}

// list of pokemon at location
export type Location = {
    name: string
    pokemon_encounters: PokemonEncounter[]
}

type PokemonEncounter = {
    pokemon: Pokemon
}

type Pokemon = {
    name: string
}

// catch rate and pokedex entries
export type CatchRate = {
    name: string
    capture_rate: number
    flavor_text_entries: FlavorTextEntry[]
}

type FlavorTextEntry = {
  flavor_text: string
  language: Language
  version: Version
}

type Language = {
  name: string
  url: string
}

type Version = {
  name: string
}

// pokemon stats
export type PokemonData = {
    name: string
    height: number
    weight: number
    stats: Stat[]
    types: Type[]
}

type Stat = {
  base_stat: number
  stat: Stat2
}

type Stat2 = {
  name: string
}

type Type = {
  slot: number
  type: Type2
}

type Type2 = {
  name: string
}