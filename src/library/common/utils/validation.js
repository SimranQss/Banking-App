import INPUTFIELDS from 'constants';

const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i),

//  function validateInput(Fieldtype,input){
//     let error = '';
//     switch(Fieldtype){
//         case INPUTFIELDS.EMAIL_TYPE: {
//             var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//             if (!pattern.test(input)) {
//             error = "*Please enter valid email-ID.";
//           }
//             break;
//         }
//         case INPUTFIELDS.CONTACT_TYPE : {
//             if (!input.match(/^[0-9]{10}$/)) {
//                 error = "*Please enter valid contact no.";
//               }
//             break;
//         }
//         case INPUTFIELDS.NAME_TYPE :{
//             if (input.match(/^[a-zA-Z ]*$/)) {
//                 error = "*Please enter alphabet characters only.";
//               }
//             break;
//         }
//         case INPUTFIELDS.PASSWORD_TYPE : {
//             if (!input.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
//                 error = "*Please enter secure and strong password.";
//               }
//             break;
//         }
//         default : {
//              error = null;
//         }
//     }
//     return error;
// }

validateOnSubmit = (fields,errors,callback) => {
  let isValid = true;
  Object.values(errors).forEach(
    (val) => (val.length > 0 && (isValid = false))
  );
  Object.values(fields).forEach( 
    (val) => {
       (val.length === 0 && (isValid = false))
    }
  )
  callback(isValid);
}

 function validateInput(Fieldtype,input){
    let error = '';
    switch (Fieldtype) {
        case 'emailId': {
          if(input.length > 0){
            // errors.emailId = 
            error = validEmailRegex.test(input)
             ? ''
              : 'Email is not valid!';}
          else
            // errors.emailId = 'Field can\'t be empty'
            error = 'Field can\'t be empty'
            break;
        }
        case 'password': {
          if(input.length > 0){
            // errors.password = 
            error =
            input.length < 8
              ? 'Password must be 8 characters long!'
              : '';}
          else
          error = 'Field can\'t be empty'
            // errors.password = 'Field can\'t be empty'
            break;
        }
        default:
          break;
      }
      return error;
}
 function isEmpty(input){
  if(input !== null || input !== undefined || input !== '')
   return false;
 return true;
}

export {validateOnSubmit,validateInput,isEmpty}