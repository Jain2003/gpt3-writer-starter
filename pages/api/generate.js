import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
 `Write me a LinkedIn posts regarding the below title, try keeping the post more professional along with proper hashtags
 Title: 
 `;
const generateAction = async (req, res) => {
    console.log(`API: ${basePromptPrefix}${req.body.prompt}`)

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.prompt}\n`,
        temperature: 0.3,
        max_tokens: 500,
    });
    const basePromptOutput = baseCompletion.data.choices.pop();

    res.status(200).json({output: basePromptOutput});
};

export default generateAction;
