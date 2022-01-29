Live demo: https://csgo-nades.herokuapp.com/

.
.
.
.
.


If running locally - few things to change.
Server.js - Remove link 23 where we enforce HTTPS
helpers.js - change line 5 to "http://localhost:4000";

Example variables.env file
DATABASE=mongodb+srv://dbusername:dbpassword@dbhostname/dbname?retryWrites=true -- conn string
SECRET=someSecret -- express session secret
KEY=someKey -- express session key
user=email address -- nodemailer
pass=password -- nodemailer
