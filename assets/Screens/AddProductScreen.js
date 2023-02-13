import React, { useEffect, useState } from "react";
import { View,  StyleSheet,  TextInput,  Text,  Button,  useWindowDimensions,  Platform, ScrollView} from "react-native";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
// import { platform } from "os";

const formValidationSchema = Yup.object().shape({
  productname: Yup.string()
    .min(3, "Its too Short")
    .max(20, "Its too Long")
    .label("Product Name")
    .required("Required"),
  price: Yup.number()
    .required("Required!")
    .positive()
    .label("Price")
    .typeError("Input must be number type"),
  avlStock: Yup.number("Value must be number")
    .required("Required!")
    .typeError("Input must be number type"),
  srtDes: Yup.string().max(120, "Maximum limit Exceeded"),
  lngDes: Yup.string().max(250, "Maximum limit Exceeded"),
});

const inputwidth = Platform.OS == "web" ? "100%" : "100%";
// const inputwidth = "100%"

// {console.log(ans);}
function AddProductScreen(props) {
  const { width } = useWindowDimensions();
  const styles2 = StyleSheet.create({
    inputContainer: {
      flex: 1,
      alignItems: `${width > 500 ? "center" : 'baseline'}`,
      margin:12,
      flexDirection: `${width > 500 ? "row" : "column"}`,
      justifyContent: `${width > 500 ? "space-between" : "center"}`,
      textAlign: 'left'
    },
    inputInnerContainer: {
      flexDirection: "column",
      width: `${width > 500 ? "50%" : "100%"}`,
      alignSelf: 'flex-end',
    }
  });
  return (
    <ScrollView style={{flex:1,flexDirection:"column"}} contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Your Product </Text>
      </View>
      <Formik
        initialValues={{
          productname: "",
          price: "",
          avlStock: "",
          srtDes: "",
          lngDes: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values_n, formikAction) => {
          setTimeout(() => {
            alert("Submitted!");
            console.log(values_n);
            formikAction.resetForm();
          }, 2000);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
          handleBlur,
        }) => (
          <View style={styles.formContainer}>
            <View style={styles2.inputContainer} >
              <View>
                <Text>Product Name : </Text>
              </View>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="productname"
                  style={styles.inputField_1}
                  placeholder="Product Name"
                  value={values.productname}
                  onChange={handleChange("productname")}
                  onBlur={handleBlur("productname")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.productname && touched.productname ? (
                  <Text style={styles.errorText}>{errors.productname}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer} >
              <Text>Price : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="price"
                  style={styles.inputField_1}
                  placeholder="Price"
                  value={values.price}
                  onChange={handleChange("price")}
                  onBlur={handleBlur("price")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.price && touched.price ? (
                  <Text style={styles.errorText}>{errors.price}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer} >
              <Text>Available Stock : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="avlStock"
                  style={styles.inputField_1}
                  value={values.avlStock}
                  onChange={handleChange("avlStock")}
                  onBlur={handleBlur("avlStock")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.avlStock && touched.avlStock ? (
                  <Text style={styles.errorText}>{errors.avlStock}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer} >
              <Text>Short Description : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="srtDes"
                  style={styles.inputField_2}
                  placeholder="Short Description"
                  value={values.srtDes}
                  onChange={handleChange("srtDes")}
                  onBlur={handleBlur("srtDes")}
                  multiline
                  numberOfLines={2}
                  placeholderTextColor="#a0adc3"
                />
                {errors.srtDes && touched.srtDes ? (
                  <Text style={styles.errorText}>{errors.srtDes}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer} >
              <Text>Long Description : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="lngDes"
                  style={styles.inputField_3}
                  placeholder="Long Description"
                  value={values.lngDes}
                  onChange={handleChange("lngDes")}
                  onBlur={handleBlur("lngDes")}
                  multiline
                  numberOfLines={5}
                  placeholderTextColor="#a0adc3"
                />
                {errors.lngDes && touched.lngDes ? (
                  <Text style={styles.errorText}>{errors.lngDes}</Text>
                ) : null}
              </View>
            </View>
            {/* <Input
                type="file"
                name="images"
                onChange={(e) => {
                  setFieldValue("images", e.target);
                }}
                multiple
              /> */}

            <View style={styles.buttonContainer}>
              <Button title="Submit" onPress={handleSubmit} />
            </View>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    paddingVertical: 40,
    padding:8,
    maxWidth:700,marginHorizontal:"auto"
  },
  header: {
    marginVertical: 20,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 30,
  },
  formContainer: {
    flex: 1,
    // alignItems:"center"
  },
  inputField_1: {
    height: 40,
    marginVertical: 15,
    backgroundColor: "#fff", //Values.white
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    // flex:1,
  },
  inputField_2: {
    height: 60,
    width: inputwidth,
    marginVertical: 15,
    backgroundColor: "#fff", //Values.white
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: 'top'
  },
  inputField_3: {
    height: 100,
    width: inputwidth,
    marginVertical: 15,
    backgroundColor: "#fff", //Values.white
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: 'top'
  },
  errorText: {
    fontSize: 16,
    color: "#f00", //Values.red,
  },
  buttonContainer: {
    width: 80,
    height: 40,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
});

export default AddProductScreen;
