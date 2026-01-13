# KB Steel & Furniture - AI Design Studio

This is the official AI-powered application for KB Steel & Furniture. It allows customers to view designs, customize them using AI, and book orders.

## 🚀 How to Launch (Deployment Steps)

### 1. GitHub Setup
- Create a new repository on GitHub named `kb-steel-app`.
- Upload all the files from this project into that repository.

### 2. Get Google Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/).
- Click **"Get API Key"** and copy your key.

### 3. Deploy to Vercel
- Go to [Vercel.com](https://vercel.com/) and connect your GitHub account.
- Import the `kb-steel-app` repository.
- **IMPORTANT:** Before clicking "Deploy", go to **Environment Variables**:
  - **Key:** `API_KEY`
  - **Value:** Paste your Google Gemini API Key here.
- Click **Deploy**.

### 4. Admin Access
- Once the app is live, open it in your browser.
- Go to the **Login** page.
- Enter **000** as the phone number to access the **Admin Panel**.
- In the Admin Panel, set your **Bank Details** and **Shop Timing**.

## ✨ Features
- **AI Design Studio:** Customers can generate new gate/furniture designs via text prompts.
- **WhatsApp Integration:** Direct orders to the owner's WhatsApp.
- **Admin Control:** Manage orders, track market rates, and update shop info.
- **PWA Ready:** Can be installed on Android/iPhone as a home screen app.

Developed with ❤️ for KB Steel & Furniture.
