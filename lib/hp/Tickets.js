class Tickets {
    static clearBanList() {
        localStorage.setItem('blockedThreads', '');
    }

    /**
     * Get banned tickets
     * @returns {Set<string>}
     */
    static getBannedTickets() {
        let blockedThreads = localStorage.getItem('blockedThreads'); //save all blocked topics to object prop
        if (blockedThreads === null || blockedThreads === "") {
            this.blockedThreads = [];
        } else {
            blockedThreads = JSON.parse(blockedThreads);
        }
        blockedThreads = new Set(blockedThreads);

        return blockedThreads;
    }

    /**
     * Just get all tickets
     * @returns {NodeListOf<Element>}
     */
    static getTickets() {
        return document.querySelectorAll("#tickets-table tbody tr");
    }

    static getTicketsInSolving() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://api-internal.beget.com/helpdesk/ticket/all', false);
        xhr.setRequestHeader("authorization", "Bearer " + Cookies.get('begetInnerJWT'));
        xhr.send(JSON.stringify({
            "scope": [
                {
                    "by_employee_id": {
                        "employee_id": [Worker.getId()]
                    }
                }
            ]
        }));

        let tickets = JSON.parse(xhr.response).ticket;

        return tickets;
    }

    static hideBannedTickets() {
        let blockedThreads = Tickets.getBannedTickets();

        if (window.location.pathname === "/queue/2" || window.location.pathname === "/queue/13") {
            document.querySelectorAll("#tickets-table tbody tr td.subject-row a").forEach(ticket => {
                if (blockedThreads.has(ticket.pathname) === true) {
                    ticket.parentNode.parentNode.remove();
                }
            });
        }
    }

    /**
     * Get ticket with less answers and more awaiting time
     * @returns {*}
     */
    getEasyRedTicket() {
        let tickets = Tickets.getTickets();

        //answers -> time
        let sortedTickets = [...tickets].sort(function (ticket1, ticket2) {
            let ticket1Obj = new Ticket(ticket1);
            let ticket2Obj = new Ticket(ticket2);

            if (ticket1Obj.getAnswers() !== ticket2Obj.getAnswers()) {
                return ticket1Obj.getAnswers() - ticket2Obj.getAnswers();
            }

            if (ticket1Obj.getTimeInMinutes() !== ticket2Obj.getTimeInMinutes()) {
                return ticket2Obj.getTimeInMinutes() - ticket1Obj.getTimeInMinutes();
            }

            return 0;
        });

        return sortedTickets[0];
    }

    getGreenTicket() {
        let tickets = Tickets.getTickets();

        //answers -> time
        let sortedTickets = [...tickets].sort(function (ticket1, ticket2) {
            let ticket1Obj = new Ticket(ticket1);
            let ticket2Obj = new Ticket(ticket2);

            if (ticket1Obj.getAnswers() !== ticket2Obj.getAnswers()) {
                return ticket1Obj.getAnswers() - ticket2Obj.getAnswers();
            }

            if (ticket1Obj.getTimeInMinutes() !== ticket2Obj.getTimeInMinutes()) {
                return ticket1Obj.getTimeInMinutes() - ticket2Obj.getTimeInMinutes();
            }

            return 0;
        });

        return sortedTickets[0];
    }

    /**
     * Sort by client importance (Dedicated servers -> VIP -> Simple shared)
     * Less answers, more awaiting time
     * Filter out tickets from simple shared hosting without answers
     * @returns {*}
     */
    getRedTicket() {
        let tickets = Tickets.getTickets();

        //client type -> answers -> time
        let sortedTickets = [...tickets].sort(function (ticket1, ticket2) {
            let ticket1Obj = new Ticket(ticket1);
            let ticket2Obj = new Ticket(ticket2);

            if (ticket1Obj.getClientType() !== ticket2Obj.getClientType()) {
                return ticket2Obj.getClientType() - ticket1Obj.getClientType();
            }

            if (ticket1Obj.getAnswers() !== ticket2Obj.getAnswers()) {
                return ticket1Obj.getAnswers() - ticket2Obj.getAnswers();
            }

            if (ticket1Obj.getTimeInMinutes() !== ticket2Obj.getTimeInMinutes()) {
                return ticket2Obj.getTimeInMinutes() - ticket1Obj.getTimeInMinutes();
            }

            return 0;
        });

        let filteredTickets = sortedTickets.filter(function (ticket) {
            let ticketObj = new Ticket(ticket);
            return !(ticketObj.getAnswers() === 1 && ticketObj.getClientType() === 2);
        });

        return filteredTickets[0];
    }

    /**
     * Just get all tickets, marked as thanks
     * @returns {*[]}
     */
    getThanks() {
        let tickets = Tickets.getTickets();

        //filter thanks
        let thanks = [...tickets].filter(function (ticket) {
            let ticketObj = new Ticket(ticket);
            return ticketObj.isThx();
        });

        //sort thanks by time, oldest first
        thanks = thanks.sort(function (ticket1, ticket2) {
            let ticket1Obj = new Ticket(ticket1);
            let ticket2Obj = new Ticket(ticket2);

            return ticket2Obj.getTimeInMinutes() - ticket1Obj.getTimeInMinutes();
        });

        return thanks;
    }
}
