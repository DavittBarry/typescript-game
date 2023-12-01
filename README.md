# typescript-game

A practice attempt at making a game using TypeScript and Phaser.

## Setup

Clone the repository and install dependencies:

```bash
git clone git@github.com:DavittBarry/typescript-game.git
cd typescript-game
npm install
```

## Development

To start the development server with hot module reloading, run:

```bash
npm start
```

This will compile your TypeScript files and open the game in your default web browser, automatically reloading when changes are made.

## Building the project

To build the project for production, run:

```bash
npm run build
```

This will generate the necessary files in the 'dist' directory.

## Running the project locally

For production, after building, you can serve the `dist` directory using a server of your choice. The `index.html` file in the `dist` directory is the entry point for the application.

If you want to serve the `dist` directory after building for production testing, you can use `http-server` or a similar static file server. If `http-server` is not installed, you can add a script to use it from your local `node_modules`:

```bash
npm install --save-dev http-server
```

Then, add a script in your `package.json` to run it:

```json
"scripts": {
  "serve": "http-server ./dist",
  // ... other scripts
}
```

And run it using:

```bash
npm run serve
```

Navigate to the provided URL in your browser to view the project.

## Contributing

Please follow the linting guidelines before pushing any changes:

```bash
npm run lint:fix
```

## Notes

- The `dist` folder is not tracked by git as it contains generated files.
