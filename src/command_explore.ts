import {State} from "./state.js";

export async function commandExplore(state: State, loc: string): Promise<void> {
    const result = await state.pokeapi.fetchLocation(loc);
    console.log(`Exploring ${loc}...`)
    console.log("Found Pokemon:")
    for (let i of result.pokemon_encounters) {
        console.log(` - ${i.pokemon.name}`);
    }
}