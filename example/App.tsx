import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { DragTextEditor, DragTextRef } from 'react-native-drag-text-editor';
import { ExampleContextProvider } from './context/ExampleContextProvider';
import { Editor, IconButton } from './components';
import { defaultTextConfig, ICONS } from './constants';
import { DragTextArrayProps } from './types.d';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const [texts, addText] = useState<DragTextArrayProps[]>([
    { key: 0, ...defaultTextConfig },
  ]);
  const DragTextEditorRef = useRef<DragTextRef | any>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [textValue, onChangeText] = useState(texts[activeIndex].text);
  const sharedSliderValue = useSharedValue<number>(texts[activeIndex].fontSize);

  const DefaultTextConfig = { key: texts.length, ...defaultTextConfig };

  const editTextsArray = useCallback(
    (prop: string, value: number | boolean | string) => {
      const tmpTextsArray = [...texts];
      tmpTextsArray[activeIndex][prop] = value;
      addText(tmpTextsArray);
    },
    [texts, activeIndex],
  );

  const editFontSize = useCallback(
    (value: number) => {
      texts[activeIndex].fontSize = value;
    },
    [texts],
  );

  const addNewText = () => {
    DragTextEditorRef.current[activeIndex]?.setBorderStatus(false);
    addText(texts => [...texts, DefaultTextConfig]);
  };

  const manageActiveStatus = (_index: number) => {
    texts[activeIndex].fontSize = sharedSliderValue.value;
    texts[activeIndex].text = textValue;
    onChangeText(texts[_index].text);
    setActiveIndex(_index);
    sharedSliderValue.value = texts[_index].fontSize;
    texts
      .filter(el => el.key !== _index)
      .map((el, i) => DragTextEditorRef.current[el.key].setBorderStatus(false));
  };

  const exampleContextValues = useMemo(
    () => ({
      sharedSliderValue,
    }),
    [sharedSliderValue],
  );

  const animatedTextStyle = useAnimatedStyle(
    () => ({
      fontSize: sharedSliderValue.value,
    }),
    [sharedSliderValue],
  );

  const activeStyleHandler = useCallback(
    (index: number) => {
      if (index == activeIndex) {
        return animatedTextStyle;
      } else {
        return { fontSize: texts[index].fontSize };
      }
    },
    [texts, animatedTextStyle, activeIndex],
  );

  const _cornerComponents = [
    {
      side: 'TR',
      customCornerComponent: () => (
        <IconButton
          onPress={() => editTextsArray('visible', false)}
          iconName={ICONS.CLOSE_ICON}
        />
      ),
    },
    {
      side: 'TL',
      customCornerComponent: () => (
        <IconButton onPress={() => addNewText()} iconName={ICONS.TAB_ICON} />
      ),
    },
  ];

  const _rotateComponent = {
    side: 'bottom',
    customRotationComponent: () => <IconButton iconName={ICONS.ROTATE_ICON} />,
  };
  const _resizerSnapPoints = ['right', 'left'];

  return (
    <GestureHandlerRootView style={_exampleStyles.gestureRootStyles}>
      <ExampleContextProvider value={exampleContextValues}>
        <View style={_exampleStyles.container}>
          {texts.map((item, index) => (
            <DragTextEditor
              key={index}
              onChangeText={onChangeText}
              value={activeIndex === index ? textValue : item.text}
              visible={item.visible}
              ref={ref => (DragTextEditorRef.current[index] = ref)}
              onItemActive={() => manageActiveStatus(index)}
              externalBorderStyles={_exampleStyles.externalBorder}
              placeholder={'Placeholder'}
              cornerComponents={_cornerComponents}
              resizerSnapPoints={_resizerSnapPoints}
              rotationComponent={_rotateComponent}
              externalTextStyles={[
                { color: item.color },
                activeStyleHandler(index),
              ]} />
          ))}
        </View>
        <Editor
          editTextsArray={(prop, value) => editTextsArray(prop, value)}
          editFontSize={value => editFontSize(value)}
          addNewText={() => addNewText()}
        />
      </ExampleContextProvider>
    </GestureHandlerRootView>
  );
};

const _exampleStyles = StyleSheet.create({
  gestureRootStyles: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    backgroundColor: '#fff',
    flex: 3,
  },
  externalBorder: {
    borderStyle: 'dashed',
    borderColor: 'gray',
  },
  editorContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  addTextButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 10,
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontOptions: {
    margin: 2,
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  colorOptions: {
    margin: 4,
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
});
export default App;
