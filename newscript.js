$(document).ready(function () {
    // Functions for cookies
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') 
                c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) 
                return c.substring(nameEQ.length,c.length);
        }
        return null;
    }
    function eraseCookie(name) {   
        document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }

    // When user changes light/dark mode
    $('#switch').change(function() {
        if (this.checked) {
            setCookie('colors', 'light', 7);
            document.body.className = "light-theme";
        } else {
            setCookie('colors', 'dark', 7);
            document.body.className = "dark-theme";
        }
    });

    $(document).ready(function () {
        // Set colors
        var colorsCookie = getCookie('colors');
        if ((colorsCookie && colorsCookie == 'dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.className = "dark-theme";
            console.log("unchecked");
            $('#switch').prop( "checked", false);
        }
        else {
            document.body.className = "light-theme";
            console.log("checked");
            $('#switch').prop( "checked", true);
        }
    });
});