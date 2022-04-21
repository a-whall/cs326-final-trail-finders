# Steps to Building Valley Trail Finder app:

To run the server locally:

1. clone the repo

2. npm install

3. npm start

4. enter URL into browser: http://localhost:3000/homepage.html

5. from there you can navigate around the site

Note: we recommend running the app in chrome or firefox.

# Steps to deploy to heroku

1. have the repo cloned
```bash
2. npm run deploy
```

3. cd deploy

4. choose heroku app to deploy to (heroku create to make a new one)

5. heroku git:remote -a app_name

6. git add .

7. git commit -m "deploy"

8. git push heroku master

9. heroku open