# Notebrain.ai

A smart notetaking and note retrieval app that allows users to insert notes using text or speech and find notes or thoughts by asking plain questions.

## Features

- Insert notes using text input or speech recognition
- Find notes by asking natural language questions

## Technologies

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Radix UI](https://www.radix-ui.com/) + [Stitches](https://stitches.dev/) for building the UI
- [Clerk](https://clerk.dev/) for authentication
- [Lemonsqueezy](https://lemonsqueezy.com/) for payments
- [OpenAI Whisper](https://openai.com/research/whisper/) for speech-to-text conversion
- [OpenAI GPT-3](https://openai.com/product/gpt-4) for embeddings and answering questions
- [Xata.io](https://xata.io/) for the database and vector store

## How it works

1. User adds a note either by typing it or voice recording. Spoken notes are converted to text using OpenAI Whisper.
2. Notes are embedded using OpenAI's embeddings and stored in the Xata.io database.
3. When a user asks a question, a vector search is performed to retrieve relevant information from the database.
4. Relevant notes are passed to GPT-3 as context to generate an answer to the user's question.

## Demo

[notebrain.ai](https://www.notebrain.ai/)

Adding note:

https://user-images.githubusercontent.com/13342175/235457603-0e2f9eab-36f8-4331-beaf-f94b1dc52a6d.mp4

Retrieving information:

https://user-images.githubusercontent.com/13342175/235457747-35078d89-c83a-4c45-8d91-2cc128d932ea.mp4
