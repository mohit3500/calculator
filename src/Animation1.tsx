import animation from './assets/welcome.json';

import { useLottie } from 'lottie-react';

const Animation1 = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div>{View}</div>;
};

export default Animation1;
