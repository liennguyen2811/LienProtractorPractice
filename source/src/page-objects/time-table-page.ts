import GeneralPage from "@page-objects/general-page";

export default class TimeTablePage extends GeneralPage{
    private static _timeTablePage: TimeTablePage;

    // element

    public static async getTimeTablePageInstance(): Promise<TimeTablePage>{
        this._timeTablePage = new TimeTablePage();
        return this._timeTablePage;
    }

}