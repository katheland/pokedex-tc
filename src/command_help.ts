import {CLICommand} from "./repl.js";

export function commandHelp(commands: Record<string, CLICommand>) {
    console.log("Welcome to the Pokedex!");
    console.log("Usage:\n");

    for (let c in commands) {
        console.log(`${commands[c].name}: ${commands[c].description}`);
    }
}