import { FC, ReactElement } from 'react';
import ReactDOM from 'react-dom';

interface IPortalProps {
  children: ReactElement;
}

const Portal: FC<IPortalProps> = ({ children }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Portal;
