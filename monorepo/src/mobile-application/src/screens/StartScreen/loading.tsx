import BottomContainer from '../../components/BottomContainer';
import ContentPadding from '../../components/ContentPadding';
import WeCeanGreenWhiteLogo from '../../components/WeCeanGreenWhiteLogo';
import ImageBackground from '../../components/ImageBackground';

import React from 'react';
import { ActivityIndicator } from 'react-native';

const LoadingScreen: React.FunctionComponent = () => {
  return (
    <ImageBackground>
      <WeCeanGreenWhiteLogo />
      <BottomContainer>
        <ContentPadding>
          <ActivityIndicator size="large" />
        </ContentPadding>
      </BottomContainer>
    </ImageBackground>
  );
};

export default LoadingScreen;
