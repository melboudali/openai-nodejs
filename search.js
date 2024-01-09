import openai from "./openai.js";
import { Document } from "@langchain/core/documents";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { movies } from "./data.js";

const createStore = () => MemoryVectorStore.fromDocuments(movies.map(movie => new Document({
    pageContent: `Title: ${movie.title}\nDescription: ${movie.description}`,
    metadata: { source: movie.id, title: movie.title }
})),
    new OpenAIEmbeddings()
);

const search = async (query, count = 1) => {
    const store = await createStore();
    return store.similaritySearch(query, count);
}

console.log(await search('I\'m looking for a movie about a group of people ruled by a maniac').then(res => `Here is the movie that you are looking for:\n\n${res[0].pageContent}`));

