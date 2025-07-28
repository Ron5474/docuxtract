# PDF to JSON WebApp

A sleek and simple web application that allows users to upload PDF files and returns their contents in structured JSON format.

🔗 **Live Site**: [pdf.johnnybravoscloud.com](https://pdf.johnnybravoscloud.com)

---

## 🚀 Features

- 📄 Upload any PDF file
- 🧠 Extracts content and presents it as structured JSON
- ⚡ Powered by Google Gemini for document understanding
- 🌐 Live and local deployment support
- 💡 Easy to use and developer-friendly

---

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Set Up Environment Variables

Create a `.env` file inside the `microservice/DocumentService` directory with the following content:

```env
GOOGLE_GEMINI_KEY=your_google_gemini_api_key
```

> 🔑 You can obtain your Gemini API key from the [Google AI Developer Console](https://makersuite.google.com/app/apikey).

### 3. Install Dependencies

At the root of the project, run:

```bash
npm run installs
```

This command installs all necessary dependencies for both the frontend and backend services.

### 4. Build the Project

```bash
npm run build
```

This compiles and prepares all necessary files for running the app.

### 5. Start the Development Server

```bash
npm run start
```

Your app will now be accessible at:

```
http://localhost:3000
```

---

## 🧪 Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express
- **PDF Parsing & AI**: Google Gemini API
- **Deployment**: Nginx, Docker

---

## 📄 Example JSON Output

After uploading a PDF, the response might look like:

```json
{
  "title": "Sample PDF",
  "pages": [
    {
      "page": 1,
      "content": "This is the first page of the PDF..."
    },
    {
      "page": 2,
      "content": "This is the second page..."
    }
  ]
}
```

---

## 📬 Contact

For questions, feedback, or suggestions, feel free to open an issue or reach out.

---

---
## Future Improvements
- I will add CI/CD so that development is easier.
- Add a Side By Side where User can highlight pdf and the same portion of JSON is highlighted.
---


Made with ❤️ by Ronak Patel
