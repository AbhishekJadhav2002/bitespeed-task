# Chatbot Flow Builder

A visual chatbot flow builder built with Next.js 15, React Flow, and Tailwind CSS.

##### 🚀 [Live Demo](https://bitespeed-task.vercel.app/)

## Features

- 📱 **Text Nodes**: Create and connect text message nodes
- 🎨 **Visual Flow Builder**: Drag-and-drop interface using React Flow
- ⚙️ **Settings Panel**: Edit node content with an intuitive settings panel
- 🔄 **Node Connections**: Connect nodes with edges (one outgoing edge per node)
- 💾 **Flow Validation**: Validates flow before saving
- 🎯 **Extensible Architecture**: Easy to add new node types

## Getting Started

1. **Install dependencies**:
   ```bash
   yarn install
   ```

2. **Run the development server**:
   ```bash
   yarn dev
   ```

3. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## Usage

1. **Add Nodes**: Drag the "Message" node from the panel to the canvas
2. **Connect Nodes**: Click and drag from a node's source handle to another node's target handle
3. **Edit Content**: Click on a node to open the settings panel and edit its text
4. **Save Flow**: Click "Save Changes" to validate and save your flow

## Validation Rules

- Each source handle can only have one outgoing edge
- When saving, if there are multiple nodes, only one node can have an empty target handle (no incoming edges)

## Architecture

The project is structured for extensibility:
- **Node Types**: Easily add new node types in the `nodeTypes` configuration
- **Panels**: Modular panel system for nodes and settings
- **Validation**: Centralized flow validation logic
- **State Management**: React hooks for flow state management

## Tech Stack

- **Next.js 15**: React framework with App Router
- **React Flow**: Visual flow builder library
- **Tailwind CSS**: Utility-first styling
- **TypeScript**: Type safety and better developer experience

## Project Structure

##### `/src/app`

Contains the main application pages, only pages no other code lives here.

##### `/src/components`

Houses reusable UI components organized by Atomic Design principles.

- `atoms/`: The most basic and indivisible UI elements, like buttons or inputs.
- `molecules/`: Combinations of atoms that work together as a single unit, like header or footer. All shared components that are used across multiple pages live here.
- `organisms/`: This folder will contain sub-directories of pages that contain components that needs to be in the page.

##### `/src/hooks`

This folder primarily includes custom [React Query](https://tanstack.com/query/latest/docs/framework/react/overview) hooks, which encapsulate the server state management logic, making it easier to manage and access server data throughout the application.
For general purpose, we will be using [useHooks().ts](https://usehooks-ts.com/introduction) package.

##### `/src/lib`

Includes utility functions and helper modules that are used throughout the application.

##### `/src/providers`

Holds context providers and other global state management utilities.

##### `/src/store`

Contains stores created using [Zustand](https://zustand-demo.pmnd.rs/), which is used for state management throughout the application.

##### `/public`

Holds static files such as images, fonts, and other assets accessible in the root of the project.

#### Styling

The project uses [Tailwind CSS](https://tailwindcss.com/) for styling. Theme and Global styles are managed in `globals.css`, and the design system is organized based on utility-first principles.


## Deployment

For deployment on port 3000:
```bash
yarn
yarn build
pm2 start yarn start --name chatbot-flow-builder -- start -- -p 3000
```
