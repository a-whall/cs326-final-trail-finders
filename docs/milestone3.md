## Database:

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

review_likes table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| poster | String | Username of the user who created the review |
| trailname | String | Trail associated with the review |
| userwholiked| String | Current user who liked the review |

user_info table
| Column | Data Type | Description |
|--------------|-----------|--------------------------|
| username | String | Username of the user |
| password | String | Password of the user |

---

## Division of Labor

  For this milestone, each of the three of us (Andrew, David, Sonny) contributed to each of the aspects of this project. We each contributed to:
  - HTML/CSS changes
  - utilizing JS functionality to dynamically create HTML elements for display on pages
  - writing CRUD functions which are called from individual pages
  - creating server routes called by our CRUD functions
  - implementing database functionality which creates and queries our tables using SQL
  - helping to implement authentication functionality in various aspects of the project
  - the writing up of all of our project documentation

