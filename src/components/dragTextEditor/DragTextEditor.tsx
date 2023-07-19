import React, {
  memo,
  forwardRef,
  Ref,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
  useEffect
} from 'react';
import { Keyboard, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import RotationSnapPoint from '../rotationSnapPoint/RotationSnapPoint';
import ResizerSnapPoint from '../resizerSnapPoint/ResizerSnapPoint';
import CustomTextInput from '../customTextInput/CustomTextInput';
import { RNDTInternalProvider } from '../../context/internal';
import { RNDTExternalProvider } from '../../context/external';
import {
  defBoxWidth,
  defInputCoverZIndex,
  defRotationAngle,
  defX,
  defY,
  radian,
  SIDES,
  textInputLayoutDefaults,
} from '../../constants';
import CornerComponent from '../cornerComponent/CornerComponent';
import { CornerComponentProps } from '../cornerComponent/types.d';
import { DragTextPropTypes, DragTextRef } from './types';

const DragText = forwardRef(
  (
    {
      rotationComponent,
      resizerSnapPoints,
      cornerComponents,
      externalTextStyles,
      externalBorderStyles,
      blurOnSubmit,
      placeholder,
      value,
      defaultTextValue,
      visible = true,
      onChangeText,
      onBlur,
      onItemActive,
      onDragHandler,
      onEndHandler,
    }: DragTextPropTypes,
    ref: Ref<DragTextRef>
  ) => {
    const x = useSharedValue<number>(defX);
    const y = useSharedValue<number>(defY);
    const boxWidth = useSharedValue<number>(defBoxWidth);
    const rotationAngle = useSharedValue<number>(defRotationAngle);
    const [inputCoverZIndex, _setInputCoverZIndex] =
      useState(defInputCoverZIndex);
    const isResize = useSharedValue<boolean>(false);
    const borderStatus = useSharedValue<boolean>(true);
    const textInputLayout = textInputLayoutDefaults;


    const onStartRoutine = () => {
      Keyboard.dismiss();
      onItemActive?.();
    };

    const onEndRoutine = () => {
      _setInputCoverZIndex(defInputCoverZIndex);
    };


    const internalContextVariables = useMemo(
      () => ({
       x,
        y,
        boxWidth,
        rotationAngle,
        isResize,
        textInputLayout,
        borderStatus,
      }),
      [x, y, boxWidth, isResize, textInputLayout, rotationAngle, borderStatus]
    );


    


    const dragHandler = useAnimatedGestureHandler({
      onStart: (_ev: any, ctx: any) => {
        runOnJS(onStartRoutine)();
        borderStatus.value = true;
        ctx.startX = x.value;
        ctx.startY = y.value;
      },
      onActive: (_ev: any, ctx: any) => {
        if (borderStatus.value) {
          y.value = ctx.startY + _ev.translationY;
        }
      },
      onEnd: _ev => {

        runOnJS(onEndRoutine)();
        borderStatus.value = false;
      },
    });

    useImperativeHandle(ref, () => ({
      setBorderStatus: param => {
        borderStatus.value = param;
        _setInputCoverZIndex(defInputCoverZIndex);
      },
    }));

    const externalContextVariables = useMemo(
      () => ({
        resizerSnapPoints,
        cornerComponents,
        externalTextStyles,
        externalBorderStyles,
        rotationComponent,
        placeholder,
        onChangeText,
        defaultTextValue,
        blurOnSubmit,
        value,
        onBlur,
        onDragHandler,
        onEndHandler,
      }),
      [
        resizerSnapPoints,
        cornerComponents,
        externalTextStyles,
        externalBorderStyles,
        rotationComponent,
        placeholder,
        onChangeText,
        defaultTextValue,
        blurOnSubmit,
        value,
        onBlur,
        onDragHandler,
        onEndHandler
      ]
    );

    useEffect(() => {
    	      runOnJS(onDragHandler)({ x: x.value, y: y.value, boxWidth: boxWidth.value })
 }, [x.value, y.value, boxWidth.value , onDragHandler]);

    const animatedDragStyles = useAnimatedStyle(
      () => ({
        transform: [{ translateX: x.value }, { translateY: y.value }],
        width: boxWidth.value,
        display: visible ? 'flex' : 'none',
      }),
      [x, y, boxWidth, visible]
    );

    const animatedRotationStyles = useAnimatedStyle(
      () => ({
        transform: [{ rotateZ: rotationAngle.value + radian }],
        borderWidth: borderStatus.value ? 1 : 0,
      }),
      [rotationAngle, borderStatus]
    );

    const _cornerComponent = useCallback(
      ({ side, customCornerComponent }: CornerComponentProps, i: number) => (
        <CornerComponent
          side={side}
          customCornerComponent={customCornerComponent}
          key={i}
        />
      ),
      []
    );

    const _resizerSnapPoint = useCallback(
      (sides: SIDES | string, i: number) => (
        <ResizerSnapPoint side={sides} key={i} />
      ),
      []
    );

    return (
      <RNDTExternalProvider value={externalContextVariables}>
        <RNDTInternalProvider value={internalContextVariables}>
          <PanGestureHandler onGestureEvent={dragHandler}>
            <Animated.View style={[animatedDragStyles, styles.dragContainer]}>
              <Animated.View
                style={[
                  animatedRotationStyles,
                  styles.rotationStyles,
                  externalBorderStyles,
                ]}
              >
                {rotationComponent && (
                  <RotationSnapPoint
                    side={rotationComponent.side}
                    customRotationComponent={
                      rotationComponent.customRotationComponent
                    }
                  />
                )}
                {cornerComponents?.map(_cornerComponent)}
                {resizerSnapPoints?.map(_resizerSnapPoint)}
                <TouchableOpacity
                  onPress={() => _setInputCoverZIndex(0)}
                  style={[styles.inputCoverStyle, { zIndex: inputCoverZIndex }]}
                />
                <CustomTextInput />
              </Animated.View>
            </Animated.View>
          </PanGestureHandler>
        </RNDTInternalProvider>
      </RNDTExternalProvider>
    );
  }
);

const styles = StyleSheet.create({
  dragContainer: {
    position: 'absolute',
  },
  rotationStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#777',
  },
  inputCoverStyle: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    elevation: 5,
  },
});

export default memo(DragText);
