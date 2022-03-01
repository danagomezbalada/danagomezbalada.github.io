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

    // Onclick function for the language selector options
    function languageOnClick() {
        var selectItems = this.parentNode.parentNode.getElementsByTagName("select")[0];
        var selected = this.parentNode.previousSibling;

        for (i = 0; i < selectItems.length; i++) {
            if (selectItems.options[i].innerHTML == this.innerHTML) {
                selectItems.selectedIndex = i;
                selected.innerHTML = this.innerHTML;
                break;
            }
        }

        selected.click();
        $('#lang-switch').val($('#lang-switch').val()).change();
    }
    // Function that loads the custom language selector
    function loadLanguageSelector() {
        var customSelect = document.getElementsByClassName("custom-select");
        for (i = 0; i < customSelect.length; i++) {
            var selElmnt = customSelect[i].getElementsByTagName("select")[0];
            var elementLength = selElmnt.length;

            /*for each element, create a new DIV that will act as the selected item:*/
            var DIVselected = document.createElement("DIV");
            DIVselected.setAttribute("class", "select-selected");
            DIVselected.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
            customSelect[i].appendChild(DIVselected);

            /*for each element, create a new DIV that will contain the option list:*/
            var DIVlist = document.createElement("DIV");
            DIVlist.setAttribute("class", "select-items select-hide");

            for (j = 1; j < elementLength; j++) {
                // Creates a DIV for each option
                
                var DIVoption = document.createElement("DIV");
                DIVoption.innerHTML = selElmnt.options[j].innerHTML;

                DIVoption.addEventListener("click", languageOnClick);
                DIVlist.appendChild(DIVoption);
            }

            customSelect[i].appendChild(DIVlist);

            DIVselected.addEventListener("click", function(e) {
                /*when the select box is clicked, close any other select boxes,
                and open/close the current select box:*/
                e.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
    }
    // Function closes the select boxes except the chosen one
    function closeAllSelect(elmnt) {
        var hideIDs = [];
        var selectItems = document.getElementsByClassName("select-items");
        var selectedItems = document.getElementsByClassName("select-selected");
        
        for (i = 0; i < selectedItems.length; i++) {
            if (elmnt == selectedItems[i]) {
                hideIDs.push(i)
            }
            else {
                selectedItems[i].classList.remove("select-arrow-active");
            }
        }

        for (i = 0; i < selectItems.length; i++) {
            if (hideIDs.indexOf(i)) {
                selectItems[i].classList.add("select-hide");
            }
        }
    }

    // When user selects a new language
    $('#lang-switch').change(function () {
        var lang = $(this).val();
        setCookie('lang', lang, 7);
        $('[lang]').hide();
        $('[lang="' + lang + '"]').show();
    });

    // Function to run on page load
    $(document).ready(function () {
        loadLanguageSelector();
        document.addEventListener("click", closeAllSelect);

        // Set colors
        var colorsCookie = getCookie('colors');
        if (colorsCookie){
            if (colorsCookie == 'dark'){
                document.body.className = "dark-theme";
                $('#switch').prop("checked", false);
            }
            else {
                document.body.className = "light-theme";
                $('#switch').prop("checked", true);
            }
        }
        else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
                document.body.className = "dark-theme";
                $('#switch').prop("checked", false);
            }
            else {
                document.body.className = "light-theme";
                $('#switch').prop("checked", true);
            }
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