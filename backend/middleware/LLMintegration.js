const { CohereClient } = require('cohere-ai');

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

// PRACTICE QUESTS ka llm
const generatePrac = async (text1, number) => {
  try {
    const response = await cohere.chat({
      model: 'command',
      message: `You are a helpful assistant that creates quiz based on provided notes.

Please create ${number} number of practice questions based on the following inputs:

Notes:
${text1}

Please format the questions properly and ensure they follow the given pattern. The questions should be clear, properly numbered, and include marks distribution.`,
      temperature: 0.7,
      
      max_tokens: 2000,
      stream: false,
      
      preamble: "You are an experienced educator who specializes in creating well-structured questions."
    });

    return response.message.text;

  } catch (error) {
    console.error("Error in generateQuestPaper:", error);
    
    const errorDetails = {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    };
    throw new Error(`Failed to generate question paper: ${JSON.stringify(errorDetails)}`);
  }
};

// QUIZ ka llm
const generateQuiz = async (text1) => {
  try {
    const response = await cohere.chat({
      model: 'command',
      message: `You are a helpful assistant that creates quiz based on provided notes.

Please create a quiz based on the following inputs:

Notes:
${text1}

Strictly follow this format for 5 questions:
Question: _
Options: a: _, b: _, c: _, d: _
answer: _

Please format the questions properly and ensure they follow the given pattern. The questions should be clear, properly numbered, and include marks distribution.`,
      temperature: 0.7,
      
      max_tokens: 2000,
      stream: false,
      
      preamble: "You are an experienced educator who specializes in creating well-structured question papers."
    });

    return response.message.text;

  } catch (error) {
    console.error("Error in generateQuestPaper:", error);
    
    const errorDetails = {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    };
    throw new Error(`Failed to generate question paper: ${JSON.stringify(errorDetails)}`);
  }
};

// QUESTION PAPER ka llm
const generateQuestPaper = async (text1, text2) => {
  console.log(text1);
  console.log(text2);

  try {
    const response = await cohere.chat({
      model: 'command',
      message: `You are a helpful assistant that creates question papers based on provided notes and patterns.

Please create a question paper based on the following inputs:

Notes:
${text1}

Question Paper Pattern:
${text2}

Please format the questions properly and ensure they follow the given pattern. The questions should be clear, properly numbered, and include marks distribution.`,
      temperature: 0.7,
      
      max_tokens: 2000,
      stream: false,
      
      preamble: "You are an experienced educator who specializes in creating well-structured question papers."
    });

    return response.message;

  } catch (error) {
    console.error("Error in generateQuestPaper:", error);
    
    const errorDetails = {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    };
    throw new Error(`Failed to generate question paper: ${JSON.stringify(errorDetails)}`);
  }
};

module.exports = generateQuestPaper, generateQuiz, generatePrac;