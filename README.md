# Interactive JSON Viewer

This project is an interactive JSON viewer built with React, TypeScript, and Vite. It allows users to upload JSON files and view the data in a structured format.

## Features

- Upload and parse JSON files
- Display JSON data in a table format
- Dark and light theme support
- Error handling for invalid JSON files

## Getting Started

### Prerequisites

- Node.js (version 22 or higher)
- npm or yarn

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/mario-ruoff/mc-coding-challenge.git
    cd mc-coding-challenge/app
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server, run:

```sh
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173/`.

### Building for Production

To build the application for production, run:

```sh
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## VS Code Dev Containers

This project includes configuration for developing inside a VS Code Dev Container. To use it:

1. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension for VS Code.
2. Open the project in VS Code.
3. Press `F1` and select `Remote-Containers: Reopen in Container`.

## Project Structure
- `.devcontainer/`: VS Code Dev Container configuration
- `app/`: Application folder
  - `src/`: Contains the source code of the application
    - `assets/`: Static assets including an example JSON file
    - `components/`: Reusable UI components
    - `lib/`: Utility functions
    - `App.tsx`: Main application component
    - `main.tsx`: Entry point of the application
    - `index.css`: Global style configuration
  - `index.html`: HTML template
  - `tailwind.config.js`: Tailwind CSS configuration
  - `tsconfig.json`: TypeScript configuration
