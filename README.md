# React Apollo Starter kit

This is an opinionated starter kit to start making an Apollo-based app. The goal of this starter kit is to give you an app that is ready for production. This means having proper logging, error handling, testing, bundling, asset management, and everything else out of the box. For a more barebones starter kit, check out [the official Apollo starter kit](https://github.com/apollostack/apollo-starter-kit).

## Stack this kit uses
* [React](https://facebook.github.io/react/) for frontend development
* [GraphQL](http://graphql.org/) for backend API
* [Apollo](http://apollostack.com) for backend/frontend data flow management
* [Redux](http://redux.js.org/) for frontend data management. Apollo integrates with Redux.
* [React-router](https://github.com/reactjs/react-router) for clientside routing
* [Aphrodite](https://github.com/Khan/aphrodite) for styling
* [Express](http://expressjs.com/) for the server
* [Webpack](https://webpack.github.io/) for development server + hot reloading clientside stuff
* [Nodemon](https://github.com/remy/nodemon) for hot reloading backend code
* [Rollbar](https://rollbar.com) for production error handling
* [Minilog](https://github.com/mixu/minilog) for client and server logging
* [Node-foreman](https://github.com/strongloop/node-foreman) for running both the Webpack server and Express server
* [ESLint](http://eslint.org/) to keep your Javascript style consistent
* [Babel](https://babeljs.io/) to use the latest Javascript language features

## Other features of this kit
* Automatic asset versioning so that you can aggressively cache your assets in production
* Server side rendering out of the box
* Custom Apollo network interface that lets you add middleware to handle responses from GraphQL. This would be a good place to put any error handling that you want to do globally (e.g. unexpected errors from GraphQL, user authorization or authentication errors, etc.).
* Sane handling of unexpected exceptions:
    * Calls to log.error in client/server will log the error to the console/stdout and also send it to Rollbar.
    * Unexpected exceptions in client-side code (including within asynchronous code): log.error + force refresh the app after an alert to the user
    * Unexpected exceptions in non-GraphQL server-side code: log.error + crash the server. In dev, nodemon will wait for changes to restart the server. In production, you should handle restarting the server (e.g. set Heroku to auto-restart dynos on a crash).
    * Unexpected exceptions in GraphQL code: log.error. This happens via a response middleware that is easily changeable.

## Making new app with this kit
1. Install [Node.js](https://nodejs.org/).
1. Clone this starter kit
1. Change the git remote to point to your new project's repo with `git remote set-url origin <new-url>`
1. Change the README and update `package.json` to reflect the new package name, package license, description, keywords, repository, bugs url, homepage, and author.
1. [Set up an ESLint plugin in your code editor so that you catch coding errors and follow code style guidelines more easily!](https://medium.com/planet-arkency/catch-mistakes-before-you-run-you-javascript-code-6e524c36f0c8#.oboqsse48)
1. [Install the redux-devtools-extension](https://github.com/zalmoxisus/redux-devtools-extension) in Chrome to get advanced Redux debugging features.
1. `npm install`
1. `npm run dev`
1. Navigate to `http://localhost:3000` to see your app in action.
1. Navigate to `http://localhost:3000/graphiql` to mess around with the GraphQL API.
1. Start making changes by working in the `src` directory

## Deploying this app to [Heroku]
1. Deploy your app to [Heroku]. Make sure to set the correct environment variables there based on what exists in `.env` in this project!
1. Allow [Heroku] to install build time dependencies from the devDependencies in package.json:
   `Settings -> Config Variables -> Add`, KEY: `NPM_CONFIG_PRODUCTION`, VALUE: `false`.

[Heroku Toolbelt]: (https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
[Heroku]: (https://heroku.com)
