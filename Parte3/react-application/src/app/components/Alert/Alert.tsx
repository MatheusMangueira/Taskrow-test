import { useState, useEffect } from 'react';

type AlertProps = {
  type: 'success' | 'error' | 'warning';
  message: string;
};

export const Alert = ({ message, type }: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-80">
      <div
        className={`
          p-4 rounded-md shadow-md text-white
          ${
            type === 'success'
              ? 'bg-green-400'
              : type === 'error'
              ? 'bg-red-600'
              : 'bg-yellow-500'
          }
          animate__animated animate__fadeIn
        `}
      >
        <p className="text-base text-black">{message}</p>
      </div>
    </div>
  );
};
