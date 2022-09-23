import { PropsWithChildren } from 'react';
import { CORNERS } from '../../constants';

export interface CornerComponentProps {
  /**
   * Preffered resizers [ 'left', 'right', 'top', 'bottom' ]
   * @type Array<SIDES>
   */
  side: CORNERS | string;
  /**
   * Preffered resizers [ 'left', 'right', 'top', 'bottom' ]
   * @type Array<SIDES>
   */
  customCornerComponent?: PropsWithChildren<any>;
}
