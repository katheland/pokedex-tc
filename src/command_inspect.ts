import {State} from "./state.js";

export async function commandInspect(state: State, species: string): Promise<void> {
    if (!species) {
        console.log("inspect needs a species argument");
    } else if (!state.pokedex[species]) {
        console.log("you have not yet caught that pokemon");
    } else {
        const entry = state.pokedex[species];
        console.log(`Name: ${entry.pokemondata.name}`);
        console.log(`Height: ${entry.pokemondata.height}`);
        console.log(`Weight: ${entry.pokemondata.weight}`);
        console.log("Stats:");
        for (let s of entry.pokemondata.stats) {
            console.log(` -${s.stat.name}: ${s.base_stat}`);
        }
        console.log("Types:");
        for (let t of entry.pokemondata.types) {
            console.log(` - ${t.type.name}`);
        }
        // adding a little extra pokedex entry as a treat~
        for (let i = 0; i < entry.catchrate.flavor_text_entries.length; i++) {
            if (entry.catchrate.flavor_text_entries[i].language.name == "en") {
                console.log(cleanFlavorText(entry.catchrate.flavor_text_entries[i].flavor_text));
                break;
            }
        }   
    }
}

function cleanFlavorText(entry: string): string {
    return entry.split("\u000c").join(" ").split("\n").join(" ");
}