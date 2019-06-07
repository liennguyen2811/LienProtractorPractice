import { Utility } from "../../utilities/general/utility";
import { errorwrapper } from "../../utilities/protractor-wappers/error-wapper";


export class Account{
    private email: string = "";
    private password: string ="";
    private confirmpassword: string ="";
    private regPID: string = "";

    public initAccount(): Account{
        try{
            this.email = Utility.getRandomGmailByIndex();
            this.password = Utility.createRandomString(6);
            this.confirmpassword = this.password;
            this.regPID = Utility.createRandomString(6);
            return this;
        } catch (err){
            throw new errorwrapper.CustomError(this.initAccount, err.message);
            
        }
    }
}