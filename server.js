
import express from 'express';
import logger from 'morgan';
import { readFile, writeFile } from 'fs/promises';
import * as db from "./database.js";

const app = express();
const port = 3000;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static('client'));

function parse(query, ...properties) {
 for (const property of properties)
  if ( !(property in query) )
   return { error: `missing argument: ${property}` };
 return query;
}

// All API calls should go below

/*

Here is an example API call:

app.post("/users/create", async function(request, response) {
	const query = parse(request.query, "name", "username", "password", "any other fields");
	if ("error" in query) {
		res.status(400).json({error: "Query doesn't have all required paremeters"});
	} else {
		// Call associated operation in database.js
	}
});
*/


// All API calls should go above

app.listen(port, function() {
  console.log(`Server started on port ${port}.`);
});