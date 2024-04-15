

function init() {
    addBtn.addEventListener('click', () => {
        addRow()
    })
    refreshBtn.addEventListener('click', () => {
       for(let i =1; i < gameList.rows.length; i++){
            addTableItem(i)
       }
       refresh()
       sendData({ channel, sectors, angVel})
    })
  }
  init()
  