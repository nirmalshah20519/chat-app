# Quick Chat

Quick Chat is a real-time chat application where users can register, log in, explore friends, send friend requests, accept requests, and chat in real time. The app is currently live at [Quick Chat](https://chat-app-jade-eta.vercel.app/).

## Features

- **Register**: New users can create an account by registering with their details.
- **Login**: Existing users can log in with their credentials.
- **Explore Friends**: Users can search for other users and explore new friends.
- **Send Requests**: Users can send friend requests to other users.
- **Accept Requests**: Users can accept friend requests and build their friends list.
- **Real-Time Chat**: Users can chat with their friends in real time.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **API**: REST API

## Screenshots

### 1. Registration Screen

![Registration Screen](<screenshots/Screenshot%20(127).png>)
Description: A simple form for new users to register by entering their details like name, email, and password.

### 2. Login Screen

![Login Screen](<screenshots/Screenshot%20(125).png>)
Description: A form for existing users to log in using their email and password.

### 3. Explore Friends Screen

![Explore Friends Screen](<screenshots/Screenshot%20(129).png>)
Description: A screen where users can explore and search for new friends.

### 4. Send Friend Request Screen

![Send Friend Request Screen](<screenshots/Screenshot%20(130).png>)
Description: A screen to send a friend request to another user.

### 5. Accept Friend Request Screen

![Accept Friend Request Screen](<screenshots/Screenshot%20(131).png>)
Description: A screen where users can accept friend requests.

### 6. Chat Screen

<div style="display: flex; justify-content: space-between ; align-items: center; gap: 0px;">

  <div style="flex: 1; text-align: center;">
    <img src="screenshots/WhatsApp Image 2024-09-01 at 01.12.39_e45e378f.jpg" alt="Phone Chat Screen" style="height: 600px;"/>
  </div>

  <div style="flex: 1; text-align: center;">
    <img src="screenshots/WhatsApp Image 2024-09-01 at 01.12.40_6c130f53.jpg" alt="Phone Chat Screen" style="height: 600px;"/>
  </div>
</div>
<p style="height:80px;"><p/>

![Accept Friend Request Screen](<screenshots/Screenshot (139).png>)
## How to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/quick-chat.git
   cd quick-chat
   ```
2. **Install dependencies for both the backend, socket and frontend:**:
   ```bash
    cd server
    npm install
   ```
   ```bash
   cd socket
   npm install
   ```
   ```bash
   cd frontend
   npm install
   ```
3. **Set up environment variables:**
   Create a .env file in the backend directory and add the following variables:
   ```env
    MONGO_URI=<your_mongodb_connection_string>
    JWT_SECRET=<your_jwt_secret>
    PORT=<your_backend_port>
   ```
4. **Run the application:**

- Start the backend server:
  ```bash
  cd server
  nodemon server.js
  ```
- Start the socket server:
  ```bash
  cd socket
  nodemon index.js
  ```
- Start the frontend:
  ```bash
  cd frontend
  npm start
  ```

## Contact

For any inquiries or feedback, please contact [nirmalshah20519@gmail.com](mailto:nirmalshah20519@gmail.com).

```javascript
// Replace `your-username`, `your_mongodb_connection_string`, `your_jwt_secret`, `your_backend_port`
// with your actual details.
```
