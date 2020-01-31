import dispatcher from "../../library/common/Dispatcher";
import {EventEmitter} from "events";
import * as LoginActions from "../../modules/login/LoginActions";

class LoginStore extends EventEmitter {

    constructor() {
        super();
        dispatcher.register(this.handleActions.bind(this));
        this.isAdmin = this.isAdmin.bind(this); //check ;not working
    }

    handleActions({type,user={},isAdmin=false,error=""}) {
        switch (type) {
            case LoginActions.LOGIN_ACTIONS.LOGIN_USER: {
                this.currentUser = user;
                this.isAdmin = isAdmin;
                localStorage.setItem("token",user.access_token) //check nested destructing not working
                localStorage.setItem("isAdmin",isAdmin) 
                this.emit("loginSuccessful");
                break;
            }
            case LoginActions.LOGIN_ACTIONS.LOGIN_FAILED: {
                this.emit("loginError");
                break;
            }
            default: {
            }
        }
    }

    getCurrentUser(){
      return this.currentUser;
    }

    isAdmin(){ //check ;not working
      return localStorage.getItem("isAdmin");
    }

    getUserStatus() {
        return !!localStorage.getItem("token");
    }
}

export default new LoginStore();