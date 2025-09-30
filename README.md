# Local AI Agent Tool

## Overview

The Local AI Agent Tool is a desktop and web application designed for power users who want a secure, private, and highly customizable interface for interacting with local Large Language Models (LLMs). The core feature is the ability to create, manage, and switch between specialized "agents" defined by simple text-based instruction files.

This application runs entirely on your local machine, ensuring that your data, prompts, and conversations never leave your device.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) with TypeScript
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **LLM Service**: [Ollama](https://ollama.com/) (must be installed and running separately)
- **Desktop Packaging (Future)**: [Electron](https://www.electronjs.org/)

## Project Goals

- **Privacy First**: All interactions are processed locally. No cloud services, no data tracking.
- **Deep Customization**: Enable users to build a library of highly specialized AI agents for various tasks.
- **Intuitive Workflow**: Provide a clean and efficient UI for managing agents, models, and conversations.
- **Portability**: Allow the tool to be run from a flash drive or as a standalone desktop application.

## Getting Started (Development)

### Prerequisites

- **Node.js**: Ensure you have Node.js (v18 or later) installed.
- **Ollama**: You must have [Ollama installed](https://ollama.com/download) and running on your machine.
- **Pull a Model**: Download at least one model through Ollama.  
    ollama pull llama3  

### Installation

- Clone the repository:  
    git clone &lt;repository_url&gt;  
    cd local-ai-agent-tool  

- Install dependencies:  
    npm install  

- Run the development server:  
    npm run dev  

Open [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) with your browser to see the result.

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