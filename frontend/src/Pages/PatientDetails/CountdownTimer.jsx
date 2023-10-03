import React, { useState, useEffect } from 'react';

function CountdownTimer({ initialTime, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout(); // Handle timeout when the timer reaches 0
    } else {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000); // Update timer every second
      return () => clearTimeout(timer); // Clear timer on unmount or when timeLeft changes
    }
  }, [timeLeft, onTimeout]);

  return <div>Time Left: {timeLeft} seconds</div>;
}

export default CountdownTimer;
