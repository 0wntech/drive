# This is the Owndrive Repository

This application is supposed to be an alternative interface to the Solid Pod interface that allows for an easier interaction with the files and folders within your Solid Pod.

Feel free to contribute.

## Documentation

-   [Documentation Repository](https://github.com/0wntech/drive-documentation)

## Linter and Prettier

-   if you use vscode install Eslint & Prettier Package
-   go to file -> preferences -> settings -> Search for formatOnSave and check the box

## Precommit- / Prepush- hook

-   This Project runs all test and applyies all linter rules before commit or push
-   If you have linter errors try `eslint "**/*.js` in terminal or remove the linter errors by hand

## Tests and Coverage

-   Tests are written with the Jest framework
-   Travis CI + codecov for testing and coverage report (report at [codecov](https://codecov.io/gh/0wntech/drive))
