import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const UpgradePopup = () => {
  const [isRedirecting, setIsRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Redirect to www.chat.openai.com after 5 seconds
    const redirectTimeout = setTimeout(() => {
      setIsRedirecting(true);
      router.push('https://www.chat.openai.com');
    }, 5000);

    return () => clearTimeout(redirectTimeout);
  }, [router]);

  return (
    <div className="upgrade-popup">
      <div className="popup-content">
        <h2>Come back soon!</h2>
        <p>Your API is being upgraded.</p>
        <button
          className={`redirect-button ${isRedirecting ? 'redirecting' : ''}`}
          onClick={() => {
            setIsRedirecting(true);
            router.push('https://www.chat.openai.com');
          }}
        >
          {isRedirecting ? 'Redirecting...' : 'Go to Chat'}
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className="black-screen">
      <Head>
        <title>Upgrade in Progress</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-animation">
        <h1>Upgrade in Progress</h1>
        <p>Your API is being upgraded.</p>
      </div>

      <UpgradePopup />

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
          animation: typing 2s steps(40), blink 1s infinite step-end;
          white-space: nowrap;
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

        .upgrade-popup {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-color: rgba(0, 0, 0, 0.8);
          padding: 2rem;
          border-radius: 0.5rem;
          text-align: center;
        }

        .popup-content {
          color: white;
        }

        .redirect-button {
          background-color: white;
          color: black;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 0.25rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
          margin-top: 1rem;
        }

        .redirect-button:hover {
          background-color: #e0e0e0;
        }

        .redirecting {
          pointer-events: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
