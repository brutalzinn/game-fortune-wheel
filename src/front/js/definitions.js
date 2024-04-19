const addBtn = document.querySelector('#btn_add')
const refreshBtn = document.querySelector('#btn_refresh')
const shareBtn = document.querySelector('#btn_share');
const lblUserId = document.querySelector('#lbl_user_id')
const gameList = document.getElementById('game_list');
const lblWinner = document.querySelector('#lbl_winner')
const spinEl = document.querySelector('#spin')
const menu = document.querySelector('#menu')
const clientId = crypto.randomUUID()
const socket = io();
let isOwner = false
const events = {
    START: "START",
    CREATE: "CREATE",
    REFRESH: "REFRESH",
    RUNNING: "RUNNING",
    END: "END"
}