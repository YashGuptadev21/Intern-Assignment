# Internship Assignment - The Interactive India Data Map

### Objective - A full-stack application that visualizes real socio-economic data for Indian states and allows user interaction.

## Steps to run server

1. Open the project in any VScode editor.
2. Navigate into the server directory `cd server`.
3. Run `npm i` or `npm install` to install the packages.
4. Run `npm run dev` to start the server.

If configured correctly, you should see a message indicating that the server is running successfully and `Database Connected`.

## Steps to run client

1. Navigate into the client directory `cd client`.
2. Run `npm i` or `npm install` to install the packages.
3. Run `npm run dev` to run the app on `http://localhost:5173`.
4. Open `(http://localhost:5173)` to view it in your browser.

# Run this using Docker (Bonus)

## Client

1. cd client
2. docker build -t client .
3. docker run -p 5173:5173 client
4. Open `(http://localhost:5173)` to view it in your browser.

## Server

1. cd server
2. docker build -t server .
3. docker run -p 3000:3000 server
