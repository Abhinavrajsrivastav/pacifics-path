import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAwY9jOFq5DpDG-Tp9R1tEbteFvcdv_oAs';

const OpenApi = async (query) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream(query + " the response should be effective and efficient and do not use * or # symbols in the response");
    const response = await result.response;

    let text = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      text += chunkText;
    }
    return text;
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
    return 'Failed to generate content';
  }
}

export default OpenApi;
