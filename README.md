# **Telegram Bot - Setup Guide**

This guide will walk you through setting up backend of the **Telegram bot**. You will create a Telegram bot using **BotFather**, configure it with the app, and run the project locally.

## **Prerequisites**

Ensure you have the following installed before proceeding:

- **Node.js**
- **Ngrok** (for secure tunneling)
- A **Telegram account**

---

## **1. Create a Telegram Bot**

1. Open Telegram and search for **BotFather**.
2. Start a chat with **BotFather** and use the `/newbot` command to create a new bot.
3. Follow the instructions to set the bot's name and username.
4. After the bot is created, save the **Access Token** provided by **BotFather**.

---

## **2. Project Setup**

### **2.1 Clone the Project**

First, clone the repository and navigate to the project directory:

```bash
git clone https://github.com/Talha089/project
```

## **3. Backend Setup**

### **3.1 Install Dependencies**

Install all required packages:

```bash
npm install
```

### **3.2 Configure the Telegram Bot**

Run the following command to configure your Telegram bot:

```bash
npm run configbot
```

You will be prompted to provide:

- The **Access Token** from **BotFather**.
- The **Ngrok URL** for your Bot (generated in step 3.4).

### **3.3 Run the Backend in Development Mode**

Start the backend server on port 4000:

```bash
node index.js
```

The backend will be accessible at `http://localhost:4000`.

### **3.4 Ngrok Setup for Backend**

To expose your local backend server to the internet, run **Ngrok**. Replace `your-ngrok-domain` with your actual domain:

```bash
ngrok http --domain=your-ngrok-domain 4000
```

This will generate a public URL to share.

---

## **5. Access the App on Telegram**

Once the backend running:

1. Open Telegram.
2. Search for your bot’s username.
3. Start interacting with the **TON Tap** app through the chat interface.

---

This guide should help you successfully set up and run the **Telegram Bot** app.
