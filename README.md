### Clone and  the run below command to install packages
```
npm install
```

### open constants.js file and change database user and password.
```
let DATABASE_USER = "root";
let DATABASE_PASSWORD = "arun";
```
replace "root" & "arun" with your username and password

### First time to create database & tables & insert websites to websites table
```
node db.js
```


### start scarping
```
node scrap.js
```

### Admin panel

```
change host, user, pass, db on scrap_crop_details/admin/c-database.php

open /scrap_crop_details/admin/index.php to view scraping details website wise
```