# webapp
Assignment: 1
Name: Prakhya Dasari
NUID: 002774723


This web application is implemented using express node.js

SETUP : cloning and installing the dependencies:
 git@github.com: https://github.com/Networking-and-Cloud-Organization
  To install Node modules: npm i
  To run the Application: node main.js
  To run the test : npm test


Pre-Requsites:
 NodeJs, Visual Studio Code, postman, MYSQL

Requirements & Description : All API request/response payloads should be in JSON. No UI should be implemented for the application. As a user,APIs call to return with a proper HTTP status code.

Instructions to run the project:
Download zip from github
install node modules by running npm i
start mysql local host
run the project node main.js
APIs to hit from Postman


Creating a User:
create an account by providing the following information.
Email Address
Password
First Name
Last Name

Update user:
user must  be allowed to update  only the following fields.
First Name
Last Name
Password

Get user information
 Response payload should return all fields for the user except for password