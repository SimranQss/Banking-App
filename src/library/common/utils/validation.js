import INPUTFIELDS from 'constants'

export function validateInput(Fieldtype,input){
    let error = '';
    switch(Fieldtype){
        case INPUTFIELDS.EMAIL_TYPE: {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input)) {
            error = "*Please enter valid email-ID.";
          }
            break;
        }
        case INPUTFIELDS.CONTACT_TYPE : {
            if (!input.match(/^[0-9]{10}$/)) {
                error = "*Please enter valid contact no.";
              }
            break;
        }
        case INPUTFIELDS.NAME_TYPE :{
            if (input.match(/^[a-zA-Z ]*$/)) {
                error = "*Please enter alphabet characters only.";
              }
            break;
        }
        case INPUTFIELDS.PASSWORD_TYPE : {
            if (!input.match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                error = "*Please enter secure and strong password.";
              }
            break;
        }
        default : {
             error = null;
        }
    }
    return error;
}

export function isEmpty(input){
  if(input !== null || input !== undefined || input !== '')
   return false;
 return true;
}