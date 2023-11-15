[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# AssignmentTemplate

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

# Running RabbitMQ Service

## Make sure docker is installed
https://www.docker.com/

## Go to the rabbitMQ directory
services\rabbitMQ

## `docker-compose up`
Execute the command to build, (re)create, start, and attach to a container for the rabbitMQ service.

## Go to http://localhost:15672 to check whether the service is started.
Enter guest::guest as the default username and password. You should be able to see the rabbitMQ UI management.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# Running the Assignment 5
## Pre-requisites:
1. Make sure that you have all the necessary import/dependencies in your project.

## Steps
1. Make sure that you have started the RabbitMQ Server with all the necessary configs. However, you might need to handle the related path and codes in the code base.
2. Run `npm run test-matching` in the terminal. You will be redirected to your browser where 2 tabs will open.
3. An alternative for step 1 and 2 : The user can just type `docker compose up` in the visual studio code terminal and open up `http://localhost:3000` to get into home page the login details are the same as below for each user.
4. Sign up or Log in on 2 different account as you can't access the services unless you have one. You can also use the user:
  User 1 login details: Email: testing1233@gmail.com Password: 123456
  User 2 login details: Email: testing1234@gmail.com Password: 123456
5. Press Home in the navigation bar on top. If there's nothing in the page, do try to refresh a few times until there's something like the picture below. The page may need time to render.
   ![image](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g12/assets/89584177/f64553df-a0c9-4e98-865d-b8e46d7a6140)

7. Enter the parameters that you want to be matched on. You need to pick 2 things, 1 for difficulty and 1 for programming language.
8. Once you have picked the necessary choices, press match and you will see a timer countdown of 30 s.
9. At the other tab, do the same thing as you did in the first tab. Make sure, that you have chosen  the same parameter within 30 s, else you will need to redo the whole step.
10. Once matched, both tabs will be updated to the collaboration page

## Unsuccessfull matching
1. We set a timer of 30s for matching, if within that time frame there's no match, an alert with shows and the timer will be disappear. 
