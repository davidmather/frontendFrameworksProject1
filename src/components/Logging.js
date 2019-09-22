/*
    Basic logging class
    -- Could also be used to send xmlhttp requests containing bug info to a remote server.
 */
import {
    VERBOSE_LOG,
    DEBUG_LOG,
    LOG_LEVEL
} from "./Constants/Constants";

function log(message, level) {
    if(LOG_LEVEL === VERBOSE_LOG){
        console.log(message)
    } else if (LOG_LEVEL === DEBUG_LOG && level === DEBUG_LOG){
        console.log(message)
    }
}

export default log