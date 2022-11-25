import React from 'react';

interface Props {
  name: string;
  onClick: React.MouseEventHandler;
}

const Country: React.FC<Props> = ({name, onClick}) => {
  return (
    <div onClick={onClick}>
      {name}
    </div>
  );
};

export default Country;