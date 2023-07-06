import React, { FC, memo, useCallback } from 'react';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import {
  rotation,
  getCenters,
  toDegree,
  toRadian,
  inRange,
} from '../../utils/calculate';
import styles from './styles';
import { useRNDTInternal } from '../../hooks';
import { ROTATION_SNAP_POINTS } from '../../constants';
import { Keyboard, StyleProp, ViewStyle } from 'react-native';
import { rotationComponentPropTypes } from './types';

const RotationSnapPoint: FC<rotationComponentPropTypes> = ({
  side,
  customRotationComponent,
}) => {
  const internals = useRNDTInternal();

  const rotationFixer = useCallback(() => {
    'worklet';
    const rotationAngleInDegree = toDegree(internals.rotationAngle.value);
    if (inRange(rotationAngleInDegree, 30, -30)) {
      internals.rotationAngle.value = 0;
    }
    if (inRange(rotationAngleInDegree, 150, 50)) {
      internals.rotationAngle.value = toRadian(90);
    }
    if (inRange(rotationAngleInDegree, -150, -50)) {
      internals.rotationAngle.value = toRadian(-90);
    }
  }, [internals.rotationAngle]);

  const onStartRoutine = () => {
    Keyboard.dismiss();
  };

  const rotateHandler = useAnimatedGestureHandler({
    onStart: (_ev: any, ctx: any) => {
      runOnJS(onStartRoutine)()
      ctx.centers = getCenters(internals);
    },
    onActive: (_ev, ctx) => {
      internals.rotationAngle.value = rotation(_ev, ctx);
    },
    onEnd: () => {
      rotationFixer();
    },
  });

  const borderStatusStyle = useAnimatedStyle(() => ({
    display: internals.borderStatus.value ? 'flex' : 'none',
  }));

  const rotationStylesSelector: {
    [key in ROTATION_SNAP_POINTS]: StyleProp<ViewStyle>;
  } = {
    left: styles.left,
    bottom: styles.bottom,
    top: styles.top,
  };
  const rotationStyle = rotationStylesSelector[side as ROTATION_SNAP_POINTS];

  return (
    <PanGestureHandler onGestureEvent={rotateHandler}>
      <Animated.View style={[rotationStyle, borderStatusStyle]}>
        {customRotationComponent()}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default memo(RotationSnapPoint);
