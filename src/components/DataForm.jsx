import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import {useDispatch, useSelector } from 'react-redux';
// import Box from '@mui/material/Box';
// import {Button, AppBar, CssBaseline, Toolbar, Container} from '@mui/material';
// import Users from "../data/Users"

import { useFormik } from "formik";
import { basicSchema } from "../schemas";


const onSubmit = async (values, actions) => {
  console.log(values)
  console.log(actions)
  await new Promise((resolve) => setTimeout(resolve, 1000));
  actions.resetForm()
}

const DataForm = () => {
  const {values, errors, isSubmitting, touched, handleBlur, handleChange, handleSubmit} = useFormik({
      initialValues: {
        firstname: "",
          age: '',
          lastname: '',
          confirmPassword: ''
      },
      validationSchema: basicSchema,
      onSubmit,
  })
  
 console.log(errors)
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <label htmlFor="firstname">Firstname</label>
      <input 
          value={values.firstname}
          onChange={handleChange}
          onBlur={ handleBlur }
          id="firstname" 
          type="text" 
          placeholder="Enter your Firstname" 
          className={errors.firstname && touched.firstname ? "input-error" : ""}
      />
      {errors.firstname && touched.firstname && <p className="error">{errors.firstname}</p>}
      
      <label htmlFor="lastname">Lastname</label>
      <input 
          value={values.lastname}
          onChange={handleChange}
          onBlur={ handleBlur }
          id="lastname" 
          type="text" 
          placeholder="Enter your lastname" 
          className={errors.lastname && touched.lastname ? "input-error" : ""}
      />
      {errors.lastname && touched.lastname && <p className="error">{errors.lastname}</p>}

      <label htmlFor="age">Age</label>
      <input 
          value={values.age}
          onChange={handleChange}
          onBlur={ handleBlur }
          id="age" 
          type="number" 
          placeholder="Enter your age" 
          className={errors.age && touched.age ? "input-error" : ""}
      />
      {errors.age && touched.age && <p className="error">{errors.age}</p>}

      <label htmlFor="occupation">Confirm Password</label>
      <input 
          value={values.occupation}
          onChange={handleChange}
          onBlur={ handleBlur }
          id="occupation" 
          type="text" 
          placeholder="Occupation" 
          className={errors.occupation && touched.occupation ? "input-error" : ""}
      />
      {errors.occupation && touched.occupation && <p className="error">{errors.occupation}</p>}
     

      <label htmlFor="stateOfOrigin">Confirm Password</label>
      <input 
          value={values.stateOfOrigin}
          onChange={handleChange}
          onBlur={ handleBlur }
          id="stateOfOrigin" 
          type="text" 
          placeholder="State Of Origin" 
          className={errors.stateOfOrigin && touched.stateOfOrigin ? "input-error" : ""}
      />
      {errors.stateOfOrigin && touched.stateOfOrigin && <p className="error">{errors.stateOfOrigin}</p>}
      <button disabled={isSubmitting} type="submit">Submit</button>
    </form>
  );
};
export default DataForm;



















// function DataForm() {
//   const { open } = useSelector(state => state.counter);
//   const dispatch = useDispatch();
//   const [data, setData] = React.useState({firstName: "", lastName: "", age: "", occupation: "", stateOfOrigin: ""})
//   const handleChange = (e) => {
//       const name = e.target.name;
//       //  console.log(name)
//       const value = e.target.value;
//       setData({...data, [name]: value})
//   }

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       // data.map(i => {
//       //   localStorage.setItem(i., users)
//       // })

//       // const keys = Object.keys(data)
//       // keys.forEach(key => {
//       //   localStorage.setItem(key, data.key)
//       // })

//       const user = {
//           firstName: data.firstName,
//           lastName: data.lastName,
//           age: data.age,
//           occupation: data.occupation,
//           stateOfOrigin: data.stateOfOrigin
//       }
//       // useEffect(() => {
//       //   localStorage.setItem('item', JSON.stringify(item));
//       // }, [item]);

//       //users.push(user)
//       // console.log(users)
//       // users.map(i => {
//       //   console.log(i)
//          localStorage.setItem(user.firstName, user)
//       // })
//       let myNew = []
//       for (const k in localStorage) {
//         if (localStorage.hasOwnProperty(k)) {
//           console.log(user[0], user);
//            myNew =localStorage.getItem(localStorage[k])
//            console.log(myNew)
//         }
//       }
//   }
// return (
//   <Box
//     component="form"
//     sx={{
//       '& > :not(style)': { m: 1, width: '100%', ml:"0" },
//     }}
//     noValidate
//     autoComplete="off"
//     onSubmit={e => {
//       e.preventDefault()
//       handleSubmit(e);
//       dispatch(handleClose())
//     }}
//   >
//     <TextField id="firstName" label="Firstname" name='firstName' variant="outlined" onChange={handleChange} value={data.firstName} />
//     <TextField id="lastName" label="Lastname" name='lastName' variant="outlined" onChange={handleChange} value={data.lastName}/>
//     <TextField id="age" label="Age" name='age' type="number" variant="outlined" required onChange={handleChange} value={data.age}/>
//     <TextField id="occupation" name='occupation' label="Occupation" variant="outlined" onChange={handleChange} value={data.occupation} />
//     <TextField id="stateOfOrigin" name='stateOfOrigin' label="State of Origin" variant="outlined" onChange={handleChange} value={data.stateOfOrigin}/>
//     <Button id='submit' type='submit' sx={{display: "block", bgcolor:"primary.main", color: "common.black", width:"100%"}} >Submit </Button>
//   </Box>
// );
// }


// export default DataForm