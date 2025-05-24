import {State} from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");
    for (const entry in state.pokedex) {
        console.log(` - ${entry}`);
    }
}