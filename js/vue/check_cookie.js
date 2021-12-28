const loginStatus = () => {
    const value = `; ${document.cookie}`
    const parts = value.split(`; member_id=`)
    if (parts.length === 2)
        return parts.pop().split(';').shift()
    else
        return ''
}

const isAdmin = () =>{
    const value = `; ${document.cookie}`
    const parts = value.split(`; isAdmin=`)
    if (parts.length === 2)
        if(parts.pop().split(';').shift() == "true")
            return true
        else
            return false
}

const cleanCookie = () => {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export{loginStatus, isAdmin, cleanCookie}