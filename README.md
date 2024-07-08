# [DisDis](https://dis21.up.railway.app/servers/185ec944-c8f8-4a84-a690-5fa629581376/channels/75f67997-6070-432c-b456-17db3a524d91) (Discord-clone)

Welcome to the **DisDis** chat app repository! This project is a training application built using Next.js, designed to help people comuncate with each other.

## Table of Contents

- [Getting Started](#getting-started)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Contributing](#contributing)

## Getting Started

### Live Demo

Check out the live version of the app [here](https://dis21.up.railway.app/servers/185ec944-c8f8-4a84-a690-5fa629581376/channels/75f67997-6070-432c-b456-17db3a524d91).

### Running Locally

To get a local copy of this project up and running for development or testing purposes, follow these simple steps:

1. Clone the repository:
   ```
   git clone https://github.com/aboAliAhmed/DisDis.git
   ```
2. Install the dependencies:
   ```
   cd DisDis
   ```
3. Clone the repository:
   ```
   npm install
   ```
   or if you use yarn:
   ```
   yarn install
   ```
4. Start the development server:
   ```
   npm run dev
   ```
   or if you use yarn:
   ```
   yarn dev
   ```
   Open http://localhost:3000 with your browser to see the result.

## Usage

### Creating an Account

1. Navigate to the live demo or your local instance.
2. A sign up form appears you can sign up or login by google or enter the email and password and then you need to verify your email adress.

### Managing Servers

1. After logging in, you can create a new server by seting a name and image avatar for the server then click on create server button.
2. You can invite people to your server by sending them an invite link.
3. Manage server members by assigning roles
4. you can kick members if necessary.

### Managing Channels

1. Within a server, you can create channels by clicking the "Create Channel" button.
2. Set the cannel name and choose its type (text, audio, video).
3. You can edit or delete channel as needed.

### Sending Messages

1. Navigate to a text channel within a server.
2. write your message or uplod Photo or file in the input field and press "Enter" to send.
3. You can edit or delete your messages by clicking on the respective options.

### Video/Audio calls

1. Click on video or Audio channel and the you can start call channel members

## Features

- **User Authentication**

  - Sign up, login, and logout functionality.

- **User Profiles**

  - Create and edit user profiles.
  - View other users' profiles.

- **Server**

  - Create, edit and delete server
  - Invite people to the server
  - Invite and kick member
  - Change the role of the member [Guest, Moderator, Admin]

- **Channel**

  - Create channel for text, audio or vedio messages
  - Update and delete channel
  - Send, edit or delete messages

## Technologies Used

- Next.js
- TypeScript
- Postgresql
- Tailwind-CSS
- Clerck
- Shadcn-UI
- Socket.io

## Project Structure

DisDis/
├── app/
│ ├── (auth)/
│ │ └── (routes)/
│ │ ├── sign-in/
│ │ │ └── [...sign-in]/
│ │ │ └── page.tsx
│ │ ├── sign-up/
│ │ │ └── [...sign-up]/
│ │ │ └── page.tsx
│ │ └── layout.tsx
│ ├── (invite)/
│ ├── (main)/
│ ├── (setup)/
│ └── api/
├── components/
├── hooks/
├── lib/
├── pages/
├── prisma/
└── public/
 
## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request
