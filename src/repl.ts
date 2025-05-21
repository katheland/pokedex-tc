import {State} from "./state.js";

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").filter((c: string) => c != "");
}

export function startREPL(state: State): void {
    state.line.prompt();
    state.line.on("line", (input) => {
        let inputWords = cleanInput(input);
        if (inputWords.length != 0) {
            let command = state.cmdList[inputWords[0]];
            if (!command) {
                console.log("Unknown command");
            } else {
                command.callback(state);
            }
        }
        state.line.prompt();
    })
}