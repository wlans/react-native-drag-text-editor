import { StyleSheet } from 'react-native';

const cornerButtonDefaults = StyleSheet.create({
  defaults: {
    zIndex: 100,
    elevation: 0.01,
    alignItems: 'center',
    position: 'absolute',
  },
});

const styles = StyleSheet.create({
  TL: {
    ...cornerButtonDefaults.defaults,
    top: -8,
    left: -8,
  },
  TR: {
    ...cornerButtonDefaults.defaults,
    top: -8,
    right: -8,
  },
  BR: {
    ...cornerButtonDefaults.defaults,
    bottom: -8,
    right: -8,
  },
  BL: {
    ...cornerButtonDefaults.defaults,
    bottom: -8,
    left: -8,
  },
});

export default styles;
