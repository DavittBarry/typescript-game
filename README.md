# Project Name

Description of the project.

## Setup

To get started with this project, run the following commands:

```bash
git clone git@github.com:DavittBarry/typescript-game.git
cd typescript-game
npm install
```

## Building the Project

After installing the dependencies, you can build the project by running:

```bash
npm run build
```

This will generate the necessary files in the `dist` directory.

## Running the Project

To run the project locally, you'll need to serve the `dist` directory using a server of your choice. The `index.html` file in the `dist` directory refers to the compiled JavaScript files and is necessary to run the application in the browser.

If you have `http-server` installed, you can run:

```bash
http-server ./dist
```

Then, open your browser and navigate to the URL provided by the server.

## Notes

- The `dist` folder is not tracked by git as it contains generated files. 
- The `index.html` file in the `dist` directory is the entry point for the application when served via a server.