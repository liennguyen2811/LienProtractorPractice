import { Utility } from "@utilities/general/utility";
import { errorwrapper } from "@utilities/protractor-wappers/error-wapper";


export class Account{
    private email: string = "";
    private password: string ="";
    private confirmpassword: string ="";
    private regPID: string = "";

    get Email():string {
        return this.email;
    }
    set Email(email:string) {
        this.email = email;
    }
    get Password():string {
        return this.email;
    }
    set Password(password:string) {
        this.email = password;
    }
    get ConfirmPassword():string {
        return this.confirmpassword;
    }
    set ConfirmPassword(confirmpassword:string) {
        this.confirmpassword = confirmpassword;
    }
    get RegPID():string {
        return this.regPID;
    }
    set RegPID(regPID:string) {
        this.regPID = regPID;
    }

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