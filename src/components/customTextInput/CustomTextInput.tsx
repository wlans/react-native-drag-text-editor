import React, { memo } from 'react';
import { FC } from 'react';
import { TextInput } from 'react-native';
import Animated from 'react-native-reanimated';
import { PLACEHOLDER } from '../../constants';
import { useRNDTExternal, useRNDTInternal } from '../../hooks';
import styles from './styles';
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const CustomTextInput: FC = () => {
  var {
    externalTextStyles,
    placeholder,
    onChangeText,
    onBlur,
    value,
    blurOnSubmit,
    defaultTextValue,
  } = useRNDTExternal();
  const { isResize } = useRNDTInternal();
  return (
    <>
      <AnimatedTextInput
        onChangeText={onChangeText}
        onBlur={onBlur}
        blurOnSubmit={blurOnSubmit}
        value={value}
        multiline
        underlineColorAndroid="transparent"
        defaultValue={defaultTextValue}
        returnKeyType="done"
        scrollEnabled={false}
        spellCheck={false}
        autoCorrect={false}
        onFocus={() => (isResize.value = false)}
        style={[styles.textStyles, externalTextStyles]}
        placeholder={placeholder ? placeholder : PLACEHOLDER}
      />
    </>
  );
};

export default memo(CustomTextInput);
