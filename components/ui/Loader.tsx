import React from "react";
import Logo from "../../public/spinner.png";

function Loader() {
  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(255, 255, 255, 0.4)", // Semi-transparent
      backdropFilter: "blur(10px)", // The blur effect
      WebkitBackdropFilter: "blur(10px)", // Safari support
      zIndex: 9999,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
    ringWrapper: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100px",
      height: "100px",
    },
    logo: {
      width: "50px",
      height: "50px",
      objectFit: "contain",
      zIndex: 2,
    },
    text: {
      marginTop: "24px",
      fontSize: "1.2rem",
      fontWeight: "600",
      letterSpacing: "0.2em",
      color: "#334155",
      fontFamily: "sans-serif",
    },
  };

  return (
    <div style={styles.overlay as React.CSSProperties}>
      {/* Injecting CSS Keyframes via a style tag for the animations */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(0.9); }
          }
          .spinner-ring {
            position: absolute;
            width: 100%;
            height: 100%;
            border: 4px solid #e2e8f0;
            border-top: 4px solid #2563eb;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
          .logo-anim {
            animation: pulse 2s ease-in-out infinite;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>

      <div style={styles.container as React.CSSProperties}>
        <div style={styles.ringWrapper as React.CSSProperties}>
          <div className="spinner-ring"></div>
          <div className="logo-anim">
            <img
              alt="Sqooli Logo"
              src={Logo.src}
              style={styles.logo as React.CSSProperties}
            />
          </div>
        </div>
        <h2 style={styles.text}>LOADING</h2>
      </div>
    </div>
  );
}

export default Loader;
