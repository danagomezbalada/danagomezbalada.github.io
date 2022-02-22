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

    // Dark & light mode variables and functions
    const html = document.querySelector("html");
    const checkbox = $('#switch');

    function getStyle(name) { 
        return window
            .getComputedStyle(document.documentElement)
            .getPropertyValue(name);
    }

    const initialColors = {
        contactLight: getStyle("--contact-light"),
        contactDark: getStyle("--contact-dark"),
        bg: getStyle("--bg"),
        bgSidebar: getStyle("--bg-sidebar"),
        colorHeadings: getStyle("--color-headings"),
        colorText: getStyle("--color-text"),
        colorText2: getStyle("--color-text2"),
        colorText3: getStyle("--color-text3"),
        colorWhite: getStyle("--color-white"),
        select: getStyle("--select"),
        selectBg: getStyle("--select-bg"),
        socialIcons: getStyle("--social-icons"),
        contentSubtitle: getStyle("--content-subtitle"),
    }

    const lightMode = {
        contactLight: "block",
        contactDark: "none",
        bg: "#EBEBEB",
        bgSidebar: "#ffff",
        colorHeadings: "#7237a3",
        colorText: "#000000",
        colorText2: "#000000",
        colorText3: "#000000",
        colorWhite: "black",
        select: "#000000",
        selectBg: "#9eb4ff",
        socialIcons: "rgba(0,0,0,0.7)",
        contentSubtitle: "rgba(0,0,0,0.9)",
    }

    function changeColors(colors) {
        var transformKey = key => 
        "--" + key.replace(/([A-Z])/, "-$1").toLowerCase();

        Object.keys(colors).map(key => 
            html.style.setProperty(transformKey(key), colors[key]) 
        );
    }

    // When user changes light/dark mode
    checkbox.change(function() {
        if (this.checked) {
            setCookie('colors', 'light', 7);
            changeColors(lightMode);
        } else {
            setCookie('colors', 'dark', 7);
            changeColors(initialColors);
        }
    });

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
    });
});