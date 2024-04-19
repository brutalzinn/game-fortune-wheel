let sectors = []
const rand = (m, M) => Math.random() * (M - m) + m
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

function recalculate() {
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
  ctx.restore()
}

function rotate() {
  const sector = sectors[getIndex()]
  if (sector == undefined) {
    return
  }
  ctx.canvas.style.transform = `rotate(${ang - PI / 2}rad)`
  spinEl.textContent = !angVel ? 'SPIN' : sector.label
  spinEl.style.background = sector.color
  if (angVel == 0) {
    sendData({ channel, owner: clientId, sectors, angVel, ang, label: sector.label, event: events.END });
    lblWinner.innerHTML = "WIN: " + sector.label
    return
  }
  lblWinner.innerHTML = "SPIN: " + sector.label
  sendData({ channel, owner: clientId, sectors, angVel, ang, label: sector.label, event: events.RUNNING });
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

function refresh() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  recalculate()
  rotate()
  sectors.forEach(drawSector)
  sendData({ channel, owner: clientId, sectors, angVel, event: events.REFRESH });
}

function addItem(id, color, label) {
  let indexFound = sectors.findIndex(element => element.id == id)
  if (indexFound == -1) {
    sectors.push({ id, color, label })
  } else {
    sectors[indexFound].label = label
  }
  refresh()
}

function removeItem(id) {
  sectors.splice(id, 1)
  refresh()
}

function init() {
  refresh()
  sync()
  rotate()
  engine()
  spinEl.addEventListener('click', () => {
    if (!angVel) {
      angVel = rand(0.25, 0.45)
      sendData({ channel, owner: clientId, sectors, label: "Starting...", angVel, ang, event: events.START });
    }

  })
}

init()
