class Worker {
    static getId() {
        return parseInt(document.querySelector("beget-header > div > div:nth-child(3) > div:nth-child(3) > div > img").src.match(/(\d{3})/)[0]);
    }

    static getTakenTickets() {
        let id = Worker.getId();
        let request = JSON.stringify({
            "scope": [
                {
                    "by_employee_id": {
                        "employee_id": [id]
                    }
                }
            ]
        });

        let xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://api-internal.beget.com/helpdesk/ticket/all', false);
        xhr.setRequestHeader("authorization", "Bearer " + Cookies.get('begetInnerJWT'));
        xhr.send(request);

        let tickets = JSON.parse(xhr.response).ticket;
        return tickets;
    }
}
