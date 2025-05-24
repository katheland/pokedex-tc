import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {commandMap, commandMapB} from "./command_map.js";
import {commandExplore} from "./command_explore.js";
import {commandCatch} from "./command_catch.js";
import {commandInspect} from "./command_inspect.js";
import {commandPokedex} from "./command_pokedex.js";
import {CLICommand} from "./state.js";

// returns a registry of known commands
export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exits the pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Lists the next 20 locations",
            callback: commandMap,
        },
        mapb: {
            name: "mapb",
            description: "Lists the previous 20 locations",
            callback: commandMapB,
        },
        explore: {
            name: "explore",
            description: "Lists the Pokemon found in a given location",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempts to catch the given Pokemon species",
            callback: commandCatch,
        }, inspect: {
            name: "inspect",
            description: "Gets the stats of the given caught Pokemon",
            callback: commandInspect,
        }, pokedex: {
            name: "pokedex",
            description: "Lists the Pokemon registered in the Pokedex",
            callback: commandPokedex,
        }
    };
}