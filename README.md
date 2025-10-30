# 🌳 JSON Tree Visualizer (React + React Flow)

### 📅 Submission Date: 30/10/2025  
**Author:** Ayush Jaiswal  
**Project Title:** JSON Tree Visualizer  

---

## 📝 Project Overview

This project is a **JSON Tree Visualizer** built using **React** and **React Flow**.  
It allows users to input JSON data, validate it, and visualize the structure as a connected node tree with color-coded node types.  
The application also includes search functionality, responsive design, and dark/light theme support.

---

## ✅ Functionalities Implemented

### 1. 🧩 JSON Input & Validation
- Added a **text area** for users to paste or type JSON data.  
- Implemented **JSON validation** — displays error messages for invalid input.  
- Included a **sample JSON placeholder** for quick testing.  
- Displays a clear message if the JSON format is incorrect.

---

### 2. 🌿 Tree Visualization using React Flow
- Built the **entire visualization using React Flow library** (no other graph library used).  
- Displays **JSON objects, arrays, and primitive values** as hierarchical tree nodes.  
- Parent-child relationships are shown with connecting **edges/lines**.  
- Smooth **zoom, pan, and fit view** controls implemented for navigation.  
- On hover, shows **node information** such as path and value.

---

### 3. 🔍 Search Functionality
- Implemented a **search bar** that accepts **JSON path syntax** (e.g., `$.user.name`, `items[0].id`).  
- If a match is found:
  - The corresponding node is **highlighted**.  
  - The view **automatically pans and centers** to the matched node.  
- If no match is found, a **“No match found”** message is displayed.  

---

### 4. 🎨 Color Functionality
- Each node type has its **own color scheme**:
  - **Objects:** Blue/Purple  
  - **Arrays:** Green  
  - **Primitives:** Orange/Yellow  
- Highlighted nodes use a **distinct glowing border** for clarity.  
- Color styles are dynamically applied using React Flow’s node style props.

---

### 5. 🌗 Responsive Dark/Light Mode
- Added **dark and light theme support** throughout the app.  
- The selected theme is **saved in `localStorage`**, so it remembers user preference.  
- Layout is **fully responsive** and works seamlessly on desktop, tablet, and mobile screens.  

---

## 🛠️ Tech Stack Used
- **Frontend:** React 18  
- **Visualization:** React Flow  
- **Styling:** Tailwind CSS / CSS Variables  
- **Language:** JavaScript (ES6+)  

---

## ⚙️ How to Run Locally

```bash

git clone [your-repo-link]


cd json-tree-visualizer

npm install


npm run dev
