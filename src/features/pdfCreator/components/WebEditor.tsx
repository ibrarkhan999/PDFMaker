import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

type WebEditorProps = {
  content: string;
  editorRef?: any;
  onAddImage?: () => void;
};

const editorHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 12px;
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: #333;
    }
    img {
      max-width: 200px;
      height: auto;
      display: block;
      margin: 8px 0;
      border-radius: 6px;
    }
    p {
      margin: 8px 0;
      min-height: 20px;
    }
    #editor {
      min-height: 300px;
      outline: none;
    }
    .toolbar {
      display: flex;
      gap: 4px;
      padding: 8px;
      background: #F8F9FA;
      border-bottom: 1px solid #E0E0E0;
      position: sticky;
      top: 0;
      z-index: 100;
      flex-wrap: wrap;
    }
    .toolbar button {
      padding: 6px 10px;
      border: 1px solid #ddd;
      background: #fff;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
    }
    .toolbar button.active {
      background: #E3F2FD;
      border-color: #007AFF;
    }
    select {
      padding: 6px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="toolbar">
    <button onclick="formatText('bold')"><b>B</b></button>
    <button onclick="formatText('italic')"><i>I</i></button>
    <button onclick="formatText('underline')"><u>U</u></button>
    <select onchange="changeFontSize(this.value)">
      <option value="1">10</option>
      <option value="2">12</option>
      <option value="3" selected>14</option>
      <option value="4">16</option>
      <option value="5">18</option>
      <option value="6">20</option>
      <option value="7">24</option>
    </select>
    <select onchange="changeFormat(this.value)">
      <option value="p">Paragraph</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
      <option value="h3">Heading 3</option>
    </select>
    <button onclick="insertList('ul')">• List</button>
    <button onclick="insertList('ol')">1. List</button>
    <button onclick="requestImage()">🖼️</button>
  </div>
  <div id="editor" contenteditable="true" onclick="updateToolbar()" onkeyup="updateToolbar()"></div>

  <script>
    const editor = document.getElementById('editor');
    
    function getHTML() {
      return editor.innerHTML;
    }
    
    function setHTML(html) {
      editor.innerHTML = html;
    }
    
    function sendHTML() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'getHTMLResponse',
        html: editor.innerHTML
      }));
    }
    
    function insertImage(src) {
      const img = document.createElement('img');
      img.src = src;
      img.style.maxWidth = '200px';
      editor.appendChild(img);
      const p = document.createElement('p');
      p.innerHTML = '<br>';
      editor.appendChild(p);
    }
    
    function formatText(command) {
      editor.focus();
      document.execCommand(command, false, null);
      updateToolbar();
    }
    
    function changeFontSize(size) {
      editor.focus();
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontSize', false, size);
    }
    
    function changeFormat(format) {
      editor.focus();
      document.execCommand('formatBlock', false, format);
    }
    
    function insertList(type) {
      editor.focus();
      document.execCommand(type === 'ul' ? 'insertUnorderedList' : 'insertOrderedList', false, null);
    }
    
    function requestImage() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'requestImage'
      }));
    }
    
    function updateToolbar() {
      if (document.queryCommandState('bold')) {
        document.querySelectorAll('.toolbar button')[0].classList.add('active');
      } else {
        document.querySelectorAll('.toolbar button')[0].classList.remove('active');
      }
    }
    
    editor.addEventListener('input', function() {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'content',
        html: editor.innerHTML
      }));
    });
  </script>
</body>
</html>
`;

const WebEditor = ({ content, editorRef, onAddImage }: WebEditorProps) => {
  const webViewRef = useRef<any>(null);
  const onAddImageRef = useRef(onAddImage);
  const pendingGetHTMLRef = useRef<((html: string) => void) | null>(null);

  onAddImageRef.current = onAddImage;

  const handleMessage = (event: any) => {
    const data = JSON.parse(event.nativeEvent.data);

    if (data.type === 'content' && editorRef) {
      editorRef.current = {
        getHTML: () => {
          return new Promise(resolve => {
            pendingGetHTMLRef.current = resolve;
            webViewRef.current?.injectJavaScript('sendHTML(); true;');
          });
        },
        setContent: (html: string) => {
          webViewRef.current?.injectJavaScript(
            `setHTML(${JSON.stringify(html)}); true;`
          );
        },
        setImage: (src: string) => {
          webViewRef.current?.injectJavaScript(
            `insertImage(${JSON.stringify(src)}); true;`
          );
        },
        focus: () => {
          webViewRef.current?.injectJavaScript('editor.focus(); true;');
        },
      };
    }

    if (data.type === 'getHTMLResponse' && pendingGetHTMLRef.current) {
      pendingGetHTMLRef.current(data.html);
      pendingGetHTMLRef.current = null;
    }

    if (data.type === 'requestImage' && onAddImageRef.current) {
      onAddImageRef.current();
    }
  };

  const handleLoadEnd = () => {
    if (content) {
      webViewRef.current?.injectJavaScript(
        `setHTML(${JSON.stringify(content)}); true;`
      );
    }
    if (editorRef) {
      editorRef.current = {
        getHTML: () => {
          return new Promise(resolve => {
            pendingGetHTMLRef.current = resolve;
            webViewRef.current?.injectJavaScript('sendHTML(); true;');
          });
        },
        setContent: (html: string) => {
          webViewRef.current?.injectJavaScript(
            `setHTML(${JSON.stringify(html)}); true;`
          );
        },
        setImage: (src: string) => {
          webViewRef.current?.injectJavaScript(
            `insertImage(${JSON.stringify(src)}); true;`
          );
        },
        focus: () => {
          webViewRef.current?.injectJavaScript('editor.focus(); true;');
        },
      };
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        source={{ html: editorHTML }}
        onMessage={handleMessage}
        onLoadEnd={handleLoadEnd}
        style={styles.webview}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 400,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
  },
});

export default WebEditor;