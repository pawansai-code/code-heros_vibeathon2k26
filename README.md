# Emergency Response System

A standalone React + Tailwind CSS emergency dashboard with AI analysis and live tracking.

## Features

- **AI Analysis**: Uses Google Gemini to classify emergencies, determine severity, and provide immediate life-saving actions.
- **Live Tracking**: Visual stepper tracking the status from "Request Received" to "Resolved".
- **Pre-Arrival Instructions**: Automatic modal with critical instructions for high-severity or medical cases.
- **Evidence Upload**: Support for image/video upload for better AI analysis.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/pawansai-code/code-heros_vibeathon2k26.git
    cd code-heros_vibeathon2k26
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    - Create a `.env` file in the root directory.
    - Add your Google Gemini API key:
      ```
      VITE_GEMINI_API_KEY=your_actual_api_key
      ```
    - *Note: Without a key, the system uses a mock AI response for demonstration.*

4.  **Run the application**:
    ```bash
    npm run dev
    ```

## Tech Stack

- **Frontend**: React, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **AI**: Google Gemini API (`@google/generative-ai`)
