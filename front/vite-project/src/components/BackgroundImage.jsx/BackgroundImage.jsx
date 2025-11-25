import './BackgroundImage.css';
import backgroundPrueba from '../../assets/backgroundPrueba.png';

const BackgroundImage = () => {
  return (
    <div className="background-image" style={{ backgroundImage: `url(${backgroundPrueba})` }} />
  );
};

export default BackgroundImage;