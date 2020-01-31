import dispatcher from "../../library/common/Dispatcher";
import {EventEmitter} from "events";
import * as AccountActions from "../../modules/account/AccountActions";

class AccountStore extends EventEmitter {

    constructor() {
        super();
        dispatcher.register(this.handleActions.bind(this));
        this.userList = [];
        this.accountActivity = [];
    }

    handleActions({type,list=[],user={}}) {
        switch (type) {
            case AccountActions.ACCOUNT_ACTIONS.CREATE_ACCOUNT: {
                this.currentUser = action.user;
               ////console.log("values in store" ,action)
                localStorage.setItem("token",action.user.access_token)
                this.emit("accountCreated");
                break;
            }
            case AccountActions.ACCOUNT_ACTIONS.UPDATE_ACCOUNT: {
                ////console.log("values in store" ,action.error)
                this.emit("accountUpdated");
                break;
            }
            case AccountActions.ACCOUNT_ACTIONS.VIEW_ACCOUNT: {
                ////console.log("values in store" ,action.error)
                this.emit("accountDetails");
                break;
            }
            case AccountActions.ACCOUNT_ACTIONS.DELETE_ACCOUNT: {
                ////console.log("values in store" ,action.error)
                this.emit("accountDeleted");
                break;
            }
            case AccountActions.ACCOUNT_ACTIONS.LIST_ACCOUNT: {
                ////console.log("values in store" ,action)
                this.userList = list  
                this.emit("accountListed");
                break;
            }
            case AccountActions.ACCOUNT_ACTIONS.TRANSACTION_HISTORY: {
                ////console.log("values in store" ,action)
                this.accountActivity = list  
                this.emit("accountListed");
                break;
            }
            default: {
            }
        }
    }


}

export default new AccountStore();