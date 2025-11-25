import { useEffect, useState } from "react";
import "./LogoIntro.css";
import logo1 from "../../assets/logoAnimacion2.png";

const LogoIntro = () => {
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimationComplete(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`logo-intro ${animationComplete ? "animation-complete" : ""}`}>
      <img src={logo1} alt="Logo animado" />
    </div>
  );
};

export default LogoIntro;