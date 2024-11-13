# Pet Adoption

This project is a full-stack application for a pet adoption platform, consisting of a frontend built with Angular and a backend built with Node.js. Below are the steps to install and run the application locally.

## Prerequisites

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli) (If you don't have it, you can install it globally using `npm install -g @angular/cli`)

## Installation

### Step 1: Clone the repository

First, clone the repository to your local machine:

`git clone https://github.com/gitta6/petAdoption`

`cd petadoption`

### Step 2: Install dependencies

To install the dependencies for both the frontend and backend, run the following commands:

#### Install frontend dependencies:

`npm install --prefix frontend`


#### Install backend dependencies:

`npm install --prefix backend`


### Step 3: Run the application
Once the dependencies are installed, you can start both the frontend and backend applications simultaneously by running the following command:

`npm run start`

This will start both the frontend and backend servers concurrently. The frontend will be served at http://localhost:4200 (by default), and the backend API server will start on its configured port (http://localhost:5000).

Folder Structure 

frontend/: Contains the Angular frontend application.

backend/: Contains the Node.js backend application.