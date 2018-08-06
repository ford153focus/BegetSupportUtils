document.getElementsByClassName("pagetitle")[0]
    .insertAdjacentHTML("beforeEnd", Utils.getExtensionFileContent("assets/html/hp/pickPanel.html"));

let curr_id = window.location.href.match(/\/\d+\//g)[0].replace(/\//g, "");

document.querySelector("#profile-navigation .prev").onclick = function () {
    let prev_id = parseInt(curr_id) - 1;
    let prev_url = window.location.href.replace(curr_id, prev_id);
    window.location.href = prev_url;
};

document.querySelector("#profile-navigation .next").onclick = function () {
    let next_id = parseInt(curr_id) + 1;
    let next_url = window.location.href.replace(curr_id, next_id);
    window.location.href = next_url;
};
