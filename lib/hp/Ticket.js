class Ticket {
    constructor(e) {
        this.element = e;
    }

    static banThisTicket() {
        let blockedThreads = Tickets.getBannedTickets();
        blockedThreads.add(window.location.pathname);
        localStorage.setItem('blockedThreads', JSON.stringify([...blockedThreads]));
        window.location.href = "/queue/2";
    }

    getAnswers() {
        return parseInt(this.element.querySelector("td:last-child").innerHTML);
    }

    getClientType() {
        let txt0 = this.element.querySelector("td:nth-child(2) span").title.replace("Вес приоритета: ", "");
        return parseInt(txt0);
    }

    getTime() {
        return this.element.querySelector("td.last_action_wrapper span").innerHTML;
    }

    getTimeInMinutes() {
        let str = this.getTime();
        let time = 0;

        try {
            time += parseInt(str.match(/<b>(\d{1,2})\s+дн\./)[1]) * 24 * 60;
        } catch (err) {
            console.debug(err);
        }

        try {
            time += parseInt(str.match(/(\d{1,2})\s+ч\./)[1]) * 60;
        } catch (err) {
            console.debug(err);
        }

        try {
            time += parseInt(str.match(/(\d{1,2})\s+мин\./)[1]);
        } catch (err) {
            console.debug(err);
        }

        return time;
    }

    getUrl() {
        return this.element.querySelector(".subject-row a").href
    }

    isThx() {
        if (this.element.querySelector('span[title="Возможно, это спасибка"]') === null) {
            return false;
        }

        if (this.getAnswers() === 1) {
            return false;
        }

        return true;
    }
}
