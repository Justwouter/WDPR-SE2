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
    let s = (new Date(vanDate).getMinutes()<10 ? '0' : '') + new Date(vanDate).getMinutes();
    return (new Date(vanDate).getHours()<10 ? '0'  : '') + new Date(vanDate).getHours() + ':' + s  ;
  }

  export const getDuur = (vanDate, totDate) =>{
    var diff = (new Date(totDate).getTime() - new Date(vanDate).getTime());
    var minuten = Math.round((diff/1000)/60);
    return minuten ;
  }
