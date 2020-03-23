/////////////////------------------------------------------------------------/////////////////
Real time web application Portfolio: 
Create a text based web game using node.js
The repo is based on heroku tutorial nodejs server.
/////////////////------------------------------------------------------------/////////////////
Ignore the following scripts (Test scripts) in the repos:
____Heroku____
index.ejs
header.ejs
nav.ejs
db.ejs
lang-logo.png
node.svg
main.css
______________
routes.js // Not router.js this one is used ;-)
test.js
testserver.js
MongoDataBase.js
moment.js // libary to make timestamps
/////////////////------------------------------------------------------------/////////////////
Current development stage 23-03-2020:
Able to register user with mongodb (Currently using local DB)
Able to communicate in real time chat (Public chat)
Able to switch rooms and get associated room obj (There are only 2 rooms)
More less able to set state for player from highscore.json (Current character "database")
Not able to get the users unique state. (I think i'm getting the object the wrong way from the socket) 
(e.g. Currently changing one players HP also changes other players HP, given they are in the same room)
Next step in development after fixing above:
Save players state if player disconnects or writes command quit.
Create game logic commands for the user.
/////////////////------------------------------------------------------------/////////////////
