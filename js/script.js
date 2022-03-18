const REPOS = [];

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

    // Functions for integrations with GitHub and GitLab projects
    function createDIV(item) {
        // Puts repo information into div
        $(".project." + item.article).append(`
            <div class='item ${item.classes}'>
                <a href='${item.web_url}' target='_blank'>
                    ${item.link_img}
                    ${item.demo_btn}
                    <h1>${item.name}</h1>
                    <span class="date"><i class="icon fa-solid fa-calendar-days"></i> ${item.date}</span>
                    <p>${item.description}</p>
                    <div class='bottom'>
                        <div>
                            <span><strong>
                                <i class="icon fa-solid fa-gears"></i>
                                ${item.language}
                            </strong></span>
                            <span>
                                <i class="icon fa-solid fa-star"></i>
                                ${item.stars}
                            </span>
                            <span>
                                <i class="icon fa-solid fa-code-fork"></i>
                                ${item.forks}
                            </span>
                        </div>
                        <div>
                            <i class="icon fa-solid fa-tags"></i>
                            ${item.tags}
                        </div>
                    </div>
                </a>
            </div>
        `);
    }
    function setDescImg(item) {
        // Function that sets a specific description and image depending on the project, works with language selector
        let langs = [3], link_img, demo_link;

        if (item.name.includes("PEC")) {
            if (item.name.includes("1")) {
                langs[0] = "Juego 2D de Unity de la PEC 1 de la UOC";
                langs[1] = "UOC PEC 1 Unity 2D Game";
                langs[2] = "Joc 2D de Unity de la PEC 1 de la UOC";
                link_img = "images/projects/UOC-PEC1.png";
                demo_link = "https://danagomez.itch.io/pec-1-monkey-island";
            }
            else if (item.name.includes("2")) {
                langs[0] = "Juego 2D de Unity de la PEC 2 de la UOC";
                langs[1] = "UOC PEC 2 Unity 2D Game";
                langs[2] = "Joc 2D de Unity de la PEC 2 de la UOC";
                link_img = "images/projects/UOC-PEC2.png";
                demo_link = "https://danagomez.itch.io/pec-2-super-mario-bros";
            }
            else if (item.name.includes("3")) {
                langs[0] = "Juego 2D de Unity de la PEC 3 de la UOC";
                langs[1] = "UOC PEC 3 Unity 2D Game";
                langs[2] = "Joc 2D de Unity de la PEC 3 de la UOC";
                link_img = "images/projects/UOC-PEC3.png";
                demo_link = "https://danagomez.itch.io/pec-3-scorched-earth-worms";
            }
            else if (item.name.includes("4")) {
                langs[0] = "Juego 2D de Unity de la PEC 4 de la UOC";
                langs[1] = "UOC PEC 4 Unity 2D Game";
                langs[2] = "Joc 2D de Unity de la PEC 4 de la UOC";
                link_img = "images/projects/UOC-PEC4.png";
                demo_link = "https://danagomez.itch.io/pec-4-projecte-final";
            }
        }
        else if (item.name.includes("final_proj")){
            if (item.name.includes("java")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/ProjFInalJava.png";
            }
            else if (item.name.includes("desktop")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/ProjFinalDesktop.png";
            }
            else {
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/ProjFinalAndroid.PNG";
            }
            demo_link = "files/Projecte_DAM_JDS.pdf#toolbar=0";
        }
        else if (item.name.includes("website")) {
            if (item.name.includes("php")){
                langs[0] = "Página web hecha utilizando PHP y base de datos MySQL";
                langs[1] = "Website made with PHP and utilizing MySQL database";
                langs[2] = "Pàgina web feta utilitzant PHP i base de dades MySQL";
                link_img = "images/projects/PhpWebsite.PNG";
            }
            else if (item.name.includes("css")){
                langs[0] = "Página web hecha con HTML5 y CSS3";
                langs[1] = "Website made with HTML5 and CSS3";
                langs[2] = "Pàgina web feta amb HTML5 i CSS3";
                link_img = "images/projects/CssWebsite.png";
            }
        }
        else {
            if (item.name.includes("mobilegame")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/MobileGame.png";
                demo_link = "https://natius-dev.gitlab.io/colonitzacio-i-els-venuts/inicio/";
            }
            else if (item.name.includes("potatoapp")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/PotatoApp.png";
                demo_link = "files/ProjectePatata_Dana.pdf#toolbar=0";
            }
            else if (item.name.includes("ciberpunk")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/Ciberpunk.png";
                demo_link = "files/Projecte-Ciberpunk_DanaGomez.pdf#toolbar=0";
            }
            else if (item.name.includes("chessgame")){
                langs[0] = "";
                langs[1] = "";
                langs[2] = "";
                link_img = "images/projects/ChessGame.png";
                demo_link = "files/Projecte-Escacs_DanaGomez.pdf#toolbar=0";
            }
            else {
                langs[0] = "Repositorio en el qual se almacenan los ficheros de esta página web";
                langs[1] = "Repository where this website's files are stored";
                langs[2] = "Repositori on es guarden els fitxers d'aquesta pàgina web";
                link_img = "images/screenshot.jpg";
            }
        }

        let repo_description = `<span lang="es">${langs[0]}</span>
        <span lang="en">${langs[1]}</span>
        <span lang="ca">${langs[2]}</span>`;

        let demo_btn = "", demo_text = "";
        if (demo_link){
            if (demo_link.includes("itch.io")){
                demo_text = `<span lang="es">Juega en itch.io</span>
                <span lang="en">Play on itch.io</span>
                <span lang="ca">Juga a itch.io</span>`;
            }
            else {
                demo_text = `<span lang="es">Leer documentación (Catalán)</span>
                <span lang="en">Read the docs (Catalan)</span>
                <span lang="ca">Llegir documentaciò</span>`;
            }
            demo_btn = `<form action="${demo_link}" target="_blank">
                <button class="demo-button">
                    ${demo_text}
                </button>
            </form>`;
        }

        return [repo_description, `<img src="${link_img}">`, demo_btn];
    }
    async function getRepos(repos) {
        await getGitLab(repos);
        await getGithub(repos);
        
        repos.sort(function (a,b){return new Date(b.created_at) - new Date(a.created_at);});
        repos.forEach(function (item, index) {
            createDIV(item);
        });

        $('#portfolio .project').sort(function (a, b) {
            return new Date($(b).find(".date:first").text()) - new Date($(a).find(".date:first").text());
        }).appendTo('#portfolio');

        hideItems();

        $('#lang-switch').val($('#lang-switch').val()).change();
        $('#curriculum .item.hide').hide();
    }
    async function getGitLab(repos) {
        const GITLAB_API = "https://gitlab.com/api/v4/";
        const GITLAB_USER = "danagomez";
        var resp = await fetch(GITLAB_API + "users/" + GITLAB_USER + "/projects");
        var respData = await resp.json();

        for (const item of respData){
            resp = await fetch(GITLAB_API + "projects/" + item.id + "/languages");
            respData = await resp.json();
            var repo_language = "";
            for (let element of JSON.stringify(respData).slice(1, -1).split(",")) {
                repo_language += element.split(":")[0].slice(1, -1) + " ";
            }

            var date_parts = item.last_activity_at.split("T")[0].split("-").reverse();
            var date = date_parts[0] + "/" + date_parts[1] + "/" + date_parts[2];
            
            var classes = "", article = "";
            item.topics.forEach(element => {
                if (element == "school" || element == "personal" || element == "professional")
                    article = element;
                else
                    classes+= element + " ";
            });
            var tags = classes.replace(/ /g, ", ").slice(0, -2);
            
            let desc_img = setDescImg(item);
            
            repos.push({
                article: article,
                web_url: item.web_url,
                classes: classes,
                link_img: desc_img[1],
                demo_btn: desc_img[2],
                name: item.name,
                description: desc_img[0],
                date: date,
                language: repo_language,
                stars: item.star_count,
                forks: item.forks_count,
                tags : tags,
                created_at: item.created_at
            });
        }
    }
    async function getGithub(repos) {
        const GITHUB_API = "https://api.github.com/";
        const GITHUB_USER = "danagomezbalada";
        resp = await fetch(GITHUB_API + "users/" + GITHUB_USER + "/repos");
        respData = await resp.json();

        for (const item of respData) {
            resp = await fetch(GITHUB_API + "repos/" + GITHUB_USER + "/" + item.name + "/languages");
            respData = await resp.json();
            var repo_language = "";
            for (let element of JSON.stringify(respData).slice(1, -1).split(",")) {
                repo_language += element.split(":")[0].slice(1, -1) + " ";
            }

            var date_parts = item.pushed_at.split("T")[0].split("-").reverse();
            var date = date_parts[0] + "/" + date_parts[1] + "/" + date_parts[2];

            var classes = "", article = "";
            item.topics.forEach(element => {
                if (element == "school" || element == "personal" || element == "professional")
                    article = element;
                else
                    classes+= element + " ";
            });
            var tags = classes.replace(/ /g, ", ").slice(0, -2);
    
            let desc_img = setDescImg(item);
            
            repos.push({
                article: article,
                web_url: item.html_url,
                classes: classes,
                link_img: desc_img[1],
                demo_btn: desc_img[2],
                name: item.name,
                description: desc_img[0],
                date: date,
                language: repo_language,
                stars: item.stargazers_count,
                forks: item.forks,
                tags : tags,
                created_at: item.created_at
            });
        }
    }

    // If there are more than 6 projects in one article, hide the rest and show a button
    function hideItems(id = "") {
        if (id == "all")
            id = "";
        else if (id != "")
            id = "." + id;
        
        $('#portfolio .project').each(function (){
            var current = $(this);
            current.find(".showmore").remove();

            if (current.children('.item' + id).length > 6) {
                current.children(".item" + id + ":nth-of-type(n+8)").addClass("hide").hide();
                current.append(`
                    <button class="showmore more">
                        + Show More
                    </button>
                `);
            }
        });

        setShowmore();
    }
    // Set the "Show More" button onClick
    function setShowmore() {
        $(".showmore").unbind('click');
        $(".showmore").on("click", function () {
            var current = $(this);
            var thisParent = current.closest('article');

            if (current.hasClass('more')) {
                thisParent.find('.hide').css("transition", "none").show(700, function(){
                    $(this).css("transition", "all 0.2s ease-in");
                });
                current.toggleClass('more', 'less').html('- Show less');
            }
            else {
                thisParent.find('.hide').css("transition", "none").hide(700, function(){
                    $(this).css("transition", "all 0.2s ease-in");
                });
                current.toggleClass('more', 'less').html('+ Show more');
            }
        });
    }

    // When user changes light/dark mode
    $('#switch').change(function() {
        if (this.checked) {
            setCookie('colors', 'light', 7);
            $(document.body).attr('class', 'light-theme');
        } else {
            setCookie('colors', 'dark', 7);
            $(document.body).attr('class', 'dark-theme');
        }
    });

    // When user clicks print button
    $('#print-button').click(function (){
        $('.tabcontent').css("animation", "none");
        document.getElementById("btn-curriculum").click();
        window.print();
        $('.tabcontent').css("animation", "fadeEffect 1s");
    });
    
    // Function that loads the custom language selector
    function loadLanguageSelector() {
        var customSelect = document.getElementsByClassName("custom-select");
        for (i = 0; i < customSelect.length; i++) {
            var selectElements = customSelect[i].getElementsByTagName("select")[0];

            // Creates a new DIV that will act as the selected item
            var DIVselected = document.createElement("DIV");
            DIVselected.setAttribute("class", "select-selected");
            DIVselected.id = "selected";
            DIVselected.innerHTML = selectElements.options[selectElements.selectedIndex].innerHTML;
            customSelect[i].appendChild(DIVselected);

            // Creates a new DIV that will contain the option list
            var DIVlist = document.createElement("DIV");
            DIVlist.setAttribute("class", "select-items select-hide");
            for (j = 0; j < selectElements.length; j++) {
                // Creates a DIV for each option
                var DIVoption = document.createElement("DIV");
                DIVoption.innerHTML = selectElements.options[j].innerHTML;
                DIVoption.id = selectElements.options[j].value;

                DIVoption.addEventListener("click", function() {
                    var selectItems = this.parentNode.parentNode.getElementsByTagName("select")[0];
                    var selected = this.parentNode.previousSibling;

                    for (i = 0; i < selectItems.length; i++) {
                        if (selectItems.options[i].innerHTML == this.innerHTML) {
                            selectItems.selectedIndex = i;
                            selected.innerHTML = this.innerHTML;
                            var y = this.parentNode.getElementsByClassName("same-as-selected");
                            var yl = y.length;
                            for (k = 0; k < yl; k++) {
                                y[k].removeAttribute("class");
                            }
                            this.setAttribute("class", "same-as-selected");
                            break;
                        }
                    }

                    selected.click();
                    $('#lang-switch').val($('#lang-switch').val()).change();
                });
                DIVlist.appendChild(DIVoption);
            }

            customSelect[i].appendChild(DIVlist);
            
            DIVselected.addEventListener("click", function(event) {
                // Open/close this select box and close other select boxes
                event.stopPropagation();
                closeAllSelect(this);
                this.nextSibling.classList.toggle("select-hide");
                this.classList.toggle("select-arrow-active");
            });
        }
    }
    // Function that closes the select boxes except the chosen one
    function closeAllSelect(elmnt) {
        var hideIDs = [];
        var selectItems = document.getElementsByClassName("select-items");
        var selectedItems = document.getElementsByClassName("select-selected");
        
        for (i = 0; i < selectedItems.length; i++) {
            if (elmnt == selectedItems[i])
                hideIDs.push(i)
            else
                selectedItems[i].classList.remove("select-arrow-active");
        }

        for (i = 0; i < selectItems.length; i++) {
            if (hideIDs.indexOf(i))
                selectItems[i].classList.add("select-hide");
        }
    }

    // When user selects a new language
    $('#lang-switch').change(function () {
        var lang = $(this).val();
        setCookie('lang', lang, 7);
        $('[lang]').hide();
        $('[lang="' + lang + '"]').show();
    });

    // When user scrolls down
    $('section').scroll(function () {
        if ($(this).scrollTop() > 250) {
            $('#scroll-button').show(700);
        } else {
            $('#scroll-button').hide(800);
        }
    });
    $(window).scroll(function () {
        if ($(this).scrollTop() > 25) {
            $('#scroll-button').show(700);
        } else {
            $('#scroll-button').hide(800);
        }
    });

    // When user clicks scroll button
    $('#scroll-button').click(function (e) {
        if ($(window).width() >= 768){
            var section = $('section');
            section.animate({
                scrollTop: section.position().top - section.scrollTop()
            }, 2000);
        }
        else {
            $('html, body').animate({
                scrollTop: 0
            }, 2000);
        }
    });

    // When the user clicks on a tab link
    $('.tablink').click(function () {
        $('.tabcontent').each(function () {
            this.style.display = "none";
        });

        $('.tablink').each(function () {
            this.style.backgroundColor = "var(--bg-sidebar)";
            this.disabled = false;
        });

        var pageName = this.id.split("-")[1];
        document.getElementById(pageName).style.display = "block";
        this.style.backgroundColor = "inherit";
        this.disabled = true;
    });

    // Filter buttons onClick
    $('.filterbtn').click(function (){
        $(this).addClass('active').siblings().removeClass('active');
        $('.project').show();
        var id = this.id;

        if (id == "all")
            $('.project .item').css("transition", "none").show(700, function(){
                $(this).css("transition", "all 0.2s ease-in");
            });
        else {
            $('.project .item').hide();
            $('.project .item.' + id).css("transition", "none").show(700, function(){
                $(this).css("transition", "all 0.2s ease-in");
            });

            $('.project').each(function () {
                if($(this).find('.' + id).length == 0)
                    $(this).hide();
            });
        }
        
        hideItems(id);
    });

    // Function to run on page load
    $(document).ready(function () {
        // Set colors
        var colorsCookie = getCookie('colors'), 
            switchElem = $('#switch'), 
            docBody = $(document.body);
        if (colorsCookie){
            if (colorsCookie == 'dark'){
                docBody.attr('class', 'dark-theme');
                switchElem.prop("checked", false);
            }
            else {
                docBody.attr('class', 'light-theme');
                switchElem.prop("checked", true);
            }
        }
        else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
                docBody.attr('class', 'dark-theme');
                switchElem.prop("checked", false);
            }
            else {
                docBody.attr('class', 'light-theme');
                switchElem.prop("checked", true);
            }
        }

        // Set language
        $('[lang]').hide();
        var language = "en", 
            langCookie = getCookie('lang');
        if (langCookie)
            language = langCookie;
        else {
            const langs = [];
            $('#lang-switch option').each(function() {
                langs.push(this.value);
            });
            
            var current = navigator.language.split('-')[0];
            if (langs.includes(current))
                language = current;
        }
        $('#lang-switch').val(language).change();

        loadLanguageSelector();
        $('#' + language).addClass("same-as-selected");
        var selected = $('#selected');
        $('#select-container').hover(function () {
            if (!window.matchMedia("only screen and (max-width: 824px)").matches)
                if (selected.next().hasClass("select-hide")){
                    selected.click();
                }
        }, function () {
            if (!window.matchMedia("only screen and (max-width: 824px)").matches)
                if (!selected.next().hasClass("select-hide")) {
                    selected.click();
                }
        });
        $('#curriculum .item.hide').hide();

        // Load repositories
        getRepos(REPOS);

        setShowmore();

        // When click anywhere, close the select dropdown
        document.addEventListener("click", closeAllSelect);
        // Show the CV tab by default
        document.getElementById("btn-curriculum").click();
    });
});


// TODO: Add accordions for extra text in experience and education
// TODO: Add descriptions for each project
// TODO: Add projects that are not in GitHub / GitLab (sewermapper, inforcerdanya website, etc...)
