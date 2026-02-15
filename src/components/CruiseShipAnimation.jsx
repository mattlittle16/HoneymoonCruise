import { useState, useEffect, useRef } from 'react';
import './CruiseShipAnimation.css';

const CruiseShipAnimation = () => {
  const shipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const startingPoint = useRef([0, 0]);
  const isFirstRun = useRef(true);

  const makeNewPosition = () => {
    const h = window.innerHeight - 106;
    const w = window.innerWidth - 106;
    const nh = Math.floor(Math.random() * h);
    const nw = Math.floor(Math.random() * w);
    return [nw, nh];
  };

  const calculateAngle = (startPoint, newPoint) => {
    const length = newPoint[0] - startPoint[0];
    const height = newPoint[1] - startPoint[1];
    const absLength = Math.abs(length);
    const absHeight = Math.abs(height);
    const hypotenuse = Math.sqrt(absLength * absLength + absHeight * absHeight);

    let angle = 0;
    if (length > 0) {
      angle = Math.acos(
        (absLength * absLength + hypotenuse * hypotenuse - absHeight * absHeight) /
          (2 * absLength * hypotenuse)
      );
      angle = angle * (180 / Math.PI);
      if (height < 0) {
        angle = 85 - angle;
      } else {
        angle = angle + 90;
      }
    } else {
      angle = Math.acos(
        (absLength * absLength + hypotenuse * hypotenuse - absHeight * absHeight) /
          (2 * absLength * hypotenuse)
      );
      angle = angle * (180 / Math.PI);
      if (height < 0) {
        angle = 270 + angle;
      } else {
        angle = 270 - angle;
      }
    }
    return angle;
  };

  const animateShip = () => {
    const newPoint = makeNewPosition();
    const angle = calculateAngle(startingPoint.current, newPoint);

    if (isFirstRun.current) {
      setRotation(angle);
      isFirstRun.current = false;
    }

    setTimeout(() => {
      setIsVisible(false);
      setRotation(angle);

      setTimeout(() => {
        setIsVisible(true);
        startingPoint.current = [newPoint[0], newPoint[1]];

        // Animate to new position
        const speed = window.innerWidth < 650 ? 2500 : 4500;
        setPosition({ top: newPoint[1], left: newPoint[0] });

        setTimeout(() => {
          animateShip();
        }, speed);
      }, 50);
    }, 1000);
  };

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      animateShip();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const getTransform = () => {
    if (rotation > 180) {
      return `rotate(${rotation}deg) scale(-1, 1)`;
    }
    return `rotate(${rotation}deg)`;
  };

  return (
    <img
      ref={shipRef}
      src="/images/cruise-up.png"
      className={`Plane ${isVisible ? 'visible' : 'hidden'}`}
      alt="Cruise Ship"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: getTransform(),
        transition: 'top 4.5s linear, left 4.5s linear',
      }}
    />
  );
};

export default CruiseShipAnimation;
