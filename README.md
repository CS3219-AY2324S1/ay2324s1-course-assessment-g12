[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# AssignmentTemplate

# Kubernetes Deployment

View our project [here](http://http://35.198.205.80/)

# How to run the program locally

1. Make sure docker is installed
https://docs.docker.com/engine/install/

2. Request for the firebase auth key and store it in services/database
You can reach out on the issue of this page.

3. Pull from stable-local branch

4. Run the docker-compose.yaml
run `docker compose up --detach --build`

5. Wait until the process is done
You will see a new container in your docker and wait until all images is running.

6. Open your browser
Access [http://localhost:3000](http://localhost:3000) for User 1 and [http://localhost:3006](http://localhost:3006) for User 2.
User 1 login details: Email: testing1233@gmail.com Password: 123456
User 2 login details: Email: testing1234@gmail.com Password: 123456

# Getting Started with Create React App
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Running the Assignment 5
## Pre-requisites:
1. Make sure that you have all the necessary import/dependencies in your project.
2. Make sure that your are at the directory ay2324s1-course-assessment-g12.

## Steps
1. Make sure that you have started the RabbitMQ Server with all the necessary configs.
2. Run `npm run test-matching` in the terminal. You will be redirected to your browser where 2 tabs will open.
3. Sign up or Log in on 2 different account as you can't access the services unless you have one. You can also use the user:
4. You should be in the Home page with Looking like the following picture. Else, please press Home and the navigation bar on top.
5. Enter the parameters that you want to be matched on. You need to pick 2 things, 1 for difficulty and 1 for programming language.
6. Once you have picked the necessary choices, press match and you will see a loading animation with a timer countdown from 30 s.
7. At the other tab, do the same thing as you did in the first tab. Make sure, that you have chosen  the same parameter within 30 s, else you will need to redo the whole step.
8. Once matched, both tabs will be redirected to the collaboration page and we're done

## Unsuccessfull matching
1. We set a timer of 30s for matching, if within that time frame there's no match, the animation icon will be disappear. 


