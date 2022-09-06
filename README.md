
# Vet Clinic App

This app represents virtual vet clinic. It contains list of all patients includes their age, name, specie, owner data and date of previous and next vaccination.
Virtual Vet Clinic allows you to to some basic operations like:
- adding new pet,
- removing pet from the list,
- searching for a pet by its name, specie etc.
- vaccinating - it sets todays date as previous vaccination, and one year later as next vaccination.

In addition field next vaccination shows time left to next visit:
- white background - more than 30 days
- yellow background - less than 30 days
- red background - less than 7 days
All of above informations are available to read when you put mouse pointer on next vaccination field.



## Demo

**In case of non-authorized access it is asked not to use inappropriate words in application.**

https://piotrb.networkmanager.pl/
## Run Locally

Prepare your local server e.g. XAMPP. And database e.g. HeidiSQL, DBeaver.

Clone the projects

- Server
```bash
  git clone https://github.com/PiotrB95/VetClinicBackend
```
- Client
```bash
  git clone https://github.com/PiotrB95/VetClinicFrontend
```

Go to the project directory

```bash
  cd VetClinicBackend
```

```bash
  cd VetClinicFrontend
```

Install dependencies

```bash
  npm install
```

Start the server via script in package.json
```bash
  start:dev 
```

Start the client via script in package.json
```bash
  start
```
## Environment Variables

To run this project, you will need to add the following environment variables to your config.ts file

```bash
export const config = {
    dbHost: *yourDbHost*,
    dbUser: *yourDbUser*,
    dbPassword: *yourDbPassword*,
    dbDatabase: *yourDbName*,
    corsOrigin: 'http://localhost:3000',
}
```
The file named **baza.txt** contains database structure prepared for this application.\
It can be also imported via HeidiSQL to automatically create DB. 
## API Reference


*pet*
____
  #### Request

| Path                                 | Method   | Description                                         | Params               
| :----------------------------------- | :------- | :-------------------------------------------------- | :------------------------------- 
| `/search`                            | `GET`    | Allows to find all pets.                            | - 
| `/search/:searchValue?`              | `GET`    | Allows to find specific pet by param.               | searchValue     
| `/:id`                               | `GET`    | Allows to find one pet.                             | id       
| `/`                                  | `POST`   | Allows to add pet.                                  | **PetRecord**
| `/:id`                               | `DELETE` | Allows to remove pet.                               | id   
| `/:id/:lastVaccinate/:nextVaccinate` | `PATCH`  | Allows to set previous and next data of vaccination | id, lastVaccinate, nextVaccinate             

**PetRecord** structure:
```bash
id: string;
petName: string;
petType: string;
petAge: number;
ownerName: string;
ownerPhone: number;
lastVaccinate: string;
nextVaccinate: string;
```
## Authors

- [@piotrb95](https://github.com/PiotrB95)


## Tech Stack

**Client:** React, HTML, CSS

**Server:** Node, Express

