import React from "react";
import { View, StyleSheet, TextInput, Text, Button, Alert } from "react-native";
import { Input } from "reactstrap";
import { Formik } from "formik";
import * as Yup from "yup";
//import Values from "../config/Values";

const formValidationSchema = Yup.object().shape({
  productname: Yup.string()
    .min(2,'Its too Short')
    .max(20,'Its too Long')
    .required("Product name is Required"),
  price: Yup.number('Input must be number type').positive().required("Price is Required"),
  avlStock: Yup.number().required("Number of Avilable Stock is Required"),
  srtDes: Yup.string().max(120,'Maximum limit Exceeded'),
  lngDes: Yup.string().max(250,'Maximum limit Exceeded'),
});

function AddProductScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Your Product </Text>
      </View>
      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            productname: "",
            price: "",
            avlStock: "",
            srtDes: "",
            lngDes: "",
            images: null,
          }}
          validationSchema={formValidationSchema}
          onSubmit={(values_n,formikAction) => {
            setTimeout(()=>{
              alert("Submitted!");
              console.log(values_n);
              formikAction.resetForm();
            },2000);
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
            <>
              <TextInput
                name="productname"
                style={styles.inputField}
                placeholder="Product Name"
                value={values.productname}
                onChange={handleChange("productname")}
                onBlur={handleBlur("productname")}
              />
              {errors.productname && touched.productname && (
                <Text style={styles.errorText}>{errors.productname}</Text>
              )}
              <TextInput
                name="price"
                style={styles.inputField}
                placeholder="Price"
                value={values.price}
                onChange={handleChange("price")}
                onBlur={handleBlur("price")}
              />
              {errors.price && touched.price && (
                <Text style={styles.errorText}>{errors.price}</Text>
              )}
              <TextInput
                name="avlStock"
                style={styles.inputField}
                placeholder="Aviable stock"
                value={values.avlStock}
                onChange={handleChange("avlStock")}
                onBlur={handleBlur("avlStock")}
              />
              {errors.avlStock && touched.avlStock && (
                <Text style={styles.errorText}>{errors.avlStock}</Text>
              )}
              <TextInput
                name="srtDes"
                style={styles.inputField}
                placeholder="Short Description"
                value={values.srtDes}
                onChange={handleChange("srtDes")}
                onBlur={handleBlur("srtDes")}
              />
              {errors.srtDes && touched.srtDes && (
                <Text style={styles.errorText}>{errors.srtDes}</Text>
              )}
              <TextInput
                name="lngDes"
                style={styles.inputField}
                placeholder="Long Description"
                value={values.lngDes}
                onChange={handleChange("lngDes")}
                onBlur={handleBlur("lngDes")}
              />
              {errors.lngDes && touched.lngDes && (
                <Text style={styles.errorText}>{errors.lngDes}</Text>
              )}
              <Input
                type="file"
                name="images"
                onChange={(e) => {
                  setFieldValue("images", e.target);
                }}
                multiple
              />
              <View style={styles.buttonContainer}>
                <Button title="Submit" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 400,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center'
  },
  header: {
    marginVertical: 20,
  },
  headerText: {
    fontSize: 30,
  },
  formContainer: {
    flex: 1,
  },
  inputField: {
    height: 40,
    marginVertical: 15,
    backgroundColor: '#fff',//Values.white,
    borderRadius: 8,
    justifyContent: "center",
    padding: 5,
    paddingLeft: 10,
  },
  errorText: {
    fontSize: 16,
    color: '#f00' //Values.red,
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
