import Head from 'next/head';
import ThemeProvider from '../providers/theme-provider';
import '../styles/globals.css';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Github User Search</title>
      <meta property='og:title' content='Github User Search' key='title' />
      <meta
        name='description'
        content='A frontend mentor project.'
        key='description'
      />
    </Head>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default App;
