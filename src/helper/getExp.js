import {isDateFormatValid,calcAge} from './dates'
export  function getExp (dateString) {
    if(!isDateFormatValid(dateString))
       return ""
    const exp = Math.floor(( calcAge(dateString) - 7) * Math.pow(22, 1.45))
   return exp
   }