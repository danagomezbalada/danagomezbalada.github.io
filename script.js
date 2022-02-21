$(document).ready(function(){
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

    // Dark & light mode variables and functions
    const html = document.querySelector("html")
    const checkbox = document.querySelector("input[name=theme]")

    function getStyle(name) { 
    return window
        .getComputedStyle(document.documentElement)
        .getPropertyValue(name);
    }

    const initialColors = {
    bg: getStyle("--bg"),
    bgPanel: getStyle("--bg-panel"),
    colorHeadings: getStyle("--color-headings"),
    colorText: getStyle("--color-text"),
    }

    const lightMode = {
    bg: "#ffff",
    bgPanel: "#ffff",
    colorHeadings: "#3664FF",
    colorText: "#B5B5B5",
    }

    function changeColors(colors) {
        var transformKey = key => 
        "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();
    
        Object.keys(colors).map(key => 
            html.style.setProperty(transformKey(key), colors[key]) 
        );
    }

    // When user changes light/dark mode
    checkbox.addEventListener("change", ({target}) => {
    if (target.checked) {
        setCookie('colors', 'light', 7);
        changeColors(lightMode);
    } else {
        setCookie('colors', 'dark', 7);
        changeColors(initialColors);
    }
    })

    // When user selects a new language
    $('#lang-switch').change(function () {
        var lang = $(this).val();
        setCookie('lang', lang, 7);
        $('[lang]').hide();
        $('[lang="' + lang + '"]').show();
    });

    // Function to run on page load
    $(document).ready(function () {
        // Set colors
        var colorsCookie = getCookie('colors');
        if ((colorsCookie && colorsCookie == 'dark') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        changeColors(initialColors);
        }
        else {
        checkbox.checked = true;
        changeColors(lightMode);
        }
        
        // Set language
        $('[lang]').hide();
        var langCookie = getCookie('lang');
        if (langCookie)
            $('#lang-switch').val(langCookie).change();
        else{
            const langs = [];
            $('#lang-switch option').each(function() {
                langs.push($(this).val());
            });
            
            var current = navigator.language.split('-')[0];
            if (langs.includes(current))
                $('#lang-switch').val(current).change();
            else
                $('#lang-switch').val("en").change();
        }
    });
}); 

