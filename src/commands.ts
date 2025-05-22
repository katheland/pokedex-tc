import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {commandMap, commandMapB} from "./command_map.js";
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
        }
    };
}