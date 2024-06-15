# README #

This README would normally document steps necessary to get API automation to tet new task creation.

### What is this repository for? ###

* API automation to test new task creation
* Created using mochajs + chai + suppertest + mochawesome-report

### How do I get set up? ###

* Clone the repo locally
* Run `npm i` to install all packages (dependencies) required for the project

### Configurations guidelines ###

* `.env` file is having the tokens and key values which is required for the API
* `../config/base.js` is having the BASE_URL (endpoit) and boardID, ListID

### Running the tests ###

* Run the tests without generating reports use `npm test`
* Run the tests with html reports use `npm test-html` (after completion report will be generated at mochawesome-report folder in root directory)
* Run the tests with junit reports use `npm test-junit` (after completion report will be generated in the root directory with name `test-results.xml)