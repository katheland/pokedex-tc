import {State} from "./state.js";

export function cleanInput(input: string): string[] {
    return input.toLowerCase().split(" ").filter((c: string) => c != "");
}

export async function startREPL(state: State) {
    state.line.prompt();
    state.line.on("line", async (input) => {
        let inputWords = cleanInput(input);
        if (inputWords.length != 0) {
            let command = state.cmdList[inputWords[0]];
            if (!command) {
                console.log("Unknown command");
            } else {
                try {
                    await command.callback(state, ...inputWords.splice(1));
                } catch (e) {
                    console.log((e as Error).message);
                }
            }
        }
        state.line.prompt();
    })
}