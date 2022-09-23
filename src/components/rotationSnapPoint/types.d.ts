import { PropsWithChildren } from 'react';
import { ROTATION_SNAP_POINTS } from '../../constants';

export type rotationComponentPropTypes = {
  side: ROTATION_SNAP_POINTS | string;
  customRotationComponent: PropsWithChildren<any>;
};
