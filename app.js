const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway')
const deadline = document.querySelector('.deadline')
const items = document.querySelectorAll('.deadline-format h4')
//year-month-date-hour-minute-second --future date format
let futureDate = new Date(2021, 03, 09, 0, 0, 0)
const year = futureDate.getFullYear()
const month = months[futureDate.getMonth()]
const date = futureDate.getDate()
const hour = futureDate.getHours()
const minute = futureDate.getMinutes()
// let prepand='AM'
// if(hour>=12 && minute>0){
//   prepand='PM'
// }
const second = futureDate.getSeconds()
const weekday = weekdays[futureDate.getDay()]
giveaway.textContent = `
giveaway ends on ${weekday}, ${date} ${month} ${year}
`
// Future time in mili second
const futureTime = futureDate.getTime()

function getRemainingTime() {
  const today = new Date().getTime()
  const t = futureDate - today;
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60m
  // 1d = 24hr

  // values in miliseconds
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  let days = t / oneDay;
  days = Math.floor(days)
  let hours = (t % oneDay) / oneHour; // t%oneDay means Remainding day between future time and presunt time. And then divided oneHour means the remainding hour for one day 
  hours = Math.floor(hours)
  let minutes = Math.floor((t % oneHour) / oneMinute)
  let seconds = Math.floor((t % oneMinute) / 1000)

  // set values in an array
  const values = [days, hours, minutes, seconds]

  function format(item) {
    if (item < 10) {
      return item = `0${item}`
    }
    return item
  }

  items.forEach(function (item, index) {
    item.innerHTML = format(values[index])
  })

  if (t < 0) {
    clearInterval(countDown)
    deadline.innerHTML = `
    <h4 class="expired">sorry, this giveaway expired</h4>
    `
  }

}
let countDown = setInterval(getRemainingTime, 1000)
getRemainingTime()//always put this callback function in the bottom of countdown function otherwise it will not work correctly