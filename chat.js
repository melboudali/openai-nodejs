import openai from "./openai.js";
import readline from "node:readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const newMessage = async (history, message) => {
    const chatCompletions = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [...history, message]
    }); 
    return chatCompletions.choices[0].message;
}

console.log("\x1b[32mChatBot initialized. Type 'exit' to end chat.");

(() => {
    const history = [
        { role: "system", content: "You are an AI assistant, answer any questions to the best of yout ability." }
    ];

    const start = () => {
        rl.question("\x1b[32m👨  ", async userInput => {
            if (userInput.toLowerCase() === "exit") {
                rl.close();
                return;
            }

            const userMessage = { role: "user", content: userInput };
            const response = await newMessage(history, userMessage);

            history.push(userMessage, response);
            console.log(`\x1b[31m🤖  ${response.content}`);
            start();
        });
    };
    start();
})();