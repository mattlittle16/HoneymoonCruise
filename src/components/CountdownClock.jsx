import { useState, useEffect } from 'react';
import './CountdownClock.css';

const CountdownClock = () => {
  const [timeSince, setTimeSince] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Cruise date: September 15, 2016 at 12:30 PM
  const cruiseDate = new Date(2016, 8, 15, 12, 30, 0, 0);

  useEffect(() => {
    const calculateTimeSince = () => {
      const now = new Date();
      const diffMs = now.getTime() - cruiseDate.getTime();
      const diffSeconds = Math.floor(diffMs / 1000);

      const days = Math.floor(diffSeconds / (24 * 60 * 60));
      const hours = Math.floor((diffSeconds % (24 * 60 * 60)) / (60 * 60));
      const minutes = Math.floor((diffSeconds % (60 * 60)) / 60);
      const seconds = diffSeconds % 60;

      setTimeSince({ days, hours, minutes, seconds });
    };

    calculateTimeSince();
    const interval = setInterval(calculateTimeSince, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="Countdown">
      <div className="CountdownClock">
        <div className="time-display">
          <div className="time-unit">
            <div className="time-value">{timeSince.days}</div>
            <div className="time-label">Days</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">{formatNumber(timeSince.hours)}</div>
            <div className="time-label">Hours</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">{formatNumber(timeSince.minutes)}</div>
            <div className="time-label">Minutes</div>
          </div>
          <div className="time-separator">:</div>
          <div className="time-unit">
            <div className="time-value">{formatNumber(timeSince.seconds)}</div>
            <div className="time-label">Seconds</div>
          </div>
        </div>
        <div className="memorial-text">Time Since Our Mediterranean Adventure</div>
      </div>
    </div>
  );
};

export default CountdownClock;
