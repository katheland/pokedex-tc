import {createInterface} from "node:readline";
import {commandExit} from "./command_exit.js";
import { commandHelp } from "./command_help.js";

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").filter((c: string) => c != "");
}

export function startREPL(): void {
    const r = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > "
    })
    r.prompt();
    r.on("line", (input) => {
        let inputWords = cleanInput(input);
        if (inputWords.length != 0) {
            //console.log(`Your command was: ${inputWords[0]}`)
            let command = getCommands()[inputWords[0]];
            if (!command) {
                console.log("Unknown command");
            } else {
                command.callback(getCommands());
            }
        }
        r.prompt();
    })
}

export type CLICommand = {
    name: string;
    description: string;
    callback: (commands: Record<string, CLICommand>) => void;
};

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