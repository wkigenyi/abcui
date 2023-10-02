import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { SnackbarContent, SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { store } from 'src/store';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          ABC Recon App
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>

          <ThemeProvider theme={theme}>
            <SnackbarProvider >
            <CssBaseline />
            <AuthConsumer>
              {
                (auth) => getLayout(<Component {...pageProps} />)
              }
            </AuthConsumer>
            </SnackbarProvider>
          </ThemeProvider>
        </AuthProvider>
      </LocalizationProvider>
      </Provider>
    </CacheProvider>
  );
};

export default App;
