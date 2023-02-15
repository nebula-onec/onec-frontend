import { useFormikContext } from "formik";
import React, { useRef } from "react";
import { View, StyleSheet, ScrollView} from "react-native";
import ImageInput from "./ImageInput";

function ImageInputList({ name }) {
  const scrollView = useRef();
  const { setFieldValue, values } = useFormikContext();
  let imageUris = values[name];
  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal={true}
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View style={styles.imageContainer}>
              <ImageInput
                imageUri={uri}
                key={uri}
                onChangeImage={() => {
                  setFieldValue(
                    name,
                    values[name].filter((imageUri) => imageUri !== uri)
                  );
                }}
              />
            </View>
          ))}
          <ImageInput
            onChangeImage={(uri) => {
              setFieldValue(name, [...values[name], uri]);
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  imageContainer: {
    marginRight: 10,
  },
});

export default ImageInputList;
