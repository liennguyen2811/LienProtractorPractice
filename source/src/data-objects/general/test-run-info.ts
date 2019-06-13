
export default class TestRunInfo{
    static browser: string = "Chrome";
    static elementTimeout: number = 60;
    static testTimeout: number = 40000;
    static shortTimeout: number;
    static pageTimeout: number = 60;
    static conditionTimeout: number = 20000

	static RAILWAY_URL: string = "http://18.136.107.136/Account/Login.cshtml";
	static USERNAME : string = "liennguyenlogigear12@gmail.com";
    static PASSWORD : string= "liennguyen";
    // check
}
export enum Station
    {
        SAIGON,
        PHANTHIET,
        NHATRANG,
        DANANG,
        HUE,
        QUANGNGAI
    }
export enum SeatType
    {
        HARDSEAT,
        SOFTSEAT,
        SOFTSEATWITHAIR,
        HARDBED,
        SOFTBED,
        SOFTBEDWITHAIR
    }