Title:  
# Valley Trail Finder
---
Semester:
## Spring, 2022
---

Overview:

Our group's app is one which is targeted for outdoorsy, adventure-seekers who like to hike, walk, or bike trails in the western Massachusetts area.
A user can browse listed trails, read reviews of those trails, and see events/meetups which are happening at any of those trails. Users can sign up for 
an account which will allow them to participate in adding their own reviews, liking other reviews, post their own events/meetups, add themselves as an 
attendee of a listed event, or even to add a new trail listing in which they can upload photos of the trail. Users may change their password for login or delete their account any time they wish.

---
Team Members:

### Andrew Hall - a-whall
### David Thibodeau - dpthibodeau
### Sonny Mei - sonny-bit

---

User Interface:

- Home page
  - `Account` dropdown box shows login inputs for username and password, as well as the `Log In` button. A link to the create profile page is also visible, for new users. This box will have a `Manage Account` link to the manage account page and a `Log Out` button when a user is logged in.
  - `Trails` link to browse trails page
  - `Events` link to browse events page
  - <img width="1440" alt="Screen Shot 2022-05-06 at 3 56 56 PM" src="https://user-images.githubusercontent.com/98613897/167209182-f5d3abc9-5cec-440b-ae39-3cff94cc5b94.png">
- Register page
  - input boxes for username, password, and password verification (passwords must match)
  - `register` button to submit the new account to be created
  - link to go back to home page
  - <img width="1440" alt="Screen Shot 2022-05-06 at 4 00 14 PM" src="https://user-images.githubusercontent.com/98613897/167209642-a90ed6cd-700f-44d1-af87-5041650aa461.png">
- Manage Account page (may only access if authenticated)
  - input boxes for updating password
  - `Change Password` button to submit change
  - `Delete Account` button to remove a user
  - `Home` link to home page
  - `Trails` link to trail browse page
  - `Events` link to browse events page
  - <img width="1440" alt="Screen Shot 2022-05-06 at 3 57 32 PM" src="https://user-images.githubusercontent.com/98613897/167209716-7f795e2c-5095-46fd-8b57-b0a33093b56b.png">
- Trails Browse page
  - `Home` link to home page
  - `Events` link to browse events page
  - links to each of the individual trail pages
  - numbered links at bottom, to see more trail listings
  - <img width="1440" alt="Screen Shot 2022-05-06 at 3 57 48 PM" src="https://user-images.githubusercontent.com/98613897/167209761-bfae4371-4164-47d5-9eb5-4ec669686c28.png">
- Create a Trail page
  - input/upload boxes to add trail info
  - `Done!` button to submit new trail info for creation
  - <img width="1440" alt="Screen Shot 2022-05-06 at 4 10 01 PM" src="https://user-images.githubusercontent.com/98613897/167209915-a723c753-4977-4a96-a96f-94b5f54a031f.png">
- Trail page
  - trail info
  - reviews on trail
  - ability to like a review (if authenticated)
  - `Add a Review!` dropdown to enter review information (must be authenticated)
  - `Find Event` button to find event listings tied to that particular trail
  - `Add Event` button to create a new event listing for a trail (must be authenticated)
  - `upload image` button to upload new pictures of that trail
  - <img width="1440" alt="Screen Shot 2022-05-06 at 3 58 50 PM" src="https://user-images.githubusercontent.com/98613897/167209996-b0b4d50b-a364-49b6-b9d8-db86cc476639.png">
- Events Browse page
  - all event listings
  - `Home` link to home page
  - `Trails` link to trail browse page
  - `Create Event` button navigates to create event page (must be authenticated)
  - links to each individual event page
  - selection to sort events by date or name of associated trail
  - <img width="1440" alt="Screen Shot 2022-05-06 at 4 00 01 PM" src="https://user-images.githubusercontent.com/98613897/167210047-ce1d0b3f-d6f2-40d4-a854-3fceb862d228.png">
- Create Events page
  - After filling out the required info in the webpage, users can click `Create Event` to create their own events. 
  - If users cannot find the corresponding trails to their event, they can click on the URL text `Can't find your trail? Add one here!` link to create a trail page
  - `Home` link to home page
  - `Trails` link to trail browse page
  - `Events` link to browse events page
  - <img width="1440" alt="Screen Shot 2022-05-06 at 3 59 03 PM" src="https://user-images.githubusercontent.com/98613897/167210138-586ad762-3b4a-40e4-acfb-901362a3a184.png">
