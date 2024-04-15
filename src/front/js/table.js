

function addRow(){
    var id = gameList.rows.length;
    console.log(id)
    var row = gameList.insertRow();
    row.id=id;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.outerHTML = `<th>${id}</th>`;
    cell2.innerHTML = `<input type="teidt" id="game_name_${id}" name="game_name_${id}" placeholder="Enter game name( please )" class="form-control"/>`;
    cell3.innerHTML = '<input type="button" class="btn btn-block btn-default" onclick="addTableItem(\''+id+'\')" value="Save" /> '; 
    cell4.innerHTML = '<input type="button" class="btn btn-block btn-default" onclick="removeTableItem(\''+id+'\')" value="Delete" /> '; 
}


 function removeTableItem(id){
    document.getElementById(id).remove()
    removeItem(id)
    refresh()
    sendData({channel, owner:clientId, sectors, angVel, event: events.REFRESH})
}

function addTableItem(id)
{
    var inputText = document.getElementById('game_name_'+ id);
    addItem(id, randomHexColorCode(), inputText.value)
    refresh()
    sendData({channel, owner:clientId, sectors, angVel, event: events.REFRESH})
}   

