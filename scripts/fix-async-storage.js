const fs = require('fs');
const path = require('path');

const gradlePropertiesPath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native-async-storage',
  'async-storage',
  'android',
  'gradle.properties'
);

if (fs.existsSync(gradlePropertiesPath)) {
  let content = fs.readFileSync(gradlePropertiesPath, 'utf8');
  
  if (content.includes('AsyncStorage_kotlinVersion=2.2.10')) {
    content = content.replace(
      'AsyncStorage_kotlinVersion=2.2.10',
      'AsyncStorage_kotlinVersion=2.1.20'
    );
    fs.writeFileSync(gradlePropertiesPath, content);
    console.log('Fixed AsyncStorage kotlinVersion');
  }
}

const buildGradlePath = path.join(
  __dirname,
  '..',
  'node_modules',
  '@react-native-async-storage',
  'async-storage',
  'android',
  'build.gradle'
);

if (fs.existsSync(buildGradlePath)) {
  let content = fs.readFileSync(buildGradlePath, 'utf8');
  let modified = false;

  if (content.match(/apply plugin:\s*"kotlin-android"/)) {
    content = content.replace(/apply plugin:\s*"kotlin-android"\r?\n/, '');
    modified = true;
  }
  if (content.match(/compileSdkVersion\s+project\.ext\.AsyncStorage\.compileSdk/)) {
    content = content.replace(
      /compileSdkVersion\s+project\.ext\.AsyncStorage\.compileSdk/,
      'compileSdk 36'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(buildGradlePath, content);
    console.log('Fixed AsyncStorage build.gradle');
  }
}