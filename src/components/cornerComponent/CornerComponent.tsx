import React, { FC, memo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { CORNERS } from '../../constants';
import { useRNDTInternal } from '../../hooks';
import styles from './styles';
import { CornerComponentProps } from './types';

const CornerComponent: FC<CornerComponentProps> = ({
  side,
  customCornerComponent,
}) => {
  var { borderStatus } = useRNDTInternal();

  const cornerComponentStyleSelector: {
    [key in CORNERS]: StyleProp<ViewStyle>;
  } = {
    TR: styles.TR,
    TL: styles.TL,
    BR: styles.BR,
    BL: styles.BL,
  };
  const cornerComponentStyle = cornerComponentStyleSelector[side as CORNERS];

  const borderStatusStyle = useAnimatedStyle(() => ({
    display: borderStatus.value ? 'flex' : 'none',
  }));

  return (
    <Animated.View style={[cornerComponentStyle, borderStatusStyle]}>
      {customCornerComponent()}
    </Animated.View>
  );
};

export default memo(CornerComponent);
