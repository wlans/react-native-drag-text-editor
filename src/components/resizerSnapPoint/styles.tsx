import { StyleSheet } from 'react-native';

const resizeDefaults = StyleSheet.create({
  defaults: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ddd',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 25,
  },
  fieldDefaults: {
    zIndex: 200,
    elevation: 0.1,
    width: 35,
    height: 35,
    backgroundColor: 'transparent',
    position: 'absolute',
  },
});
const styles = StyleSheet.create({
  rightResizerField: {
    ...resizeDefaults.fieldDefaults,
    right: -17,
  },
  leftResizerField: {
    ...resizeDefaults.fieldDefaults,
    left: -17,
  },
  bottomResizerField: {
    ...resizeDefaults.fieldDefaults,
    bottom: -17,
  },
  topResizerField: {
    ...resizeDefaults.fieldDefaults,
    top: -17,
  },
  rightResizer: {
    ...resizeDefaults.defaults,
    width: 10,
    height: 25,
    marginTop: 5,
    right: 12,
  },
  leftResizer: {
    ...resizeDefaults.defaults,
    width: 10,
    height: 25,
    marginTop: 5,
    left: 12,
  },
  bottomResizer: {
    ...resizeDefaults.defaults,
    width: 25,
    height: 10,
    marginLeft: 5,
    bottom: 12,
  },
  topResizer: {
    ...resizeDefaults.defaults,
    width: 25,
    height: 10,
    marginLeft: 5,
    top: 12,
  },
});

export default styles;
