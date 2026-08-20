# 📄 PDFMaker

A powerful PDF creation and viewing app for Android, built with React Native and TypeScript.

## ✨ Features

- **📝 Text to PDF** — Create PDFs from text with rich formatting (Bold, Italic, Underline, Font sizes, Headings, Lists)
- **🖼️ Images to PDF** — Convert multiple images into a single PDF with reorder, rotate, and delete options
- **📑 Create PDF** — Multi-page PDF creator with inline images and full text formatting
- **👁️ PDF Viewer** — Built-in PDF viewer with smooth navigation
- **📂 Open & Share** — Open PDFs from file manager or share from any app to PDFMaker
- **🕒 Recent PDFs** — Manage recent PDFs with rename and delete options
- **⚙️ Settings** — Customize default PDF name, font size, page size, and orientation

## 📱 Screenshots

*(Add screenshots here)*

## 🛠️ Tech Stack

- **React Native** 0.76
- **TypeScript**
- **React Navigation** 6
- **Feature-based Architecture**
- **WebView-based Rich Text Editor**
- **react-native-html-to-pdf**
- **react-native-pdf**
- **react-native-blob-util**

## 📂 Project Structure
src/
├── components/
│ └── Toast/
├── context/
│ ├── PdfContext.tsx
│ └── SettingsContext.tsx
├── features/
│ ├── home/
│ ├── textToPdf/
│ ├── imagesToPdf/
│ ├── pdfCreator/
│ ├── pdfViewer/
│ ├── recentPdfs/
│ └── settings/
├── hooks/
├── navigation/
├── theme/
└── utils/

## 🚀 Getting Started

### Prerequisites
- Node.js >= 18
- Yarn 3
- Android SDK

### Installation

```bash
# Clone the repository
git clone https://github.com/ibrarkhan999/PDFMaker.git

# Navigate to project
cd PDFMaker

# Install dependencies
yarn install

# Run on Android
yarn android

📋 Usage
Create PDF — Tap "Create PDF" on home screen

Text to PDF — Quick text to PDF conversion

Images to PDF — Select multiple images

Open PDF — Share PDF from any app or open from file manager

🤝 Contributing
Contributions are welcome! Feel free to open issues and pull requests.

📄 License
This project is private and not licensed for public use.

