## Chatroom with nodeJs and Mongodb and ReactJs

### This chatroom using nodeJs and mongodb for server and ReactJs for the client side and also uses Socket.io and hashes password and use json web token for authentication

### You should have mongodb installed

## For using a local database do the following

### In server/db folder the connect argument should be like this ```mongoose.connect(process.env.MONGO_LOCAL_CONN_URL, { useNewUrlParser: true });``` 

### You should create a database named chatroom in mongodb and in that database should create two collections named "rooms" and "users"

### If you are using the compass user interfact after connecting click on the "CREATE DATABASE" and in the oppened modal set the database name to "chatroom" and set the collection name to one of mentioned above, after creating the data base by clicking on the "+" on database create the other collection

### If you use mongo shell after running the `mongod` and `mongo` type this `use chatroom` and then `db.createCollection("rooms")` and `db.createCollection("users")`

## For using the live ATLAS database do this

### In server/db folder the connect argument should be like this ```mongoose.connect(process.env.MONGO_ATLAS_CONN_URL, { useNewUrlParser: true });``` 

### To start server use `yarn dev` in server directory

### To start client use `yarn start` in client directory

### To change the `default room name` and `port number` and `secret code` change `.env` file

### At first the start page will be shown

![](./start.PNG "Start page")

### After clicking on start button, The login page will be show. If user select the remember me checkbox the session won't be destroyed when closing the browser tab and the user will stay signed in

![](./login.PNG "Login page")

### If the user are a new user the user should register with a unique email address. At first the user will have a default username and avatar that the user can change later in the profile page.

![](./register.PNG "Register page")

### After login the chatroom will be shown and by default the user will join the default Global room

![](./chat.PNG "chat page")

![](./chatting.PNG "chating page")

### The user can join or leave other rooms or the user can create new rooms

### The users can have private chat that should be approved by the receiver first

![](./private.PNG "private page")

### In the profile page the user can change their avatar, unique username or password

![](./profile.PNG "profile page")
