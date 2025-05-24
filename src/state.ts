import { stringify } from "node:querystring";
import {getCommands} from "./commands.js";
import {PokeAPI, CatchRate, PokemonData} from "./pokeapi.js";
import {createInterface, type Interface} from "node:readline";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    line: Interface;
    cmdList: Record<string, CLICommand>;

    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string | null;

    pokedex: Record<string, PokedexEntry>;
}

export type PokedexEntry = {
    catchrate: CatchRate;
    pokemondata: PokemonData;
}

export function initState() {
    const r = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    const q: State = {
        line: r,
        cmdList: getCommands(),

        pokeapi: new PokeAPI(),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area/",
        prevLocationsURL: null,
        
        pokedex: {}
    }
    return q;
}