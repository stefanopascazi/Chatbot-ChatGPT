const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const prompt = require("prompt-sync")({ sigint: false });

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion(arg = null) {
    if (arg === null) {
        let response = prompt("")
        const completion = await chatGPT(response)
        console.log(`Emilio: ${completion}`);
    }
    console.log("Emilio: Vuoi chiedermi altro?\r")
    runCompletion();
}

async function chatGPT(arg) {
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: arg,
        temperature: 0.6,
        max_tokens: 130,
    });
    return completion.data.choices[0].text;
}
console.log("chatBot: Ciao, sono Emilio il bot creativo.")
console.log("Emilio: Chiedimi qualsiasi cosa\r")
runCompletion();