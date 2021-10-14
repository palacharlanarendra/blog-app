
<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/palacharlanarendra/amazon-clone">
    <img src="https://cdn.svgporn.com/logos/medium.svg" alt="Logo" width="150" height="40">
  </a>

  <h3 align="center">CLONE</h3>

  <p align="center">
    An website with similar functionality like medium
    <br />
    <a href="https://github.com/palacharlanarendra"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/palacharlanarendra">View Demo</a>
    ·
    <a href="https://github.com/palacharlanarendra">Report Bug</a>
    ·
    <a href="https://github.com/palacharlanarendra">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#live-project">Live Project</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>
<!-- ABOUT THE PROJECT -->


## About The Project

This is a Medium clone, following are the features, I tried to mimic few features from the 
medium.
Here's are the features:
* User Authentication using JWT.  
* Displaying the global feed and tags for the website visitor.  
* Website visitors can read all the articles posted by the authors.    
* Tags functionality, it will sort all the global feed articles.  
* Authorized users can only post new articles. 
* Authorized user can only edit, delete his own articles.  
* Logged in user can edit his settings, can view his own profile.  



A list of commonly used resources that I find helpful are listed in the acknowledgments.

### Built With

frameworks, tech stack used to build this project,are:
* [MongoDB](https://www.mongodb.com/resources)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)
* [React](https://reactjs.org/)
* [firebase](https://firebase.google.com/)



<!-- GETTING STARTED -->
## Live project

* [Live Project](https://medium-clone-ce4f5.web.app)



### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation


1. Clone the repo
   ```sh
   git clone https://github.com/palacharlanarendra/medium-API-clone
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Enter the 'npm start' to run the project 
   ```JS
   npm start or PORT=3000 npm start
   ```

<!-- USAGE EXAMPLES -->
## Usage

To get a better idea about this project, follow my instructions (How to use?)

1. Enter the 'npm start' to run the project, Run the react project on the default link http://localhost:3000/ or click on the Live Link: [https://medium-clone-ce4f5.web.app](https://medium-clone-ce4f5.web.app)
2. Navigate to the signup page and try to register with your own credentials.
3. Navigate to the Sign-in link in the navigation bar and enter the credentials, so that you can register/login into the app.
    you can use the following credentials, if you are unable to register.
     ```JS
   email id : nari@gmail.com
   password : asdf1234
   ```  
4. Once you logged into the website, you can be able to access the private header links like write-a-story(add new post), settings, profile.       
5. if you access the write-a-story link, you can add new article to the website. this submitted artice will be displayed in the global feed. you can even sort and view the articles based on the tags.   
6.you can change your profile picture , password, bio, username, email from the update settings page.   
7.You can see the all articles posted by the user, and he only have the access to edit(article content) and delete the articles.      
8.user can signout by clicking the signout button, at the top-right corner of the header, then he will be rediredted to the home page. 

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Backend API
Project's backend code is available in the [Api_backend](https://github.com/palacharlanarendra/medium-API-clone/tree/main/Api_backend) folder in the same repo, 
All the end points are provided here for the API manual testing.  

Api deployed over here [BASE URL](https://mighty-oasis-08080.herokuapp.com/api/).  
 
# Endpoints

### Authentication Header:

You can read the authentication header from the headers of the request

`Authorization: Token jwt.token.here`


### Authentication:

`POST /api/users/login`

Example request body:
```JSON
{
  "user":{Auth
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a [User](/specs/backend-specs/api-response-format.md#users-for-authentication)

Required fields: `email`, `password`


### Registration:

`POST /api/users`

Example request body:
```JSON
{
  "user":{
    "username": "Jacob",
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a [User](/specs/backend-specs/api-response-format.md#users-for-authentication)

Required fields: `email`, `username`, `password`

### Get Current User

`GET /api/user`

Authentication required, returns a [User](/specs/backend-specs/api-response-format.md#users-for-authentication) that's the current user

### Update User

`PUT /api/user`

Example request body:
```JSON
{
  "user":{
    "email": "jake@jake.jake",
    "bio": "I like to skateboard",
    "image": "https://i.stack.imgur.com/xHWG8.jpg"
  }
}
```
Authentication required, returns the [User](/specs/backend-specs/api-response-format.md#users-for-authentication)
Accepted fields: `email`, `username`, `password`, `image`, `bio`

### Get Profile

`GET /api/profiles/:username`

Authentication optional, returns a [Profile](/specs/backend-specs/api-response-format.md#profile)

### Follow user

`POST /api/profiles/:username/follow`

Authentication required, returns a [Profile](/specs/backend-specs/api-response-format.md#profile)

No additional parameters required

### Unfollow user

`DELETE /api/profiles/:username/follow`

Authentication required, returns a [Profile](/specs/backend-specs/api-response-format.md#profile)

No additional parameters required



### List Articles

`GET /api/articles`

Returns most recent articles globally by default, provide `tag`, `author` or `favorited` query parameter to filter results

Query Parameters:

Filter by tag:

`?tag=AngularJS`

Filter by author:

`?author=jake`

Favorited by user:

`?favorited=jake`

Limit number of articles (default is 20):

`?limit=20`

Offset/skip number of articles (default is 0):

`?offset=0`

Authentication optional, will return [multiple articles](/specs/backend-specs/api-response-format.md#multiple-articles), ordered by most recent first



### Feed Articles

`GET /api/articles/feed`

Can also take `limit` and `offset` query parameters like [List Articles](/specs/backend-specs/api-response-format.md#list-articles)

Authentication required, will return [multiple articles](/specs/backend-specs/api-response-format.md#multiple-articles) created by followed users, ordered by most recent first.


### Get Article

`GET /api/articles/:slug`

No authentication required, will return [single article](/specs/backend-specs/api-response-format.md#single-article)

### Create Article

`POST /api/articles`

Example request body:

```JSON
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Authentication required, will return an [Article](/specs/backend-specs/api-response-format.md#single-article)

Required fields: `title`, `description`, `body`

Optional fields: `tagList` as an array of Strings



### Update Article

`PUT /api/articles/:slug`

Example request body:

```JSON
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Authentication required, returns the updated [Article](/specs/backend-specs/api-response-format.md#single-article)

Optional fields: `title`, `description`, `body`

The `slug` also gets updated when the `title` is changed


### Delete Article

`DELETE /api/articles/:slug`

Authentication required


### Get Tags

`GET /api/tags`

No authentication required, returns a [List of Tags](/specs/backend-specs/api-response-format.md#list-of-tags)


<!-- CONTACT -->
## Contact

Your Name - [@your_twitter](https://twitter.com/narendrapalach1) - narendrapalacharla@gmail.com

Project Link: [https://github.com/palacharlanarendra/medium-API-clone](https://github.com/palacharlanarendra/medium-API-clone)

Live Link: [https://medium-clone-ce4f5.web.app](https://medium-clone-ce4f5.web.app)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Deployment](https://firebase.google.com)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [MongoDB](https://www.mongodb.com/resources)
* [Express](https://expressjs.com/)
* [Node](https://nodejs.org/en/)
* [React](https://reactjs.org/)
