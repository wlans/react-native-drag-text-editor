import { StyleSheet } from 'react-native';

const rotationDefaults = StyleSheet.create({
  defaults: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const styles = StyleSheet.create({
  left: {
    ...rotationDefaults.defaults,
    left: -8,
    top: -8,
  },
  top: {
    ...rotationDefaults.defaults,
    top: -40,
  },
  bottom: {
    ...rotationDefaults.defaults,
    bottom: -40,
  },
});

export default styles;
