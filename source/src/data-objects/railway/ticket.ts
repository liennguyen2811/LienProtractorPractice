import { Utility } from "@utilities/general/utility";
//import { Station, SeatType } from "..general/test-run-info";
import { Station, SeatType } from "@data-objects/general/test-run-info";

export class Ticket{

        private departdate: string ="";
        private departstation: string = "";
        private arrivestation: string = "";
        private seattype:string ="";
        private ticketamount: number = 0;

        get DepartDate():string {
            return this.departdate;
        }
        set DepartDate(departdate:string) {
            this.departdate = departdate;
        }
        get DepartStation():string {
            return this.departstation;
        }
        set DepartStation(departstation:string) {
            this.departstation= departstation;
        }
        get ArriveStation():string {
            return this.arrivestation;
        }
        set ArriveStation(arrivestation:string) {
            this.arrivestation= arrivestation;
        }
        get SeatType():string {
            return this.seattype;
        }
        set SeatType(seattype:string) {
            this.seattype= seattype;
        }
        get TicketAmount():number {
            return this.ticketamount;
        }
        set TicketAmount(ticketamount:number) {
            this.ticketamount= ticketamount;
        }

        public GenerateTicket(): Ticket
        {
            this.departdate = Utility.addDateToCurrentDate(1);
            this.departstation = Utility.GenerateStation();
            this.seattype = Utility.GenerateStation();
            this.ticketamount = 1;
           // this.ArriveStation = Constant.stations[this.DepartFrom][new Random().Next(Constant.stations[this.DepartFrom].Count())];
             return this;
        }
        public Ticket(departstation:Station,arrivestation: Station, seattype: SeatType, ticketamount: number)
        {
            this.departstation = Utility.TranslateStation(departstation);
            this.arrivestation = Utility.TranslateStation(arrivestation);
            this.departdate = Utility.addDateToCurrentDate(1);
            this.seattype = Utility.TranslateSeatType(seattype);
            this.ticketamount = ticketamount;
        }
        public Ticket1(departdate: string, departstation: Station, arrivestation: Station, seattype: SeatType, ticketamount: number)
        {
            this.departstation = Utility.TranslateStation(departstation);
            this.arrivestation = Utility.TranslateStation(arrivestation);
            this.departdate = Utility.addDateToCurrentDate(1);
            this.seattype = Utility.TranslateSeatType(seattype);
            this.ticketamount = ticketamount;
        }
}