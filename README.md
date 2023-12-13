# save-my-notes-app

 Save My Notes is a user-friendly application that empowers users to effortlessly create, modify, and delete personalized **post-it notes** (written in paragraphs or bullet points).

The app is coded in **Typescript** with a back-end in Node(**Express**) and a front-end in **Vue**.

# BACK-END

The back-end is coded in **Express** (using Object Oriented Programming) with a **Sequelize ORM**, based on an **SqlLite** database.

**Prerequisites**

The back-end requires node ```20.8.0``` and npm ```10.1.0```

**Installation and launch**

1. Clone the whole repository

2. Go to the back-end folder

3. Install dependencies

```
$ npm install
```

4. Copy the content of the ```.env.template``` in a local ```.env``` file and replace the PORT with the back-end port and the ALLOWED_MAIN_ORIGIN with the front-end client url

```
PORT=
ALLOWED_MAIN_ORIGIN=
```

5. Launch the server
```
$ npm run dev
```

**API Ressources**

- **GET api/note** : get all the notes
- **POST api/note/add-note** : add a note
- **PUT api/note/update-note** : update a note
- **DEL api/note/delete-note** : delete a note

# FRONT-END

The front-end is coded in **Vue**.

**Prerequisites**

The front-end requires vue ```3.3.4``` and npm ```10.1.0```

**Installation and launch**

1. Clone the whole repository (if you haven't dont it yet)

2. Go to the front-end folder

3. Install dependencies

```
$ npm install
```

4. Copy the content of the ```.env.template``` in a local ```.env``` file and replace the VITE_VUE_APP with the front-end port and the VITE_VUE_APP_API_URL with the back-end server url (http://<port_number>/api/note)

```
VITE_VUE_APP=
VITE_VUE_APP_API_URL=
```

5. Launch the server
```
$ npm run dev
```