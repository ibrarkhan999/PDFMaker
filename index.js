import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

const originalHandler = ErrorUtils.getGlobalHandler();
ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log('GLOBAL ERROR:', error.message);
  console.log('STACK:', error.stack);
  originalHandler(error, isFatal);
});

AppRegistry.registerComponent(appName, () => App);