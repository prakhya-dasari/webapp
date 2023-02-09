# webapp
Assignment: 2
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

Requirements & Description : 
All API request/response payloads should be in JSON.
No UI should be implemented for the application.
As a user, I expect all API calls to return with a proper HTTP status code (Links to an external site.).
As a user, I expect the code quality of the application to be maintained to the highest standards using the unit and/or integration tests.
Add Product
    Any user can add a product.
    Product quantity cannot be less than 0.
Update Product
    Only the user who added the product can update the product.
    Users can use either the PATCH or PUT API for updates.
Delete Product
    Only the user who added the product can delete the product.


Instructions to run the project:
Download zip from github
install node modules by running npm i
start mysql local host
run the project node main.js
APIs to hit from Postman


For Creating a User:
create an account by providing the following information.
Email Address
Password
First Name
Last Name

For Updating user:
should only be allowed to update the following fields.
First Name
Last Name
Password

Get user information : 
 Response payload should return all fields for the user except for password

Product addition and requirements:
Add Product
    Permissions - Only users with an account can create a product.
    Test various failure scenarios:
    Missing data for required field.
    Invalid quantity
    Negative number
    String
    Product SKU should be unique. Adding 2nd product with the same SKU should return an error.
Update Product
    Authorization check - The product can only be updated by the user that created it.
    Test various failure scenarios:
    Missing data for required field.
    Invalid quantity
    Negative number
    String
    Product SKU should be unique. Updating the product's SKU should return an error if another product in the database has same SKU.
Delete Product
    Authorization check - The product can only be deleted by the user that created it.
    Try deleting a product that has already been deleted.

Git Commands : 
git clone "github/shh" link
git checkout -b Assig2
git status
git add .
git commit -m "msg"
git push origin Assign2