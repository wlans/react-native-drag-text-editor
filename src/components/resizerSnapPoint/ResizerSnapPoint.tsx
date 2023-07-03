import React, { FC, useCallback, useState } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import styles from './styles';
import { useRNDTInternal } from '../../hooks';
import { ResizerSnapPointProps } from './types.d';
import { handleLeft, handleRight } from '../../utils/calculate';
import { Keyboard, StyleProp, View, ViewStyle } from 'react-native';
import { SIDES, textInputLayoutOffset } from '../../constants';

const ResizerSnapPoint: FC<ResizerSnapPointProps> = ({ side }) => {
  const { boxWidth, x, y, textInputLayout, isResize, borderStatus } =
    useRNDTInternal();

  const [widthEnabled, setWidthEnabled] = useState(true);

  const handleLimiters = useCallback(() => {
    if (boxWidth.value <= textInputLayout.width) {
      setWidthEnabled(false);
    } else {
      setWidthEnabled(true);
    }
  }, [boxWidth, textInputLayout.width]);

  const handleResizers = (params: any) => {
    'worklet';
    switch (side) {
      case SIDES.LEFT:
        [boxWidth.value, x.value] = handleLeft(params);
        break;
      case SIDES.RIGHT:
        boxWidth.value = handleRight(params);
        break;
      case undefined:
        break;
    }
    isResize.value = false;
    runOnJS(handleLimiters)();
  };

  const resizeHandler = useAnimatedGestureHandler(
    {
      onStart: (_ev: any, ctx: any) => {
        Keyboard.dismiss();
        ctx.boxW = boxWidth.value + textInputLayoutOffset;
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (_ev, ctx) => {
        handleResizers({ _ev, ctx });
      },
      onFinish: _ev => {
        runOnJS(setWidthEnabled)(true);
      },
    },
    []
  );

  /**
   *  resizeFieldStyles: transparent snap point with bigger
   *  touchable field than visible white snap points
   */
  const resizeFieldStyles: { [key in SIDES]: StyleProp<ViewStyle> } = {
    left: styles.leftResizerField,
    right: styles.rightResizerField,
  };
  const resizeFieldStyle = resizeFieldStyles[side as SIDES];

  /** resizeStyles: visible white snap point */
  const resizeStyles: { [key in SIDES]: StyleProp<ViewStyle> } = {
    left: styles.leftResizer,
    right: styles.rightResizer,
  };
  const resizeStyle = resizeStyles[side as SIDES];

  const borderStatusStyle = useAnimatedStyle(() => ({
    display: borderStatus.value ? 'flex' : 'none',
  }));

  return (
    <PanGestureHandler enabled={widthEnabled} onGestureEvent={resizeHandler}>
      <Animated.View style={[resizeFieldStyle, borderStatusStyle]}>
        <View style={resizeStyle} />
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ResizerSnapPoint;
