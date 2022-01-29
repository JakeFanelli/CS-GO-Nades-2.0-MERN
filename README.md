# **Live demo:** https://csgo-nades.herokuapp.com/


### If running locally - few things to change.

Server.js - Remove link 23 where we enforce HTTPS
<br>
helpers.js - change line 5 to "http://localhost:4000";

**Example variables.env file**
<br>
DATABASE=mongodb+srv://dbusername:dbpassword@dbhostname/dbname?retryWrites=true -- conn string
<br>
SECRET=someSecret -- express session secret
<br>
KEY=someKey -- express session key
<br>
user=email address -- nodemailer
<br>
pass=password -- nodemailer


### DB tables
**nades**
**sessions**
**users**
