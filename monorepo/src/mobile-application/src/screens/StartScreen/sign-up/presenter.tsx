import BaseBottomContainer from '../../../components/BaseBottomContainer';
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import BookButton from './book-button';
import LoginButton from './login-button';
import HeaderSlogan from '../../../components/HeaderSlogan';

import { NODE_ENV } from '@env';

import { Video } from 'expo-av';
import { BoldText } from '@components/Text';

interface StartScreenPresenterProps {
  onPressStart(): void;
  onPressSignIn(): void;
}

const SignUpStartScreenPresenter: React.FunctionComponent<StartScreenPresenterProps> =
  ({ onPressStart, onPressSignIn }) => {
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});

    const showDevelopment = () => {
      return NODE_ENV !== 'production'
        ? (
        <View
          style={{
            position: 'absolute',
            top: 100,
            left: 20,
            backgroundColor: '#FFF',
            padding: 10,
          }}
        >
          <BoldText style={{ color: 'red' }}>{NODE_ENV}</BoldText>
        </View>
          )
        : null;
    };

    return (
      <View style={styles.container}>
        <Image
          source={require('@assets/naturskyddsforeningen.png')}
          style={{
            position: 'absolute',
            zIndex: 100,
            height: 200,
            resizeMode: 'contain',
            right: 0,
            top: 0,
          }}
        />
        <Video
          ref={video}
          style={styles.backgroundVideo}
          source={require('@assets/APP1.mp4')}
          resizeMode="cover"
          isLooping={true}
          isMuted={true}
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          useNativeControls={false}
          shouldPlay={true}
        />

        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0,0.5)' }}>
          {showDevelopment()}
          <BaseBottomContainer>
            <HeaderSlogan />
            <View style={styles.padding}>
              <View style={styles.sideBySide}>
                <View style={styles.left}>
                  <BookButton onPress={onPressStart}>Boka städning</BookButton>
                </View>
                <View style={styles.right}>
                  <LoginButton onPress={onPressSignIn}>Logga in</LoginButton>
                </View>
              </View>
              <View style={{ paddingBottom: 80 }} />
            </View>
          </BaseBottomContainer>
        </View>
      </View>
    );
  };

export default SignUpStartScreenPresenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sideBySide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: { flex: 1, paddingRight: 10 },
  right: { flex: 1, paddingLeft: 10 },
  padding: {
    paddingHorizontal: 20,
  },

  iText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 24,
    fontStyle: 'italic',
    flexWrap: 'wrap',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
