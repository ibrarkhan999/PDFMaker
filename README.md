<div align="center">

# 📄 PDFMaker

### Create, view, and manage PDFs — right on your Android device.

A powerful PDF creation and viewing app built with **React Native** and **TypeScript**. Create PDFs from text, images, or multi-page documents — then view, manage, open, and share them from any app.

![React Native](https://img.shields.io/badge/React_Native-Mobile_Framework-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Android-3DDC84?style=for-the-badge&logo=android&logoColor=white)
![License](https://img.shields.io/badge/License-Private-lightgrey?style=for-the-badge)

</div>

<br>

## ✨ Features

### 📝 Text to PDF
Rich text editor with full formatting support.

- Bold, Italic, Underline
- Font sizes and headings
- Bullet and numbered lists
- Export directly to PDF

### 🖼️ Images to PDF
Turn a batch of photos into a single document.

- Select multiple images from the gallery
- Each image becomes a page
- Reorder, rotate, or delete images
- Export as a single PDF

### 📑 Create PDF
The full multi-page document builder.

- Add multiple pages
- Inline image support
- Full text formatting
- Page tabs and navigation

### 👁️ PDF Viewer
Built-in viewer with smooth page navigation.

### 📂 Open & Share PDFs
- Open PDFs from your file manager
- Share PDFs from other apps (WhatsApp, Gmail, etc.)
- View shared PDFs directly in PDFMaker

### 🕒 Recent PDFs
- Track recently created or viewed PDFs
- Rename or delete from the list

### ⚙️ Settings
- Default PDF name, font size, page size (A4 / Letter), and orientation (Portrait / Landscape)
- Clear all recent PDFs
- Reset settings

### 🔔 Toast Notifications
Custom in-app toasts with **View** / **Okay** actions, in Success, Error, and Info variants.

<br>

## 🛠️ Tech Stack

| Technology | Purpose |
|:--|:--|
| 🧩 **React Native** | Mobile framework |
| 🔷 **TypeScript** | Type safety |
| 🧭 **React Navigation** | Screen navigation |
| ✍️ **WebView** | Rich text editor |
| 📄 **react-native-html-to-pdf** | PDF generation |
| 👁️ **react-native-pdf** | PDF viewer |
| 🔗 **react-native-blob-util** | File handling |
| 🖼️ **react-native-image-picker** | Image selection |
| 📐 **react-native-image-resizer** | Image resizing |
| 🔤 **react-native-vector-icons** | Icons |
| 🔐 **react-native-permissions** | Runtime permissions |

<br>

## 📂 Project Structure

```
src/
├── components/
│   └── Toast/
│       ├── components/
│       │   ├── SuccessToast.tsx
│       │   ├── ErrorToast.tsx
│       │   └── InfoToast.tsx
│       ├── Toast.tsx
│       ├── index.ts
│       └── types.ts
├── context/
│   ├── PdfContext.tsx
│   └── SettingsContext.tsx
├── features/
│   ├── home/
│   ├── textToPdf/
│   ├── imagesToPdf/
│   ├── pdfCreator/
│   ├── pdfViewer/
│   ├── recentPdfs/
│   └── settings/
├── hooks/
├── navigation/
├── theme/
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
└── utils/
    └── pdfUtils.ts
```

<br>

## 📱 Android Permissions

| Permission | Purpose |
|:--|:--|
| `INTERNET` | Required for development / WebView |
| `READ_MEDIA_IMAGES` | Select images from gallery |
| `READ_EXTERNAL_STORAGE` | Access stored files |
| `WRITE_EXTERNAL_STORAGE` | Save PDF files |
| `MANAGE_EXTERNAL_STORAGE` | Save PDFs to a user-accessible folder |

<br>

## 📄 PDF Storage

| Type | Location |
|:--|:--|
| 🗂️ Generated PDFs | `Downloads/PDFMaker/` |
| 🔗 Shared / Opened PDFs | App cache directory |

<br>

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|:--|:--|
| Node.js | `>= 18` |
| Yarn | `3` |
| Android SDK | latest |
| Device | Android device or emulator |

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/PDFMaker.git

# Navigate to project
cd PDFMaker

# Install dependencies
yarn install

# Run on Android
yarn android
```

<br>

## 📋 Usage

<details open>
<summary><b>📝 Create PDF from Text</b></summary>
<br>

1. Open app → tap **Text to PDF**
2. Type and format your text
3. Tap **Export PDF**

</details>

<details>
<summary><b>🖼️ Create PDF from Images</b></summary>
<br>

1. Open app → tap **Images to PDF**
2. Select images from the gallery
3. Reorder / rotate / delete as needed
4. Tap **Export PDF**

</details>

<details>
<summary><b>📑 Create Multi-page PDF</b></summary>
<br>

1. Open app → tap **Create PDF**
2. Write content and add images
3. Tap **+** to add more pages
4. Tap **Export PDF**

</details>

<details>
<summary><b>📂 Open PDF from Other Apps</b></summary>
<br>

1. Find a PDF in your file manager
2. Tap **Open with** → **PDFMaker**
3. Or share a PDF from any app → **PDFMaker**

</details>

<br>

## 📦 Package Name

```
com.pdfmaker.tool
```

<br>

## 🔒 Privacy

> 🛡️ PDFMaker does not collect or share any personal data.
> All PDFs are stored locally on the user's device.

<br>

## 📄 License

This project is private. All rights reserved.

<br>

<div align="center">

Made with ❤️ using **React Native**

</div>
