import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Button,
  useWindowDimensions,
  Platform,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import ImageInput from "../components/ImageInput";
import ImageInputList from "../components/ImageInputList";
// import { Input } from "reactstrap";

const formValidationSchema = Yup.object().shape({
  product_name: Yup.string()
  .required("Required!")
    .min(3, "Its too Short")
    .max(50, "Its too Long")
    .label("Product Name"),
  price: Yup.number()
    .required("Required!")
    .label("Price")
    .typeError("Input must be number type"),
  stock: Yup.number()
    .required("Required!")
    .typeError("Input must be number type"),
  description_short: Yup.string().max(120, "Maximum limit Exceeded"),
  description_long: Yup.string().max(250, "Maximum limit Exceeded"),
  images: Yup.array()
    .min(1, "Please Select at least One image")
    .max(6)
    .label("Images"),
});

function AddProductScreen(props) {
  const [isloading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const styles2 = StyleSheet.create({
    inputContainer: {
      flex: 1,
      alignItems: `${width > 500 ? "center" : "baseline"}`,
      margin: 12,
      flexDirection: `${width > 500 ? "row" : "column"}`,
      justifyContent: `${width > 500 ? "space-between" : "center"}`,
      textAlign: "left",
    },
    inputInnerContainer: {
      flexDirection: "column",
      width: `${width > 500 ? "50%" : "100%"}`,
      alignSelf: "flex-end",
    },
  });

  const submitRequest = (values_n) => {
    console.log(values_n);
    values_n.images = []
    let url = "http://192.168.0.109:8005";
    fetch(url + "/api/v1/admin/createproduct", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values_n),
    })
    .then((res) => res.json())
    .then((res) => {
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
  };

  return (
    <ScrollView
      style={{ flex: 1, flexDirection: "column" }}
      contentContainerStyle={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Your Product </Text>
      </View>
      <Formik
        initialValues={{
          product_name: "",
          price: "",
          images: [],
          stock: "",
          description_short: "",
          description_long: "",
        }}
        validationSchema={formValidationSchema}
        onSubmit={(values_n, formikAction) => {
          setLoading(true);
          console.log("1111asdad")
          setTimeout(() => {
            alert("Submitted!");
            submitRequest(values_n)
            formikAction.resetForm();
          }, 1000);
        }}
      >
        {({
          handleChange,
          handleSubmit,
          values,
          errors,
          touched,
          handleBlur,
          setFieldTouched
        }) => (
          <View style={styles.formContainer}>
            <View style={styles2.inputContainer}>
              <View>
                <Text>Product Name : </Text>
              </View>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="product_name"
                  style={styles.inputField_1}
                  placeholder="Product Name"
                  value={values.product_name}
                  onChangeText={handleChange("product_name")}
                  onBlur={()=>setFieldTouched("product_name")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.product_name && touched.product_name ? (
                  <Text style={styles.errorText}>{errors.product_name}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer}>
              <Text>Price : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="price"
                  style={styles.inputField_1}
                  placeholder="Price"
                  value={values.price}
                  onChangeText={handleChange("price")}
                  onBlur={()=>setFieldTouched("price")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.price && touched.price ? (
                  <Text style={styles.errorText}>{errors.price}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer}>
              <Text>Available Stock : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="stock"
                  style={styles.inputField_1}
                  value={values.stock}
                  onChangeText={handleChange("stock")}
                  onBlur={()=>setFieldTouched("stock")}
                  placeholderTextColor="#a0adc3"
                />
                {errors.stock && touched.stock ? (
                  <Text style={styles.errorText}>{errors.stock}</Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer}>
              <Text>Short Description : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="description_short"
                  style={styles.inputField_2}
                  placeholder="Short Description"
                  value={values.description_short}
                  onChangeText={handleChange("description_short")}
                  onBlur={()=>setFieldTouched("description_short")}
                  multiline
                  numberOfLines={2}
                  placeholderTextColor="#a0adc3"
                />
                {errors.description_short && touched.description_short ? (
                  <Text style={styles.errorText}>
                    {errors.description_short}
                  </Text>
                ) : null}
              </View>
            </View>
            <View style={styles2.inputContainer}>
              <Text>Long Description : </Text>
              <View style={styles2.inputInnerContainer}>
                <TextInput
                  name="description_long"
                  style={styles.inputField_3}
                  placeholder="Long Description"
                  value={values.description_long}
                  onChangeText={handleChange("description_long")}
                  onBlur={()=>setFieldTouched("description_long")}
                  multiline
                  numberOfLines={5}
                  placeholderTextColor="#a0adc3"
                />
                {errors.description_long && touched.description_long ? (
                  <Text style={styles.errorText}>
                    {errors.description_long}
                  </Text>
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
            <View style={{ flexDirection: "column" }}>
              <ImageInputList name={"images"} />
              {errors.images && touched.images ? (
                <Text style={styles.errorText}>{errors.images}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer} onPress={handleSubmit}>
              <Button title="Submit" onPress={handleSubmit} />
              {/* <Image source={require('../images/loading_mid.gif')} style={{width: 32, height: 32, display: `${isloading ? 'block' : 'none'}`}} resizeMode={'contain'} /> */}
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
    padding: 8,
    maxWidth: 700,
    marginHorizontal: "auto",
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
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#fff", //Values.white
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: "top",
  },
  inputField_3: {
    height: 100,
    width: "100%",
    marginVertical: 15,
    backgroundColor: "#fff", //Values.white
    borderRadius: 8,
    padding: 5,
    paddingLeft: 10,
    textAlignVertical: "top",
  },
  errorText: {
    fontSize: 16,
    color: "#f00", //Values.red,
  },
  buttonContainer: {
    width: 120,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    flexDirection: "row",
  },
});

export default AddProductScreen;
