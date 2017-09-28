# Table of Contents
- Project Title
- Introduction
- Getting Started
- Installing
- Running the Web Application
- Example
- Running the tests
- Contributing
- Author
- License

# Title: 
- Greetings Webapp

## Introduction
This project allows the user to greet in different languages by entering user's name on the text field and selecting the language of your choice on the radio buttons. It also counts how many names have been greeted in total, counts the number of times a user has been greeted for and store the names on MongoDB as you greet. This repository builds this Web Application using Continuous Integration. You can find the live Application [here](https://greet-app.herokuapp.com/).

# Getting Started
You need to fork this repository. I will assume that you already have an account with Github and logged in.

## Steps on creating a clone of your fork
1. On Github, navigate to your fork of this repository.
2. Under the repository name, click **Clone or download**.
3. In the Clone with HTTPs section, click the copy icon to copy the clone URL for the repository.
4. Open Terminal
5. Type `git clone` and then paste the URL you copied in Step 2. It will look like this, with your 
  GitHub username instead of `YOUR-USERNAME`as shown below:
  `~$ git clone https://github.com/YOUR-USERNAME/Creetings-webapp`
6. Press **Enter**. Your local clone will be created.

# Installing
Before running this Application you have to make sure make sure that you have 
[npm](https://www.npmjs.com/get-npm), [nodejs](http://nodejs.org) and [MongoDB](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-mongodb-on-ubuntu-16-04) installed first.

```bash
# Check if you have these installed by running the following commands:

node -v
npm -v
mongo -version

# You may have to do sudo npm install depending on your system

```
If you have the above packages installed in your system, now you need to install all the dependencies of this application by running the following command:
```bash
npm install

```
#  Running the Web Application
After completing the installation of dependencies you can run the Application by running the following command:
```bash
nodemon
````
You should see something like this:
![alt text][logo]

[logo]: https://github.com/ditero/greetings-webapp/blob/master/runningnodemon.png "Terminal"

Now it's time run it from the browser by typing; localhost:5000 on the Address Bar.

#  Example
The application will run on the browser like this:


![alt text][logo2]

[logo2]: https://github.com/ditero/greetings-webapp/blob/master/runningapp.png "Greetings App"

# Running the tests
![BuildStatus](https://travis-ci.org/ditero/greetings-webapp.svg?branch=master)
- Click on the Travis Test link above, to see the tests passing online 
- To run the test locally you need run any of the following commands:
```bash
  mocha
  npm test
  ```
# Contributing
You are welcome to contribute and please send me an issue to your forked repository, so I can have look at your updated features of this Application.

# Author
Anele Sigenu

# License
MIT Licensed
