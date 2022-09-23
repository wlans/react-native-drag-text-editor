import Animated from 'react-native-reanimated';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { SIDES } from '../constants';
type textInputLayoutTypes = {
  height: number;
  width: number;
};

export interface RNDTExternalContextVariables {
  // TextInput Types
  onChangeText?: ((text: string) => void) | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  defaultTextValue?: string;
  blurOnSubmit?: boolean | undefined;
  placeholder?: string;
  value?: string | undefined;
  /**
   * Resizer Snap Points [ 'left', 'right', 'top', 'bottom' ]
   * @type Array<SIDES>
   */
  resizerSnapPoints?: Array<SIDES | string>;
  /**
   * External text styles
   * @type StyleProp<TextStyle | ViewStyle>
   */
  externalTextStyles?: StyleProp<TextStyle | ViewStyle>;
  /**
   * External border styles
   * @type StyleProp<TextStyle | ViewStyle>
   */
  externalBorderStyles?: StyleProp<ViewStyle>;
}

export interface RNDTInternalContextVariables {
  /**
   * Border display status
   * @type Animated.SharedValue<boolean>
   */
  borderStatus: Animated.SharedValue<boolean>;
  /**
   * customTextInput layout width and height
   * @type textInputLayoutTypes
   */
  textInputLayout: textInputLayoutTypes;
  /**
   * Component resizing status
   * @type Animated.SharedValue<boolean>
   */
  isResize: Animated.SharedValue<boolean>;
  /**
   * Rotation angle
   * @type Animated.SharedValue<number>
   */
  rotationAngle: Animated.SharedValue<number>;
  /**
   * X value
   * @type Animated.SharedValue<number>
   */
  x: Animated.SharedValue<number>;
  /**
   * Y value
   * @type Animated.SharedValue<number>
   */
  y: Animated.SharedValue<number>;
  /**
   * Box width
   * @type Animated.SharedValue<number>
   */
  boxWidth: Animated.SharedValue<number>;
}
