import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date().toTimeString());

  useEffect(() => {
    const interval = setTimeout(() => {
      setTime(new Date().toTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return <div>{time}</div>;
}

export default Clock;