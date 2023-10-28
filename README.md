## Tech4Med Project

An `Apollo Server` and `NextJS` application

## ⚡️ Install

```bash
# Run the install
npm install
```

## 🏔️ Environment

```bash
# .env client
APOLLO_PORT=4000
APOLLO_SERVER_URL=http://localhost
# .env server
APOLLO_PORT=4000
APOLLO_SERVER_URL=http://localhost
MONGO_URL=
DATABASE_NAME=Tech4Med
```

## 📟 How to Run

```bash
npm run server:dev # run the server locally
npm run client:dev # run the client locally
```

## 🛠️ Tooling

#### Seeding the database

- The `project.json`, `device.json` and `user.json` data source files that were supplied live in `_seeds`
- We can dump those into our mongo database with the following command:

```bash
npm run server:seed
```

## ✅ Todo list

#### Items

- [ ] Add typings with [graphql-codegen](https://www.apollographql.com/docs/react/development-testing/static-typing/).
- [ ] Add a way to browse `devices` and `users`
