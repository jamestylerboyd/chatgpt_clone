import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const isSiteDown = true; // Set this flag to true when the site is down

  if (isSiteDown) {
    return (
      <div className={inter.className}>
        <div className="black-screen">
          <div className="text-animation">
            <h1>Eden is hard at work...</h1>
            <h2>We will be back shortly...</h2>
            <div className="tree-animation">
              <pre>
                {' '}
                <span className="apple">o</span>
                <br /> /\ <br />
                /__\
              </pre>
            </div>
          </div>
        </div>

        <style jsx>{`
          .black-screen {
            background-color: black;
            height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }

          .text-animation {
            font-family: "Courier New", monospace;
            color: white;
            text-align: center;
            white-space: nowrap;
          }

          .tree-animation {
            color: green;
            animation: fall 2s infinite;
          }

          .apple {
            color: red;
            animation: blink 1s infinite step-end;
          }

          .text-animation h1,
          .text-animation h2 {
            animation: typing 2s steps(40), blink 1s infinite step-end;
            overflow: hidden;
            border-right: 2px solid white;
            margin: 0;
            padding: 0 0.5rem;
          }

          @keyframes typing {
            from {
              width: 0;
            }
            to {
              width: 100%;
            }
          }

          @keyframes blink {
            from,
            to {
              border-color: transparent;
            }
            50% {
              border-color: white;
            }
          }

          @keyframes fall {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(100px);
            }
            100% {
              transform: translateY(-100px);
            }
          }
        `}</style>
      </div>
    );
  }

  const queryClient = new QueryClient();

  return (
    <div className={inter.className}>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}

export default appWithTranslation(App);
