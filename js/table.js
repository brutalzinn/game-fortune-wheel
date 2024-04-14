

function addRow(){
    var id = gameList.rows.length;
    console.log(id)
    var row = gameList.insertRow();
    row.id=id;
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.outerHTML = `<th> ${id}</th>`;
    cell2.innerHTML = `<input type="teidt" id="game_name_${id}" name="game_name_${id}" placeholder="Enter game name( please )" class="form-control"/>`;
    cell3.innerHTML = '<input type="button" class="btn btn-block btn-default" onclick="addItem(\''+id+'\')" value="Save" /> '; 
    cell4.innerHTML = '<input type="button" class="btn btn-block btn-default" onclick="removeItem(\''+id+'\')" value="Delete" /> '; 
}


 function removeItem(id){
    document.getElementById(id).remove()
    sectors.splice(id, 1)
    refresh()

}
function addItem(id){
    console.log(id)
    var inputText = document.getElementById('game_name_'+ id);
    let indexFound = sectors.findIndex(element=> element.id == id)
    if(indexFound == -1){
        sectors.push( { id:id, color: randomHexColorCode(), label: inputText.value })
    }else{
        sectors[indexFound].label = inputText.value 
    }
    refresh()
}
