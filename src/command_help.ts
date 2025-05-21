import {State} from "./state.js";

export function commandHelp(state: State) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    for (let c in state.cmdList) {
        console.log(`${state.cmdList[c].name}: ${state.cmdList[c].description}`);
    }
}