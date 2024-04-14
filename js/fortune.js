const sectors = [
    // { color: '#0bf', label: 'Paladins' },
    // { color: '#fb0', label: 'Dead by The Light' },
    { color: '#0fb', label: 'Minecraft' },
  ]
  
  const rand = (m, M) => Math.random() * (M - m) + m
  const lblWinner = document.querySelector('#lbl_winner')
  const spinEl = document.querySelector('#spin')
  const ctx = document.querySelector('#wheel').getContext('2d')
  const friction = 0.991 // 0.995=soft, 0.99=mid, 0.98=har
  const PI = Math.PI

  let tot = sectors.length
  let dia = ctx.canvas.width
  let rad = dia / 2
  let TAU = 2 * PI
  let arc = TAU / sectors.length
  let angVel = 0 // Angular velocity
  let ang = 0 // Angle in radians
  
  const getIndex = () => Math.floor(tot - (ang / TAU) * tot) % tot
  
  function recalculate(){
     tot = sectors.length
     dia = ctx.canvas.width
     rad = dia / 2
     TAU = 2 * PI
     arc = TAU / sectors.length
     angVel = 0 // Angular velocity
     ang = 0 // Angle in radians
  }
  function drawSector(sector, i) {
    const ang = arc * i
    ctx.save()
    // COLOR
    ctx.beginPath()
    ctx.fillStyle = sector.color
    ctx.moveTo(rad, rad)
    ctx.arc(rad, rad, rad, ang, ang + arc)
    ctx.lineTo(rad, rad)
    ctx.fill()
    // TEXT
    ctx.translate(rad, rad)
    ctx.rotate(ang + arc / 2)
    ctx.textAlign = 'right'
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 30px sans-serif'
    ctx.fillText(sector.label, rad - 10, 10)
    //
    ctx.restore()
  }
  
  function rotate() {
    const sector = sectors[getIndex()]
    ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
    spinEl.textContent = !angVel ? 'SPIN' : sector.label
    spinEl.style.background = sector.color
    if(angVel == 0){
      lblWinner.innerHTML = "Winner: " + sector.label
    }
  }
  
  function frame() {
    if (!angVel) return
    angVel *= friction // Decrement velocity by friction
    if (angVel < 0.002) angVel = 0 // Bring to stop
    ang += angVel // Update angle
    ang %= TAU // Normalize angle
    rotate()
  }
  
  function engine() {
    frame()
    requestAnimationFrame(engine)
  }
  
  function refresh(){
    recalculate()
    sectors.forEach(drawSector)
}

  function init() {
    rotate() // Initial rotation
    engine() // Start engin
    spinEl.addEventListener('click', () => {
      if (!angVel) angVel = rand(0.25, 0.45)
    })
  }
  
  init()
  