import {State} from "./state.js";

// Again, the guided project says to use the base experience
// but I know better, I've played these games since I was a preteen
// though I still wish catch rate was with the rest of the data in pokeapi...
export async function commandCatch(state: State, species: string): Promise<void> {
    if (!species) {
        console.log("catch needs a species argument");
        return;
    }

    console.log(`Throwing a Pokeball at ${species}...`);
    const result = await state.pokeapi.fetchCatchRate(species);
    let attempt = Math.random() * 255;
    if (attempt <= result.capture_rate) {
        console.log(`${species} was caught!`);
        if (!state.pokedex[species]) {
            console.log(`New Pokedex entry registered for ${species}`);
            // todo: flesh out the Pokedex later
            state.pokedex[species] = {name: species};
        }
    } else {
        console.log(`${species} escaped!`)
    }
}