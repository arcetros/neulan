import React from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  className: string;
  el?: string;
  children?: React.ReactNode;
  onClick: () => void;
}

export default function Portal({ children, className, el = 'div', onClick }: IPortal) {
  const [container] = React.useState(document.createElement(el));

  if (onClick) container.addEventListener('click', onClick);

  if (className) {
    container.classList.add(className);
  }

  React.useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
}
