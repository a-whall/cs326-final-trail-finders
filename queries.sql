INSERT INTO public.trails (name, town, description)
VALUES
('Rattlesnake Gutter','Leverett','Rattlesnake Gutter is a scenic boulder filled chasm, 3/4 mile long and 1/8 mile wide. The origins of the gutter are uncertain, but theories include: a subglacial meltwater channel, a tear at the site of an old geologic fault, or a spillway for a temporary proglacial lake. The Metacomet-Monadnock Trail passes near the gutter.'),
('Mount Toby', 'Leverett', 'Mount Toby, 1,269 feet (387 m), is the highest summit of a sprawling collection of mostly wooded hills and knolls that rise from a distinct plateau-like upland in the towns of Sunderland and Leverett, Massachusetts, just east of the Connecticut River. This mountain mass, part of the Metacomet Ridge geology, is oval shaped and roughly three miles by two miles wide. Although three of the subordinate peaks have names of their own (Roaring Mountain, Ox Hill, Bull Hill), none of them are noteworthy on their own, and the designation “Mount Toby” is most often used (locally and formally) to describe the entire geologic mass.'),
('Amethyst Brook Conservation Area', 'Amherst', 'This place is loved for its extensive trail network along the brook, for walking, running, and biking. You can also relax by the water, build some rock cairns on the shore line. Or bring your kids to play in the water. Dogs and their owners also enjoy the woodland trails.'),
('Taylor''s Notch', 'Hadley', 'Enjoy this 2.2-mile out-and-back trail. Generally considered a moderately challenging route, it takes an average of 1 h 13 min to complete. This trail is great for hiking, and it''s unlikely you''ll encounter many other people while exploring. Dogs are welcome, but must be on a leash.'),
('Mill River Trail','Amherst','Check out this 2.3-mile loop trail. Generally considered an easy route, it takes an average of 51 min to complete. This trail is great for hiking, trail running, and walking.'),
('Quabbin Reservoir Gates','Amherst','Enjoy this 5.6-mile loop trail. Generally considered an easy route, it takes an average of 2 h 23 min to complete. This trail is great for hiking, trail running, and walking, and it''s unlikely you''ll encounter many other people while exploring. The trail is open year-round and is beautiful to visit anytime.'),
('Bare Mountain','Amherst','Try this 1.1-mile out-and-back trail. Generally considered a moderately challenging route, it takes an average of 42 min to complete. This is a very popular area for hiking and walking, so you''ll likely encounter other people while exploring. The best times to visit this trail are April through November. Dogs are welcome, but must be on a leash.'),
('Norwottuck Rail Trail','Belchertown','Experience this 10.0-mile point-to-point trail near Northampton, Massachusetts. Generally considered an easy route, it takes an average of 3 h 34 min to complete. This is a very popular area for road biking, trail running, and walking, so you''ll likely encounter other people while exploring. The trail is open year-round and is beautiful to visit anytime. Dogs are welcome, but must be on a leash.'),
('Cole Conservation Area', 'Amherst', 'This conservation area contains easily accessed trail networks that provide short but secluded outings. Both are home to a variety of forest types, agricultural landscapes, and wetlands. Be on the lookout for wildlife such as white-tailed deer and barred owls.'),
('Pomeroy Pond', 'Amherst','This small section of the Robert Frost Trail is located on Old Belchertown Rd in Amherst. The trail runs from Old Belchertown Rd, to Pomeroy Pond, and continues on from Wildflower Drive toward Teaberry Lane. From Wildflower Drive, the trail heads south a short ways before it picks back up on the right. This last segment between Wildflower Drive and Teaberry Lane is very short, but runs behind houses on both sides of the trail, so stay on the trail as the adjacent properties are private. To skip this section you can walk across Wildflower Drive and down Teaberry Lane where the trail picks back up.'),
('Mount Holyoke Range State Park','South Hadley','Mount Holyoke Range State park features the eastern Holyoke Mountain Range, while nearby  J. A. Skinner State Park encompasses the western portion. There are a variety of forest types here, including birch-beech-hemlock and oak-hickory. You''ll also find streams, wetlands and thickets, making it even more diverse. Outdoor recreation is available year-round, with opportunities for hiking, walking, cross-country skiing, snowmobiling, and horseback riding.'),
('Sweet Alice Trail','Amherst','This town conservation land at the foot of the Mount Holyoke Range is perfect for walking, running, and cross-country skiing. Follow the trails in the Sweet Alice Conservation Area for a short, secluded walk or venture out into the Mount Holyoke Range State Park for a longer and more rigorous hike.')

CREATE TABLE public.trail_images
(name varchar(64), filetype varchar(16), image varchar(10000000))


CREATE TABLE public.reviews
(username varchar(64), trailname varchar(64), body varchar(4096), starcount integer, likecount integer)

/* ----------------- Events SQL ----------------- */
-- Table: public.events

-- DROP TABLE IF EXISTS public.events;

CREATE TABLE IF NOT EXISTS public.events
(
    eid SERIAL PRIMARY KEY,
    title character varying(64) COLLATE pg_catalog."default",
    "time" character varying(64) COLLATE pg_catalog."default",
    meetup character varying(64) COLLATE pg_catalog."default",
    username character varying(64) COLLATE pg_catalog."default",
    description character varying(1920) COLLATE pg_catalog."default",
    trail character varying(64) COLLATE pg_catalog."default",
    filetype character varying(16),
    image character varying(10000000)
);

INSERT INTO
	events(eid, title, time, meetup, username, description, trail)
VALUES
	(DEFAULT, 'Biking at the Norwottuck Rail Trail', '04/06/2022, 4pm to 7pm', 'Amherst Town', 'Amanda', 'Lets bike at the Norwottuck Rail Trail! Please bring your own bike as bikes are not provided.', 'Norwottuck Rail Trail'),
	(DEFAULT, 'Walking The Notch Trail', '04/07/2022, 4pm to 7pm', 'Northhampton', 'Joe', 'Calm walk up The Notch. Hiking boots are recommended.', "Taylor's Notch");

SELECT * FROM events WHERE eid = 1;

DELETE FROM events WHERE eid = 1;