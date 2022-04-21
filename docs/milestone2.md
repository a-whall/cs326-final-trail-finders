# Milestone #2

## APIs:

<img width="1140" alt="Screen Shot 2022-04-20 at 7 29 56 PM" src="https://user-images.githubusercontent.com/98613897/164342745-0352b8cd-cf39-4f56-9b9a-2d3c50c3785e.png">
This is a basic outline of how our CRUD functions send requests to the server and the server in turn, queries the database for the information and/or stores information in the database. The database will then send data back according to calls. The endpoints we have implemeneted are marked with a '***' below. The rest we are working on implementing full functionality by the next milestone.

---

### trails

- <b>POST /trail:</b>  This endpoint processes a request to create a new trail. It takes a name, town and description. Later we may add the ability to send image data but we are unsure how to do that for now.

- <b>GET /trail:</b>  This endpoint processes a request to read a trail. This is used by users wanting to view a specific trail via the client/trailPage.html. The user can input a URL such as ```.../trailPage.html?trail=trail-name``` and the information about the trail with that name is displayed on the page.

- <b>GET /trail/browse:</b>  When the user clicks the trails button on the homepage they will be redirected to the client/browseTrails.html which will invoke this endpoint to read some trails and display them. It expects a query with attributes town and offset. These will be used to narrow the search within the database. Offset is intended to be used to return a certain number of results on a list of pages similar to google results. The front-end for this was not foreseen and so still needs to be polished but the goal is for offset to return trails 0-10 while the user is on page 1 of results and then 11-20 on page 2, etc.

### reviews

- POST /review: Used to create an initial review. ***
- PUT /review: Used for editing the body of a review.
- GET /review?trail=___ : This endpoint returns all reviews whose trail attribute matches the given trail name in the query. ***
- GET /review?userID=__: This is used for reading all reviews associated with a user.
- DELETE /review: This endpiont removes a specified review.

### events

- POST /event: Endpoint for creating and posting an event. ***
- GET /event: Used to query a list of events.
- PUT /event: This edits a listed event. ***
- DELETE /event: Removes an existing event.

### users

- POST /user: This allows for profile creation.
- GET /user: Returns a particular user's profile.
- PUT /user: Endpoint that will be used to make edits to a user profile.
- DELETE /user: Allows a user to remove their profile.

### likes

- POST /reviewLike: Allows a user to like a review.
- GET /reviewLike: Reads a list of users who have like a review.
- DELETE /reviewLike: This endpoint will allow a user to retract their like of a review.

## Screenshots:
---

<img width="1440" alt="Screen Shot 2022-04-20 at 9 07 43 PM" src="https://user-images.githubusercontent.com/98613897/164351579-9fe63bfa-ad6b-44a3-abb4-5bf4758f3dfd.png">
This page contains a list of the trails, that we GET from our dummy DB. When one is clicked, it brings us to that trail's page, and the GET /reviews is invoked, to render the proper reviews associated with that trail.

---
<img width="1440" alt="Screen Shot 2022-04-20 at 9 01 31 PM" src="https://user-images.githubusercontent.com/98613897/164351272-2b04a556-696f-4ab9-bf6d-4dbb84260891.png">
This is a look at one of the trail pages, with its reviews rendered from the dummy DB. When Add a Review! is clicked, it opens an text box for input. Given the input, when the submit button is clicked, POST /review is used to create the review, and it is rendered.

---
<img width="1440" alt="Screen Shot 2022-04-20 at 9 04 00 PM" src="https://user-images.githubusercontent.com/98613897/164351296-d29ceb29-eb44-4428-bea0-f918df2ad81e.png">
Rendering of a newly created review at the bottom of the page - Including the review body, a star rating, and the user's name.

---
<img width="1440" alt="Screen Shot 2022-04-20 at 9 04 00 PM" src="https://user-images.githubusercontent.com/73536712/164356432-3331fa19-f120-4aa0-a048-4237735bbe44.png">

The event page contains an option for users to both update and delete an event. By clicking the 'update' button, a PUT request is invoked to update the event page made from a user. Clicking the 'delete' button will remove the event from the event page.

## Heroku App:
---

https://intense-cliffs-65617.herokuapp.com/

## Contribution Breakdown:
---
### Andrew:

  - Created server endpoints for trail page
  - CRUD operations for trail page
  - Worked on the beginnings of a database
  - Helped on flow-chart
  - Worked on writing this .md file
  - Wrote most of the basic server 
  - Heroku deployment master
  - Milestone #2 unanimous MVP
  
### David:

  - Created server endpoints for trail reviews
  - CRUD operations for trail reviews
  - Contributed to some database code
  - Helped on flow-chart
  - Worked on writing this .md file
  - Edited some of the html/css
  
### Seth:

  - //HERE
  
### Sonny:

  - Created server endpoints for events page
  - CRUD operations for events page
  - Helped on flow-chart
  - Contributed to some database code
  - Edited some of the html/css
  - Worked on the .md file
