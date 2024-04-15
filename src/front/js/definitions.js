const addBtn = document.querySelector('#btn_add')
const refreshBtn = document.querySelector('#btn_refresh')
const shareBtn = document.querySelector('#btn_share');
const lblUserType = document.querySelector('#lbl_user_type')
const gameList = document.getElementById('game_list');
const lblWinner = document.querySelector('#lbl_winner')
const spinEl = document.querySelector('#spin')
const clientId = crypto.randomUUID()
const messageChannel = new MessageChannel();
const port1 = messageChannel.port1;

//new CustomEvent("fortune", {});
const events = {
    START: "START",
    CREATE: "CREATE",
    REFRESH: "REFRESH",
    RUNNING: "RUNNING",
    END: "END"
}