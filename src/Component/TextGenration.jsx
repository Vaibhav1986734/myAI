import React from 'react'
import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
async function GenrateText(promptProvided) {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro"});

  const prompt = promptProvided;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

const TextGenration = () => {
  const [prompt, setPrompt]=useState("");
  const [response, setResponse]=useState("");

  function handleChange(e)
  {
    setPrompt(e.target.value);
  }

  //function to handle submission
   async function handleSubmit()
  {

    const generatedresponse=await GenrateText(prompt);
    setResponse(generatedresponse);
    console.log(generatedresponse); 
  }
  return (
    <div className='ml-4'>
          <h1 id="head" className='text-center text-4xl text-blue-900'>My AI:Text Genration</h1> 

          <div className='my-10'>
            <lable className="block my-4" htmlFor="text">Enter your Prompt</lable>

             <input type="text" id='input' onChange={handleChange} name='text' className='border max-w-6xl rounded border-black' placeholder='Enter text'/>
             <button id='btn' onClick={handleSubmit}>Genrate</button>
          </div>
          <div className='my-4 max-w-screen-xl'>
            <p id='result'>{response}</p>
          </div>
    </div>
  )
}

export default TextGenration