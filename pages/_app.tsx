import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { useEffect, useState } from 'react';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

function App({ Component, pageProps }: AppProps<{}>) {
  const isSiteDown = true; // Set this flag to true when the site is down

  if (isSiteDown) {
    const [apples, setApples] = useState([]);

    useEffect(() => {
      const interval = setInterval(() => {
        setApples((prevApples) => [...prevApples, Math.random()]);
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className={inter.className}>
        <div className="dos-box">
          <div className="container">
            <div className="game">
              {apples.map((apple) => (
                <div key={apple} className="apple" style={{ left: `${apple * 100}%` }} />
              ))}
            </div>
          </div>
          <div className="text-animation">
            <h1>Eden is hard at work...</h1>
            <h2>We will be back shortly...</h2>
          </div>
        </div>

        <style jsx>{`
          .dos-box {
            background-color: black;
            padding: 1rem;
            text-align: center;
            font-family: 'Courier New', monospace;
            color: white;
          }

          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 300px;
            height: 400px;
            margin: 0 auto;
            border: 2px solid white;
            overflow: hidden;
          }

          .game {
            position: relative;
            width: 100%;
            height: 100%;
          }

          .apple {
            position: absolute;
            bottom: 0;
            width: 20px;
            height: 20px;
            background-color: red;
            border-radius: 50%;
            transform: translate(-50%, 0);
          }

          .text-animation {
            margin-top: 1rem;
            animation: typing 2s steps(40), blink 1s infinite step-end;
            overflow: hidden;
            border-right: 2px solid white;
            white-space: nowrap;
          }

          .text-animation h1,
          .text-animation h2 {
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

export default appWithTranslation
