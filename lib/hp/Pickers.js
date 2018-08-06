class Pickers {
    static pickGreen() {
        let ticketsObj = new Tickets();
        let greenTicket = ticketsObj.getGreenTicket();
        let greenTicketObj = new Ticket(greenTicket);
        let greenTicketUrl = greenTicketObj.getUrl();

        window.location.href = greenTicketUrl;
    }

    static pickRedEasy() {
        let ticketsObj = new Tickets();
        let redTicket = ticketsObj.getEasyRedTicket();
        let redTicketObj = new Ticket(redTicket);
        let redTicketUrl = redTicketObj.getUrl();

        window.location.href = redTicketUrl;
    }

    static pickRedNew() {
        let ticketsObj = new Tickets();
        let redTicket = ticketsObj.getRedTicket();
        let redTicketObj = new Ticket(redTicket);
        let redTicketUrl = redTicketObj.getUrl();

        window.location.href = redTicketUrl;
    }

    static pickAllThanks() {
        let tickets = new Tickets();
        let thanks = tickets.getThanks();

        if (thanks.length === 0) {
            alert("no thanks :(");
            return;
        }

        thanks.forEach(function (ticket) {
            let ticketObj = new Ticket(ticket);
            window.open(ticketObj.getUrl(), '_blank');
        });
    }

    static pickOldestThank() {
        let tickets = new Tickets();
        let thanks = tickets.getThanks();

        if (thanks.length === 0) {
            alert("no thanks :(");
            return;
        }

        let ticketObj = new Ticket(thanks[0]);
        window.location.href = ticketObj.getUrl();
    }

    static renderPanel() {
        if (document.getElementById("_frt_actions") === null && document.querySelector("beget-header > div > div:nth-child(3)") !== null) {
            document.querySelector("beget-header > div > div:nth-child(3)").insertAdjacentHTML("afterbegin", pickPanel);
            document.querySelector("head").insertAdjacentHTML("beforeend", pickPanelStyle);

            document.querySelector("#_frt_actions .thx").onclick = Pickers.pickAllThanks;
            document.querySelector("#_frt_actions .pickOldestThank").onclick = Pickers.pickOldestThank;
            document.querySelector("#_frt_actions .pickMostGreen").onclick = Pickers.pickGreen;
            document.querySelector("#_frt_actions .pickRedEasy").onclick = Pickers.pickRedEasy;
            document.querySelector("#_frt_actions .pickRedNew").onclick = Pickers.pickRedNew;

            document.querySelector("#_frt_actions .ban").onclick = Ticket.banThisTicket;
            document.querySelector("#_frt_actions .ban_cleaner").onclick = Tickets.clearBanList;
        }
    }
}
