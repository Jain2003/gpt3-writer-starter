import Head from 'next/head';
import Image from 'next/image';
import {useState} from 'react';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [prompt, setPrompt] = useState('');
  const [apiOutput, setApiOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);

    console.log("calling OpenAI ...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({prompt}),
      // body: JSON.stringify({"Give me linked in posts regaring: " + prompt}),
    });

    const data = await response.json();
    const {output} = data;
    console.log("OpenAI response: ", output.text);

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }
  const onUserChangedText = (event) => {
    // console.log(event.target.value);
    setPrompt(event.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Generate LinkedIN</h1>
          </div>
          <div className="header-subtitle">
            <h2>Write a quick sentence about what you want the Linkedin post to be: </h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Type Here to generate a linkedIn posts" className="prompt-box" value={prompt} onChange={onUserChangedText} />
          <div className="prompt-buttons">
            <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
              <div className="generate">
                {isGenerating ? <span className="loader"></span> : <p>generate</p>}
              </div>
            </a>
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>LinkedIN Post</h3>
                </div>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
