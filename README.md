# File-Utility Service
This service functions as a demonstration piece.  Built in node.js, it combines a CLI tool and REST service to generate, sort, return and view data following a simple schema:

```
{
    lastName: ...,
    firstName: ...,
    gender: ...,
    favoriteColor: ...,
    birthDate: ...
}
```

#### Getting Started

1. Clone the Repository to your local machine
```
RUN: $ git clone https://github.com/sean-olson/file-utility-service.git
```

2. Install the dependencies.  From the root of the project
```
RUN: $ npm install
```

#### Using the CLI
From the root of the project, open a terminal window and
```
RUN: $ npm run cli
```
A menu of available commands will be displayed.

| COMMAND | USAGE | DESCRIPTION |
| ----------- | ----------- | ----------- |
| clean | `clean`| deletes all data files and the data-file directory from disk |
| gen | `gen [-n <number>]` | generates the sample files with 10 records unless -n is specified, constraint: 0 < n < 100 |
| help | `help` | displays the help menu for the cli | 
| print | `print [-s gender|birth|name]` | parses and displays the test files in the order specified, name by default |
| quit | `quit` | exits the cli |


#### Using the REST Service

The REST service provides similar functionality as the CLI, but with the addition of the ability to append an record to a data file.  Start the REST service by opening a terminal in the root of the project, and

```
RUN: $ npm start
```
The service is configured to run at [http://localhost:8080](http://localhost:8080).  Click this link with the service running for a page with links to the defined GET routes, duplicated here:


**REGISTERED ROUTES**
| METHOD | ROUTE | DESCRIPTION |
|--------------|-------------|--------------|
| GET | `/` | returns an HTML page with links to registered GET routes |
| GET | `/records` | returns a JSON array of the of the records sorted by lastName, firstName in descending order |
| POST | `/records` | generates a new record.  submit x-www-form-urlencoded data with fields: lastName, firstName, gender, favoriteColor, dateOfBirth (keys are not case sensitive) |
| GET | `/records/clean` | deletes all data files and the data-file directory from disk |
| GET | `/records/gen` | generates the sample files with 10 records |
| GET | `/records/gen/:count` | generates the sample files with n-number of records, 0 < n < 100 |
| GET | `/records/:sort` | returns a JSON array of the of the records sorted by the sort option (name, gender, birthdate) |
| GET | `/ui` | returns an HTML page with a list of the sorted by lastName, firstName in descending order |
| GET | `/ui/:sort` | returns an HTML page with a list of the sorted by the sort option (name, gender, birthdate) |