
export const getMaand = (vanDate) => {
  let maandArray = ['Jan', 'Feb', 'Ma', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return maandArray[new Date(vanDate).getMonth()];
}
export const getDagNr = (vanDate) => {
  return new Date(vanDate).getDate();
}
export const getDagNaam = (vanDate) => {
  let dagArray = ['Zondag', 'Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Zaterdag'];
  return dagArray[new Date(vanDate).getDay()];
}
export const getUur = (vanDate) => {
  let s = (new Date(vanDate).getMinutes() < 10 ? '0' : '') + new Date(vanDate).getMinutes();
  return (new Date(vanDate).getHours() < 10 ? '0' : '') + new Date(vanDate).getHours() + ':' + s;
}

export const getDuur = (vanDate, totDate) => {
  var diff = (new Date(totDate).getTime() - new Date(vanDate).getTime());
  var minuten = Math.round((diff / 1000) / 60);
  return minuten;
}

export const StoelReserveren = (i) => {
  localStorage.setItem("pid", i);
}

export function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts.pop().split(';').shift();
}

export function deleteCookie(name) {   
  document.cookie = name+'=; Max-Age=-99999999;';  
}

export function parseJwt(token) {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )

  return JSON.parse(jsonPayload)
}