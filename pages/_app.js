import ThemeProvider from '../providers/theme-provider';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <ThemeProvider>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
