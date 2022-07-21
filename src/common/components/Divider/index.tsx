import React, { FC } from 'react';

interface IDividerProps {
  color: string;
}

const Divider: FC<IDividerProps> = ({ color }) => {
  return (
    <div style={{ height: '1px', width: '100%', background: `${color}` }} />
  );
};

export default Divider;
