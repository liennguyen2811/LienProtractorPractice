
export default class Navigation{

    constructor(public value:string){ }

    toString(){
        return this.value;
    }
    
	Navigation(value: string) {
		this.value = value;
	}

	public getvalue(): string {
		return this.value;
    }
    
    static login = new Navigation("/Account/Login.cshtml");
    static logout = new Navigation("L/Account/Logout");
}