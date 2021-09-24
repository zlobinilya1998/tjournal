<img src="logo.png" width="100" align="right"/>

# Tjournal
### Clone project with submodules
```
git clone --recurse-submodules https://github.com/zlobinilya1998/tjournal.git
```

### Project setup
```
npm install 
```
```
git submodule foreach npm install
```

### Compiles and hot-reloads for development


#### Client
```
npm run serve
```
#### Server

##### Project have `two servers` ([nest](https://github.com/zlobinilya1998/tjournal-nest-server) and [express](https://github.com/zlobinilya1998/tjournal-express-socket)), consequently u need to run both servers

``Nest module``

##### For correct work, u need to add `.env` file in root of nest module, where `MONGO_DB` is your connection url and `JWT_SECRET` is any word  
```
npm run start:dev
```
``Express module``
```
npm run start
```
