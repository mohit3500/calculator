import React from 'react';

import animation from './assets/rYAOZsGu4m.json';
import { useLottie } from 'lottie-react';

const Animation2 = () => {
  const options = {
    animationData: animation,
    loop: true,
  };

  const { View } = useLottie(options);
  return <div>{View}</div>;
};

export default Animation2;
