class Notificator {
    static notifyAboutLongTicket() {
        let tickets = Tickets.getTicketsInSolving();

        tickets.forEach(function (ticket) {
            let minutes = (Date.now() - Date.parse(ticket.assigned_at)) / 1000 / 60;
            if (minutes > 5) {
                new Notification("YOU GOT COLD TICKET", {
                    body: "Ticket " + ticket.id + " waiting answer " + (minutes | 0) + " minutes and needs your interaction",
                    icon: "https://hp.beget.ru/favicon.ico"
                });

                let audio = new Audio("http://git.ford-rt.com/ttimer/assets/snd/critical.wav");
                audio.volume = 0.1;
                audio.play();
            }
        });
    }
}
