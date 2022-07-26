import { FC, ReactNode } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children: ReactNode;
  container?: HTMLElement;
}

const Portal: FC<IPortalProps> = ({
  children,
  container = document.body as HTMLElement,
}) => {
  return ReactDOM.createPortal(children, container);
};

export default Portal;
