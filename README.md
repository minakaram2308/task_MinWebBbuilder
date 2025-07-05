# 🧩 Mini Website Builder

**Mini Website Builder** is a dynamic visual editor built with Next.js and Zustand. It allows you to create mini websites by adding, editing, removing, and reordering sections — all stored locally or exported as JSON.

---

## 🚀 Getting Started

First, install dependencies:

```bash
npm install
```

Then, start the development server:

```bash
npm run dev
```

Open your browser at [http://localhost:3000](http://localhost:3000) to view the app.

---

## ⚙️ Features

- 🧱 **Section Library** – Add pre-built sections
- ✏️ **Live Editing** – Modify section content in real time
- 🧼 **Remove Sections** – Easily remove unnecessary blocks
- 💾 **Save to Local Storage** – Persist changes between sessions
- 📂 **Load from Local Storage** – Restore saved layouts
- 📤 **Export JSON** – Download your design as `.json`
- 📥 **Import JSON** – Upload a layout from a file
- 🛎 **Notifications** – Clean feedback with react-hot-toast
- 🎨 **Responsive Design** – Built with Tailwind CSS for modern UI

---

## 🛠 Tech Stack

- **Next.js (App Router)** – React framework with routing and SSR
- **Zustand** – Global state manager for managing sections
- **Tailwind CSS** – Utility-first CSS framework
- **react-hot-toast** – Toast notifications
- **TypeScript** – Static typing for better DX

---

## 📁 Project Structure

```
app/
│
├── components/
│   ├── Controls.tsx           # Save, load, import, export
│   ├── Preview.tsx            # Live preview of layout
│   ├── SectionLibrary.tsx     # Available sections to add
│   └── SectionRenderer.tsx    # Renders each section with editing
│
├── store/
│   └── builder.ts             # Zustand store for sections
|   └── types.ts               # types definition
│
├── page.tsx                   # Main page
└── globals.css                # TailwindCSS
```

---

## 📦 JSON Export Format

When you click **Export**, your current section layout is saved as a downloadable `site-builder.json` file.

**Example:**

```json
[
  {
    "id": "abc123",
    "title": "Hero Section",
    "description": "Main heading here",
    "image": "https://example.com/image.png"
  }
]
```

Use the **Import JSON** button to load a previously saved file.

---

## 🧪 Notes

- The builder uses `localStorage`, so ensure your browser supports it
- State is managed using unique section IDs via `nanoid`
- Controlled inputs ensure reactive updates and editing

---

## 🚀 Live Demo

Check out the live demo of the Mini Website Builder:

**🌐 [Live Demo](https://mini-website-builder-demo.vercel.app)**

Try the app online and experience all the features without any setup required!

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Zustand Docs](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Hot Toast](https://react-hot-toast.com/)