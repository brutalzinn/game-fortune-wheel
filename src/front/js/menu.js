

function init() {
  addBtn.addEventListener('click', () => {
    addRow()
  })
  refreshBtn.addEventListener('click', () => {
    for (let i = 1; i < gameList.rows.length; i++) {
      addTableItem(i)
    }
    refresh()
  })
  shareBtn.addEventListener('click', async () => {
    try {
      const protocol = window.location.protocol;
      const url = protocol + '//' + window.location.host + '/' + generateShortID();
      await navigator.clipboard.writeText(url);
      alert('Url copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  })
}
init()
