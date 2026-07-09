import { useState, useEffect } from "react";

// Pre-encode the message to ensure proper URL formatting
// make the WhatsApp Number select randomly between 263772664960 and 263779146262 to avoid hardcoding the number in the message
const WHATSAPP_NUMBERS = ["263772664960", "263779146262"];

// Randomly select one of the two numbers (50/50)
const RANDOM_NUMBER = WHATSAPP_NUMBERS[Math.floor(Math.random() * 2)];

const WHATSAPP_MESSAGE = encodeURIComponent(
  ``
);
const WHATSAPP_URL = `https://wa.me/${RANDOM_NUMBER}?text=${WHATSAPP_MESSAGE}`;

const WhatsAppFAB = () => {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Fade in after 1.5s so it doesn't distract on immediate page load
  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 1500);
    // Pulse once after appearing to draw attention
    const pulseTimer = setTimeout(() => setPulse(true), 2500);
    const pulseOffTimer = setTimeout(() => setPulse(false), 4500);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(pulseTimer);
      clearTimeout(pulseOffTimer);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes fab-in {
          from { opacity: 0; transform: scale(0.6) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes wa-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.55); }
          60%  { box-shadow: 0 0 0 18px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateX(10px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .wa-fab {
          position: fixed;
          bottom: 28px;
          right: 28px;
          z-index: 9999;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #25d366 0%, #128c4e 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
          outline: none;
          box-shadow: 0 4px 20px rgba(37, 211, 102, 0.45), 0 2px 8px rgba(0,0,0,0.18);
          transition: transform 0.2s cubic-bezier(.34,1.56,.64,1), box-shadow 0.2s ease;
          opacity: 0;
          text-decoration: none;
        }
        .wa-fab.visible {
          animation: fab-in 0.5s cubic-bezier(.34,1.56,.64,1) forwards;
        }
        .wa-fab.pulsing {
          animation: wa-pulse 1.2s ease-out 2;
        }
        .wa-fab:hover {
          transform: scale(1.12);
          box-shadow: 0 8px 28px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0,0,0,0.2);
        }
        .wa-fab:active {
          transform: scale(0.95);
        }
        .wa-tooltip {
          position: fixed;
          bottom: 38px;
          right: 98px;
          background: #1a1a1a;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 8px;
          white-space: nowrap;
          pointer-events: none;
          z-index: 9998;
          animation: tooltip-in 0.2s ease forwards;
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .wa-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 0 6px 7px;
          border-style: solid;
          border-color: transparent transparent transparent #1a1a1a;
        }
      `}</style>

      {showTooltip && (
        <div className="wa-tooltip">Chat with us on WhatsApp</div>
      )}

      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`wa-fab ${visible ? "visible" : ""} ${pulse ? "pulsing" : ""}`}
        aria-label="Chat with us on WhatsApp"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(false)}
      >
        {/* Official WhatsApp icon SVG */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="32"
          height="32"
          fill="white"
        >
          <path d="M16.004 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.347.629 4.559 1.729 6.471L2.667 29.333l7.063-1.699A13.264 13.264 0 0016.004 29.333c7.363 0 13.329-5.97 13.329-13.333S23.367 2.667 16.004 2.667zm0 24.267a11 11 0 01-5.617-1.539l-.403-.239-4.191 1.008 1.056-4.076-.262-.416A10.975 10.975 0 015.001 16c0-6.073 4.933-11.003 11.003-11.003S27.007 9.927 27.007 16c0 6.073-4.93 11.003-11.003 11.003v-.069zm6.04-8.235c-.33-.165-1.953-.961-2.256-1.071-.303-.11-.523-.165-.744.165s-.854 1.071-1.047 1.291-.385.247-.715.082a9.003 9.003 0 01-2.651-1.637 9.928 9.928 0 01-1.836-2.285c-.193-.33-.021-.509.145-.673.15-.148.33-.385.495-.578.165-.192.22-.33.33-.549.11-.22.055-.412-.027-.578-.083-.165-.744-1.791-1.019-2.452-.268-.644-.54-.557-.744-.567l-.633-.011a1.21 1.21 0 00-.877.412c-.303.33-1.155 1.128-1.155 2.752s1.183 3.191 1.347 3.411c.165.22 2.328 3.556 5.64 4.988.789.34 1.404.543 1.884.695.791.251 1.511.216 2.081.131.634-.095 1.953-.798 2.228-1.569.275-.771.275-1.432.192-1.569-.082-.138-.303-.22-.633-.385z" />
        </svg>
      </a>
    </>
  );
};

export default WhatsAppFAB;
