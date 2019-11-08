# This is the Owndrive Repository

[This application](https://drive.owntech.io) is an interface for the [Solid Pod](https://solid.mit.edu/). It allows you to manage your Web Identity by giving you information about

-   Your Profile
-   Stored Data
-   Applications you're using and their access rights
-   Contacts

Feel free to contribute.

## Documentation

-   [Documentation Repository](https://github.com/0wntech/drive-documentation)

## Linter and Prettier

-   if you use vscode install Eslint & Prettier Package
-   go to file -> preferences -> settings -> Search for formatOnSave and check the box

## Precommit- / Prepush- hook

-   This Project runs all tests and applyies all linter rules before commit or push
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

## Contribution Guidline

This is an OpenSource Project, be part of it!

### Workflow

-   Select a Ticket from the [Project board](https://github.com/orgs/0wntech/projects/1)
-   Check all the Ticket requirements
-   Do your magic
-   Write Tests for it (we can only accept tested code)
-   Create a Pull request
-   Let someone review it
-   Congratulation, if your Pull Request gets accepted you contributed to the private web v1.0

## Deployment

-   We use Travis CI to deploy our Application
-   create a pull request for [production](https://github.com/0wntech/drive/tree/staging)
-   If the PR is accepted the build will start automatically and deploy the application to an AWS S3 Bucket
