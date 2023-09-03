import { CornerComponentProps } from '../cornerComponent/types';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { rotationComponentPropTypes } from '../rotationSnapPoint/types';
import { SIDES } from '../../constants';

export interface DragTextRef {
  /**
   * Change border visibility
   * @param borderStatus border visibility
   */
  setBorderStatus: (value: boolean) => void;
}

export type ValueProps = {
  text: string;
  x: number;
  y: number;
  boxWidth: number;
};

export interface DragTextPropTypes {
  // TextInput Types
  onChangeText?: ((text: string) => void) | undefined;
  blurOnSubmit?: boolean | undefined;
  value?: ValueProps | undefined;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;

  onItemActive?: () => void;
  /**
   * Component visibility
   * @type boolean | undefined
   */

  onDragHandler: (e: any) => void;
  onEndHandler: (e: any) => void;
  visible?: boolean;
  /**
   * Custom corner component props
   * [{ side:'TL', customCornerComponent:customComponent }]
   * @type Array<CornerComponentProps>
   */
  cornerComponents?: Array<CornerComponentProps>;
  /**
   * Custom rotation component props
   * [{ side:'bottom', customRotationComponent:customComponent }]
   * @type rotationComponentPropTypes
   */
  rotationComponent?: rotationComponentPropTypes;
  /**
   * Resizer snap points [ 'left', 'right', 'top', 'bottom' ]
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
  placeholder?: string;
  defaultTextValue?: string;
}
