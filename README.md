# CMS API

A content management system (CMS) is a software application that allows users to create, manage, and publish digital content on the internet. A CMS simplifies the process of creating and editing digital content, making it easier for non-technical users to manage websites and other online platforms.

> Documentation link can be found [click_here](https://documenter.getpostman.com/view/9340802/2s93m4YNw1).

![3088358_orig](https://user-images.githubusercontent.com/56930241/234988498-d0487b9d-39df-4520-9f73-65ca3d7b3af6.jpg)

## Getting Started
 To get started with this API, you'll need to have Node.js installed on your machine. Once you've done that, you can follow these steps to set up the API:
 - Clone the repository to your local machine.
```bash
git@github.com:wastech/content-management-system.git
```
 - Navigate to the project directory:

```bash
 cd backend
```
 - Run npm install to install the dependencies.

```bash
npm install
```
 - Create a .env file in the root directory and add the following variables

```bash 
PORT=<port number>
MONGO_URI=<MongoDB URI>
JWT_SECRET=<JWT secret key>
```
- Run npm start to start the server.

```bash
npm start

```

The API will be available at http://localhost:3000. You can test the API endpoints using a tool like Postman or curl.

## Features

- Content creation: The ability to create and edit various types of content such as pages, blog posts, images, videos, etc.

- Content organization: The ability to organize and categorize content using tags, categories, and other metadata to make it easy to search and filter.

- Content publishing: The ability to publish content to a website or other digital platform, as well as the ability to schedule content for future publication.

- User management: The ability to create and manage user accounts with different roles and permissions, allowing different users to have access to different parts of the content management system.

- Version control: The ability to track changes to content over time and restore previous versions if necessary.

- Workflow management: The ability to manage the content creation process, including assigning tasks, tracking progress, and approving content for publication.

- SEO optimization: The ability to optimize content for search engines by adding metadata, keywords, and other SEO elements.

- Analytics and reporting: The ability to track website traffic, user behavior, and other metrics to inform content creation and optimization.

- Security: The ability to secure the content management system and its content against unauthorized access and other security threats.

- Integration with other systems: The ability to integrate with other systems such as marketing automation, CRM, or e-commerce platforms to streamline workflows and increase efficiency

### Stack
- [Node.js](https://nodejs.org/en)
- [Nest.j](https://nestjs.com/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)

 CMS API is built using Node.js, Express.js and Nest.js, with MongoDB as the database. I'm using the Mongoose library to interact with the database, and JWT for authentication.
 
 ### Requirements
 - [Node.js](https://nodejs.org/en)
 - [MongoDB](https://www.mongodb.com/)
 
 Before you can run the API locally, make sure you have Node.js and MongoDB installed on your machine. You can download Node.js from the official website, and MongoDB from the MongoDB website.
 
 ### Contributing
 I welcome contributions from the community! Here are a few guidelines to keep in mind:
 - Before starting work on a new feature, please create an issue first to discuss the proposed changes with the maintainers.
 - Make sure your code follows our code style guidelines, which can be found in the .eslintrc file.
 - All pull requests should be submitted against the develop branch.
 - Write clear and concise commit messages that describe the changes you're making.
 - Make sure all existing tests still pass and add new tests if necessary.
 - When submitting a pull request, please provide a summary of the changes made and a link to the corresponding issue.
 - Be respectful of others and their contributions. We have a code of conduct in place to ensure a welcoming environment for everyone.
 
 If you have any questions or need help getting started, please don't hesitate to reach out to me. I'm happy to help!
 ## Related Repositories

Here are some more example projects with Nest.js


[![API example](https://github-readme-stats.vercel.app/api/pin/?username=wastech&repo=nestjs-authentication)](https://github.com/wastech/nestjs-authentication)
[![API example](https://github-readme-stats.vercel.app/api/pin/?username=wastech&repo=nestjs-blog-Api)](https://github.com/wastech/nestjs-blog-Api)


### Contact
If you have any questions or suggestions regarding this API, please feel free to contact me at [fataiwasiu2@gmail.com]. Thank you for using our service!
