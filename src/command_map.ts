import {State} from "./state.js";

export async function commandMap(state: State): Promise<void> {
    const result = await state.pokeapi.fetchLocations(state.nextLocationsURL);
    for (let i of result.results) {
        console.log(i.name);
    }
    state.prevLocationsURL = result.previous;
    state.nextLocationsURL = result.next;
}

export async function commandMapB(state: State): Promise<void> {
    if (!state.prevLocationsURL) {
        console.log("You're on the first page.");
    } else {
        const result = await state.pokeapi.fetchLocations(state.prevLocationsURL);
        for (let i of result.results) {
            console.log(i.name);
        }
        state.prevLocationsURL = result.previous;
        state.nextLocationsURL = result.next;
    }
}