- Events page
  - `Learn more about the Trail!` button navigates user to that trail's page.
  - `Delete Event` button deletes a user's event
  - `Home` link to home page
  - `Trails` link to trail browse page
  - `Events` link to browse events page
  - `Delete Event` button removes the event listing (only if authenticated user matches event host)
  - <img width="1440" alt="Screen Shot 2022-05-06 at 4 00 49 PM" src="https://user-images.githubusercontent.com/98613897/167210219-5c1e6288-1883-457c-953f-c946f99a38b3.png">

---

APIs:


___

Database:

trails table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| name | String | The name of the trail |
| town | String | The name of the trail's town |
| description | String | Description/Info on the trail |

trail_images table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| name | String | The name of the trail |
| filetype | String | The filetype of the trail images |
| image | String | The image data stored as a string base 64 |

events table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| eid | Integer | A unique id for each event. Primary Key of the table |
| title | String | A title for the event |
| date | String | Date of the event |
| starttime | String | Start time of the event |
| endtime | String | End time of the event |
| meetup | String | Meetup location for the event |
| username | String | Username of the user who created the event |
| description | String | Description of the event |
| trail | String | Trail associated with the event |
| filetype | String | The filetype of the trail images |
| image | String | The image data stored as a string base 64 |

reviews table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| username | String | Username of the user who created the review |
| trailname | String | Trail associated with the review |
| body | String | Description of the review |
| starcount | Integer | Starcount of the review (from 1 star to 5 star) |
| likecount | Integer | Likecount of the review |

user_info table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| username | String | Username of the user |
| password | String | Password of the user |

---

URL Routes/Mappings:

<img width="775" alt="Screen Shot 2022-05-07 at 12 51 15 PM" src="https://user-images.githubusercontent.com/98613897/167264099-10e7bc41-3947-46d5-90e6-031634899066.png">


---

Authentication/Authorization:

We used Passport to implement our authentication. A user will login on the homepage, entering a username and password. The username is a primary key in
its corresponding database table, so usernames will be unique. If a user does not have an existing account, they can click a button to sign up, which
will then navigate them to a page to create one - after which, they will be prompted to return to the home page to sign in. The sign in button will query
the database and check for a match between a username and password, after which, if there exists a match, the user will be authenticated. Certain functionality
is restricted to authenticated users, as we have added a `checkLoggedIn` method and `isAuthenticated` method to our server class, and restricted certain routes
to having to perform this check. The functionality which is restricted to authenticated users is as follows:

- Creating new trails (including uploading trail images)
- Adding a trail review
- Liking a review
- Creating an event listing
- Updating an account password
- Deleting an account

---

Division of Labor:


---

Conclusion:

  This was an overall great learning experience for all of us. There was a bit of stress involved, but it ultimately was overcome, and we produced a final
app which we can feel proud of and take some valuable experience from. Our initial plans were a bit more ambitious than the final result, as there were
some hurdles encountered and refactoring that had to be done along the way. We ended up having to do this entire project with three team members, as one
was not participatory in any meaningful sense. This caused us to have to cut out some of our originally planned functionality with user profiles and a 
user's interaction with trail pages and the events page, and simplify our project to be more realistic for a team down one member. This was disappointing,
but a valuable lesson in how to overcome and work together to make adjustments. All of us were either relatively or completely new to designing UI,
implementing server/DB interaction, implementing authentication, utilizing postgreSQL,  and to using SQL to query and interact with a database. All of
us were also new to the use of tools such as Heroku, pgAdmin, and GitHub repositories, which were essential (however frustrating they were at times) to
being able to collaboarate, test our work, and ultimately deploy our app. We would say that from the very beginning, there was some major apprehension
in making our commits and merges on GitHub, for fear of not wanting to create issues with the existing work and lose progress. As we went further into
the project, most of these apprehensions subsided, and we became more comfortable and confident. We all had different styles of working (e.g. night owls
vs. early birds, making frequent smaller commits vs. less frequent but larger commits, differing coding styles, etc.), but were able to become comfortable
with compromising for the sake of commonalities. Many of the issues we encountered seemed to come along with the cross-platform steup that was necessary
to develop our app. Being more comfortable and having previous exposure to being able to tie together our IDE, the browser, Heroku, and pgAdmin would have
alleviated a lot of the hang-ups. We realized that understanding how to use development tools can be just as (or even more) important than the actual
code that needs to be written.

  As difficult as it was for a majority of this project having one team member not participating, we believe that it gave us a good push to come together
and increase communication and combined efforts. For all of our individual differences, we did surprisingly well at avoiding conflict and disagreements.
Some group members had stronger skillsets than others, but everyone came together and gave their efforts for common goals: to create an app which we 
could be proud to say we contributed to the creation of, to learn as much as possible from the experience, and to (hopefully) earn a good grade in this
course. We believe our efforts will have paid off to achieve all three of those goals!




