import {getCommands} from "./commands.js";
import {PokeAPI} from "./pokeapi.js";
import {createInterface, type Interface} from "node:readline";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => Promise<void>;
};

export type State = {
    line: Interface;
    cmdList: Record<string, CLICommand>;

    pokeapi: PokeAPI;
    nextLocationsURL: string;
    prevLocationsURL: string | null;
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
        prevLocationsURL: null
    }
    return q;
}