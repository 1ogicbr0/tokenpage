# Deployment

this webapp is deployed on dev server at the address [https://dev1.unikbase.dev/token-login](https://dev1.unikbase.dev/token-login)

# Build

First, install node packages:

- Use npm
```sh
npm install
```
- Use yarn
```sh
yarn install
```

Then add a .env file in the root folder that have the content:

```env
REACT_APP_SERVER_ADDRESS="serverAddress"
```

The "serverAddress" is the address of the server of the environment that needs to be built.  For example in dev environment, that file will be:

```env
REACT_APP_SERVER_ADDRESS=https://dev1.unikbase.dev
```
Then, generate a build folder:

- Use npm
```sh
npm run build
```
- Use yarn
```sh
yarn build
```

Then, in the root folder, you will have a build folder.
