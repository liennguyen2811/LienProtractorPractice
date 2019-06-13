"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("@utilities/general/utility");
class Ticket {
    constructor() {
        this.departdate = "";
        this.departstation = "";
        this.arrivestation = "";
        this.seattype = "";
        this.ticketamount = 0;
    }
    get DepartDate() {
        return this.departdate;
    }
    set DepartDate(departdate) {
        this.departdate = departdate;
    }
    get DepartStation() {
        return this.departstation;
    }
    set DepartStation(departstation) {
        this.departstation = departstation;
    }
    get ArriveStation() {
        return this.arrivestation;
    }
    set ArriveStation(arrivestation) {
        this.arrivestation = arrivestation;
    }
    get SeatType() {
        return this.seattype;
    }
    set SeatType(seattype) {
        this.seattype = seattype;
    }
    get TicketAmount() {
        return this.ticketamount;
    }
    set TicketAmount(ticketamount) {
        this.ticketamount = ticketamount;
    }
    GenerateTicket() {
        this.departdate = utility_1.Utility.addDateToCurrentDate(1);
        this.departstation = utility_1.Utility.GenerateStation();
        this.seattype = utility_1.Utility.GenerateStation();
        this.ticketamount = 1;
        return this;
    }
    Ticket(departstation, arrivestation, seattype, ticketamount) {
        this.departstation = utility_1.Utility.TranslateStation(departstation);
        this.arrivestation = utility_1.Utility.TranslateStation(arrivestation);
        this.departdate = utility_1.Utility.addDateToCurrentDate(1);
        this.seattype = utility_1.Utility.TranslateSeatType(seattype);
        this.ticketamount = ticketamount;
    }
    Ticket1(departdate, departstation, arrivestation, seattype, ticketamount) {
        this.departstation = utility_1.Utility.TranslateStation(departstation);
        this.arrivestation = utility_1.Utility.TranslateStation(arrivestation);
        this.departdate = utility_1.Utility.addDateToCurrentDate(1);
        this.seattype = utility_1.Utility.TranslateSeatType(seattype);
        this.ticketamount = ticketamount;
    }
}
exports.Ticket = Ticket;
//# sourceMappingURL=ticket.js.map