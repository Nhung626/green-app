import { Provider } from 'react-redux';
import AppNavigation from './src/navigation';
import store from './src/redux/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemeProvider } from './src/theme';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <MenuProvider>
            <AppNavigation />
          </MenuProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}