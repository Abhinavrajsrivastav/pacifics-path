import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAwY9jOFq5DpDG-Tp9R1tEbteFvcdv_oAs';
const SEARCH_ENGINE_ID = 'd3ec914403b414c71';

const OpenApi = async (query) => {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = await genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContentStream(query + " the response should be effective and efficient and do not use * or # symbols in the response");
    const response = await result.response;

    let text = '';
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      // console.log(chunkText);
      text += chunkText;
    }
    return text;
  } catch (error) {
    console.error('Error generating content:', error.response ? error.response.data : error.message);
    return 'Failed to generate content';
  }
}

const fetchSearchResults = async (query) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};

export { OpenApi, fetchSearchResults };
