import {commandExit} from "./command_exit.js";
import {commandHelp} from "./command_help.js";
import {createInterface, type Interface} from "node:readline";

export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State) => void;
};

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
    };
}

export type State = {
    line: Interface;
    cmdList: Record<string, CLICommand>;
}

export function initState() {
    const r = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    const q: State = {
        line: r,
        cmdList: getCommands()
    }
    return q;
}