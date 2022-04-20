# Milestone #2

## APIs:
---

### trails

- <b>POST /trail:</b>  This endpoint processes a request to create a new trail. It takes a name, town and description. Later we may add the ability to send image data but we are unsure how to do that for now.

- <b>GET /trail:</b>  This endpoint processes a request to read a trail. This is used by users wanting to view a specific trail via the client/trailPage.html. The user can input a URL such as ```.../trailPage.html?trail=trail-name``` and the information about the trail with that name is displayed on the page.

- <b>GET /trail/browse:</b>  When the user clicks the trails button on the homepage they will be redirected to the client/browseTrails.html which will invoke this endpoint to read some trails and display them. It expects a query with attributes town and offset. These will be used to narrow the search within the database. Offset is intended to be used to return a certain number of results on a list of pages similar to google results. The front-end for this was not foreseen and so still needs to be polished but the goal is for offset to return trails 0-10 while the user is on page 1 of results and then 11-20 on page 2, etc.

### reviews

- GET /review?trail=___ : this endpoint returns all reviews whose trail attribute matches the given trail name in the query

### events


## Screenshots:
---
//HERE


## Heroku App:
---
//HERE


## Contribution Breakdown:
---
### Andrew:
  - //HERE
### David:
  - //HERE
### Seth:
  - //HERE
### Sonny:
  - //HERE
