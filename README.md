# Local AI Agent Tool

## Overview

The Local AI Agent Tool is a desktop and web application designed for power users who want a secure, private, and highly customizable interface for interacting with local Large Language Models (LLMs). The core feature is the ability to create, manage, and switch between specialized "agents" defined by simple text-based instruction files.

This application runs entirely on your local machine, ensuring that your data, prompts, and conversations never leave your device.

## Features (MVP v1.0.0)

- **Privacy First**: All data, including agent configurations and chat history, remains on the user's machine.
- **Agent Management**: Create, save, and switch between multiple AI agent personas.
- **File-Based Prompts**: Define agent behavior by uploading `.txt` instruction files.
- **Local Model Support**: Connects to a local Ollama server and allows selection from any available model.
- **Markdown & Code Support**: Renders chat responses with proper Markdown formatting and syntax highlighting for code blocks.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **UI Library**: [React](https://reactjs.org/)
- **State Management**: Zustand
- **UI Components**: Radix UI (for modals), Lucide Icons
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **LLM Service**: [Ollama](https://ollama.com/) (must be installed and running separately)
- **Desktop Packaging (Future)**: [Electron](https://www.electronjs.org/)

## Project Goals

- **Privacy First**: All interactions are processed locally. No cloud services, no data tracking.
- **Deep Customization**: Enable users to build a library of highly specialized AI agents for various tasks.
- **Intuitive Workflow**: Provide a clean and efficient UI for managing agents, models, and conversations.
- **Portability**: Allow the tool to be run from a flash drive or as a standalone desktop application.

## Getting Started

### Prerequisites

1.  **Node.js**: Ensure you have Node.js v18+ installed.
2.  **Ollama**: You must have the [Ollama desktop application](https://ollama.com/) installed and running on your machine.
3.  **LLM Models**: Pull at least one model through Ollama (e.g., `ollama run llama3`).

### Installation & Running

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd local-ai-agent-tool
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the application:**
    Open [http://localhost:3000](http://localhost:3000) in your browser to use the application.


## Coding Standards

This project adheres to the standards outlined in the CODING_STYLE_GUIDE.md file. We use ESLint and Prettier for automated linting and formatting.

- Before committing, please run npm run lint.

## Project Structure

/  
|-- /components/ # Reusable React components (UI, layouts)  
|-- /app/ # Next.js 13+ app directory routing  
|-- /lib/ # Helper functions, API clients (e.g., ollama-client.ts)  
|-- /styles/ # Global styles  
|-- .eslintrc.json # ESLint configuration  
|-- next.config.js # Next.js configuration  
|-- tsconfig.json # TypeScript configuration  
|-- PRD.md # Product Requirements Document  
|-- README.md # This file