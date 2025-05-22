import {State} from "./state.js";

export async function commandHelp(state: State): Promise<void> {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    for (let c in state.cmdList) {
        console.log(`${state.cmdList[c].name}: ${state.cmdList[c].description}`);
    }

    
}