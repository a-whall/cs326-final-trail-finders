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
attendee of a listed event, or even to add a new trail listing in which they can upload photos of the trail. Users may change their password for login 
or delete their account any time they wish.

---
Team Members:

### Andrew Hall - a-whall
### David Thibodeau - dpthibodeau
### Sonny Mei - sonny-bit

---

User Interface:


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
| time | String | Time of the event |
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
- Clicking to 'Attend Event'
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




