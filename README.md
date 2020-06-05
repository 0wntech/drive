# This is the Owndrive Repository

[This application](https://drive.owntech.io) is an interface for the [Solid Pod](https://solid.mit.edu/). It allows you to manage your Web Identity by giving you information about

-   Your Profile
-   Stored Data
-   Applications you're using and their access rights
-   Contacts

Feel free to contribute.

## Setup
- Clone git repo
- Install:
```
npm install
```
- Run:
```
npm start
```


## Documentation

-   [Documentation Repository](https://github.com/0wntech/drive-documentation)

## Linter and Prettier

-   if you use vscode install Eslint & Prettier Package
-   go to file -> preferences -> settings -> Search for formatOnSave and check the box

## Precommit- / Prepush- hook

-   This Project runs all tests and applies all linter rules before commit or push
-   If you have linter errors try `eslint "**/*.js` in terminal or remove the linter errors by hand

## Tests and Coverage

-   Tests are written with the Jest framework
-   Travis CI + codecov for testing and coverage report (report at [codecov](https://codecov.io/gh/0wntech/drive))
-   To test in a live environment push your branch to [staging](https://github.com/0wntech/drive/tree/staging) it will deployed at [staging.drive.owntech](https://staging.drive.owntech.io/)

-   Test Local

```
npm run test:local
```

-   Coverage Report

```
npm run test:coverage
```

-   End to End Tests

```
npm run test:e2e
```

## Deployment

-   We use Travis CI to deploy our Application
-   create a pull request for [production](https://github.com/0wntech/drive/tree/staging)
-   If the PR is accepted the build will start automatically and deploy the application to an AWS S3 Bucket
