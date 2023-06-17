# Movie Ticket Booking Portal

--- A simple Movie Ticket Backened App using Postgres, Express.js and Node.js with real-time Create, Read, Update, and Delete operations.

## Features

- Express
- REST API
- PostgreSQL

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Nodemon installation
  After installing node, this project will need nodemon too, so just run the following command.

      $ npm install -g nodemon
### Dependencies
express, mongoose, npm, joi, dotenv, bcrypt, nodemon etc
swagger for API testing

### Running the project

    $ nodemon start

## Installation

- `git clone https://github.com/shaheen5/Movie-Ticket-Booking-Backend.git`
- `cd Movie-Ticket-Booking-Backend`
- `npm install`
- `npm start`
- optional: include _.env_ in your _.gitignore_

### GET Routes

- visit http://localhost:8000
  - /tickets
  - /ticket/A001234
  - /ticket

#### Postman

- Install [Postman](https://www.getpostman.com/apps) to interact with REST API
- Create a message with:
  - URL: http://localhost:8000/tickets
  - Method: POST
  - Body: raw + JSON (application/json)
- Delete a message with:
  - URL: http://localhost:8000/ticket/A001234
  - Method: DELETE
