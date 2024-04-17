

function init() {
    addBtn.addEventListener('click', () => {
        addRow()
    })
    refreshBtn.addEventListener('click', () => {
       for(let i =1; i < gameList.rows.length; i++){
            addTableItem(i)
       }
       refresh()
    })
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: "MDN",
            text: "Learn web development on MDN!",
            url: "https://developer.mozilla.org",
          };
        try {
            await navigator.share(shareData);
            resultPara.textContent = "MDN shared successfully";
          } catch (err) {
            resultPara.textContent = `Error: ${err}`;
          }
     })
  }
  init()
  