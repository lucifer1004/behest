# Behest

Using this app, you can search for books you like and then add them to your
shelves.

## Highlights

- This project was bootstrapped with
  [Create React App](https://github.com/facebook/create-react-app).
- Use TypeScript.
- Use React Hooks to manage states.
- Use functional components instead of class components.
- Use service workers.

## To run it locally

First, you will need to clone the project, and change directory to the project's
root directory.

```sh
git clone https://github.com/lucifer1004/behest
cd behest
```

In the project directory, you can run:

```sh
yarn # To install all dependencies
yarn start # To start a development server
```

Runs the app in the development mode.<br> Open
[http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br> You will also see any lint errors in
the console.

You can also build it manually and run it in production mode, so that PWA will
be enabled, which means the application can run offline.

```sh
yarn global add http-server # If you have not installed it.
yarn build
cd build
http-server
```

## To run tests

```sh
yarn test
```

From the interactive options, you can choose `a` to run all tests, or `q` to
quit. Other options can be seen when you run it.

## To deploy

First you will need to register an account at [now](https://zeit.co/now) and
configure it on [GitHub](https://github.com).

Then you should make changes to the `name` and `alias` properties in `now.json`
as you want.

The deployment will be as simple as:

```sh
now
```
