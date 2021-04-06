class AccountManager {
    static instance
    constructor() {
        const instance = this.constructor.instance;
        if (instance) {       
            console.log("hit only once")
            return instance;
        }
        this.constructor.instance = this;
    }
    
    authentication(credentials){
        //function to 
    }


  }
  
  export default AccountManager;
  
