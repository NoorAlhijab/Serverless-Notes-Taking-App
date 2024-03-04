# Serverless Notes Taking App

Welcome to the Serverless Notes Taking App project! This project demonstrates how to build an end-to-end serverless web application using API Gateway, Lambda, and DynamoDB, integrating a serverless backend REST API with a frontend single-page application developed using Angular. The application will be deployed in a serverless fashion using Amazon S3 and CloudFront.

## Overview

The Serverless Notes Taking App allows users to:

- Log in using their social media accounts, such as Google.
- Add, view, modify, and delete notes within the application.
- Store notes data in a DynamoDB table.
- Use a RESTful API to interact with DynamoDB from the frontend application.

## Features

- **Serverless Backend**: Built using the Serverless Framework, the backend consists of API Gateway, Lambda functions, and a DynamoDB table.
- **Frontend Application**: Developed using Angular, the frontend application interacts with the backend through RESTful API endpoints.
- **Authentication**: Federated identity access using AWS Cognito allows users to log in using their social media accounts.
- **CRUD Operations**: Users can perform CRUD operations (Create, Read, Update, Delete) on notes data stored in DynamoDB.
- **Scalable and Cost-effective**: Leveraging serverless architecture ensures scalability and cost-effectiveness by only paying for actual usage.

## Setup Instructions and Install Dependencies

To set up and install the required dependencies for this project, follow these steps:

1. **Clone this repository:**
   - Clone this repository to your local machine.

2. **Install Dependencies:**
   - To install the required dependencies for this project, run the following command in your terminal:
     ```
     npm install
     ```

3. **Deploy the backend to AWS using Serverless Framework:**
   - Deploy the backend to AWS using Serverless Framework with the following command:
     ```
     sls deploy
     ```

### Run the Application:

- Start the frontend application by running `npm start`.
- Access the application in your browser at `http://localhost:40000`.

## Continuous Integration and Continuous Deployment (CI/CD) Pipeline

To automate the deployment process, a CI/CD pipeline is set up using AWS CodePipeline and CodeBuild:

- The pipeline listens for changes in the master branch of the CodeCommit repository.
- When changes are detected, CodePipeline triggers a build using CodeBuild.
- CodeBuild builds the project and deploys it to the specified environment (e.g., prod stage).

### Build Spec File

The `buildspec.yml` file defines the build phases for CodeBuild. Refer to the `buildspec.yml` file for more details.

### Pipeline Execution

Pushing code changes to the master branch of the CodeCommit repository triggers the pipeline.

The pipeline automatically builds and deploys the project to the specified environment.

## Local Testing with Postman

To test the API endpoints locally using Postman:

- Open Postman.
- Set the request type (GET, POST, PUT, DELETE) and enter the API endpoint URL.
- Add any required headers or parameters.
- Send the request to the local server (e.g., `http://localhost:3000/prod/note`).

## Using Custom Domain Name and Route 53

To use a custom domain name and Route 53 for your Serverless Notes Taking App:

1. **Purchase a Domain Name**: Obtain a domain name from a domain registrar, such as Amazon Route 53.

2. **Create Hosted Zone**: In the AWS Console, navigate to AWS Route 53 and create a hosted zone for your domain.

3. **Configure DNS Records**: Set up DNS records (e.g., A record, CNAME record) to direct traffic to your API Gateway endpoints and frontend application.

4. **Set Up SSL Certificate**: Use AWS Certificate Manager (ACM) to set up an SSL certificate for your custom domain, enabling HTTPS.


## Authentication and Authorization Setup

Build authentication and authorization by adding Google Login for authentication and integrating Google Authentication with AWS Cognito to authorize users with appropriate IAM permissions. This allows users to sign in to the app using their Google account.

## Resources

- [Serverless Framework](https://www.serverless.com/)
- [Angular](https://angular.io/)
- [AWS Cognito](https://aws.amazon.com/cognito/)
- [DynamoDB](https://aws.amazon.com/dynamodb/)
- [API Gateway](https://aws.amazon.com/api-gateway/)
- [Lambda](https://aws.amazon.com/lambda/)
- [Amazon S3](https://aws.amazon.com/s3/)
- [CloudFront](https://aws.amazon.com/cloudfront/)
