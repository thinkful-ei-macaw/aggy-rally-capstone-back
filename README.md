# rally-captstone
Thinkful Capstone One

Rally!
===

https://rally-capstone-frontend.vercel.app/welcome
---

API documentation
---
Auth
---
fetch call, passed a user, to api_endpoint + '/users' for POST requests

fetch call, passed user_name and password, to api_endpoint + '/auth/login' for login 


Profile
---
fetch call to the api_endpoint + '/profiles' for GET requests of a user's own profile

fetch call, passed a profile, to api_endpoint + '/profiles/matches' and specifying the critical categories such as genre, romance, and pvp for GET request of matched profiles

fetch call, passed a profile, to api_endpoint + '/profiles/' + the user's profile.id for DELETE requests

fetch call, passed a profile, to api_endpoint + '/profiles/' for POST requests


Summary
---
The app allows users to create a match profile which uses specifically tailored data points to help the user find similarly minded individuals to engage in this hobby with.


* React is used for the client side
* Node is used for the server
* The Tables and database are made using postgresql
* The styling is done using standard CSS

Test Account
---
Username: tester
Password: testerpass