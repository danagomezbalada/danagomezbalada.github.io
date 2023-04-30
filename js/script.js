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
                langs[0] = `Este juego está basado en el duelo de insultos del juego \"Monkey Island\". Ha sido el primer proyecto del curso de Progromación de Videojuegos 2D de la UOC.
                <br><strong>Algunos aspectos clave</strong>: escenas de juego, máquina de estados, gráficos y animaciones, causalidad...`;
                langs[1] = `This game is based on the duel of insult from the game \"Monkey Island\". It was the first project of the 2D Videogame Programming course from the UOC.
                <br><strong>Some key aspects</strong>: game scenes, state machine, graphics and animations, causality...`;
                langs[2] = `Aquest joc està basat en el duel d'insults del joc \"Monkey Island\". Ha sigut el primer projecte del curs de Programació de Videojocs 2D de la UOC.
                <br><strong>Alguns aspectes clau</strong>: escenes de joc, màquina d'estats, gràfics i animacions, causalitat...`;
                link_img = "images/projects/UOC-PEC1.png";
                demo_link = "https://danagomez.itch.io/pec-1-monkey-island";
            }
            else if (item.name.includes("2")) {
                langs[0] = `Este juego es una recreación del primer nivel del juego para la NES \"Super Mario Bros\". Ha sido el segundo proyecto del curso de Programación de Videojuegos 2D de la UOC.
                <br><strong>Algunos aspectos clave</strong>: contadores de puntos y tiempo, inteligencia artificial básica, físicas, máquina de estados, probabilidad y causalidad...`;
                langs[1] = `This game is a recreation of the first level of the NES game \"Super Mario Bros\". It was the second project of the 2D Videogame Programming course from the UOC.
                <br><strong>Some key aspects</strong>: point and time counters, basic artificial intelligence, physics, state machine, probability and causality...`;
                langs[2] = `Aquest joc es una recreació del primer nivell del joc per la NES \"Super Mario Bros\". Ha sigut el segon projecte del curs de Programació de Videojocs 2D de la UOC.
                <br><strong>Alguns aspectes clau</strong>: comptadors de punts i temps, intel·ligència artificial bàsica, físiques, màquina d'estats, probabilitat i causalitat...`;
                link_img = "images/projects/UOC-PEC2.png";
                demo_link = "https://danagomez.itch.io/pec-2-super-mario-bros";
            }
            else if (item.name.includes("3")) {
                langs[0] = `Este juego es un juego de artilleria basado en el \"Scorched Earth\" y \"Worms\". Ha sido el tercer proyecto del curso de Programación de Videojuegos 2D de la UOC.
                <br><strong>Algunos aspectos clave</strong>: generación automática de nivel, sistema de partículas, predicción de trayectoria, inteligencia artifical...`;
                langs[1] = `This game is an artillery game based on \"Scorched Earth\" and \"Worms\". It was the third project of the 2D Videogame Programming course from the UOC.
                <br><strong>Some key aspects</strong>: automatic level generation, particle system, trajectory prediction, artificial intelligence...`;
                langs[2] = `Aquest joc es un joc d'artilleria basat en el Scorched Earth i Worms. Ha sigut el tercer projecte del curs de Programació de Videojocs 2D de la UOC.
                <br><strong>Alguns aspectes clau</strong>: generació automàtica de nivell, sistema de partícules, predicció de trajectòria, intel·ligència artificial...`;
                link_img = "images/projects/UOC-PEC3.png";
                demo_link = "https://danagomez.itch.io/pec-3-scorched-earth-worms";
            }
            else if (item.name.includes("4")) {
                langs[0] = `Un juego 2D de Unity inspirado por los clasicos juegos JRPG de RPG Maker. Controlas a una universitaria que es transportada a un misterioso mundo de sueños tras mirar un video maldito. Puedes explorar, interactuar y charlar para descubrir más sobre el mundo y la historia. Eso sí, ten cuidado cuando llegues al mundo de los sueños... (El juego está en catalán!)
                <br><strong>Algunos aspectos clave</strong>: sistema de guardar y cargar partida, menú de pausa completo y inventario, barra de resistencia, daño y muerte, diálogo con múltiples opciones, múltiples finales, interacciones con el entorno y personajes, cutscenes, inteligencia artificial, pantalla de creditos...`;
                langs[1] = `A Unity 2D game inspired by the classic JRPG games from RPG Maker. You play as a college student who is transported into a mysterious dream world after watching a cursed video. You can explore, interact and chat to find out more about the world and the story. Just be careful when you reach the dream world... (The game is in Catalan!)
                <br><strong>Some key aspects</strong>: game saving and loading system, complete pause menu and inventory, stamina bar, damage and death, multiple choice dialogue, multiple endings, interactions with the environment and characters, cutscenes, artificial intelligence, credits screen...`;
                langs[2] = `Un joc 2D de Unity inspirat per els clàssics jocs JRPG de RPG Maker. Control·les a una universitària que és transportada a un misteriòs món de somnis després de veure un video maleït. Pots explorar, interactuar i parlar per descobrir més sobre el món i la història. Això sí, ves amb compte quan arribis al món dels somnis...
                <br><strong>Alguns aspectes clau</strong>: sistema de guardar i carregar partida, menú de pausa complet i inventari, barra de resistència, dany i mort, diàleg amb varies opcions, varis finals, interaccions amb l'entorn i personatges, cutscenes, intel·ligència artificial, pantalla de crèdits...`;
                link_img = "images/projects/UOC-PEC4.png";
                demo_link = "https://danagomez.itch.io/pec-4-projecte-final";
            }
        }
        else if (item.name.includes("final_proj")){
            if (item.name.includes("java")){
                langs[0] = `Hecho el <i>22/04/2021</i>.
                <br>Parte de una aplicación de consulta de actividades. Recibe el fichero de texto generado por el programa de Visual Basic, lo convierte en ficheros de XML y los sube a un servidor web haciendo uso del protocolo FTP. Para hacer la conversión con más seguridad, hace servir orientación a objectos. También obtiene datos de Firebase y actualiza la BBDD local con estos.`;
                langs[1] = `Made on <i>22/04/2021</i>.
                <br>Part of an activity query application. It recieves the text file generated by the Visual Basic application, transforms it into various XML files and uploads them to a web server making use of the FTP protocol. To make the conversion safer, it uses object orientation. It also obtains data from Firebase and updates the local database with it.`;
                langs[2] = `Fet el <i>22/04/2021</i>.
                <br>Part d'una aplicació de consulta d’activitats. Rep el fitxer de text generat per el programa de Visual Basic, el converteix a fitxers de XML i els puja a un servidor web fent ús del protocol FTP. Per tal de fer la conversió amb més seguretat, fa servir orientació a objectes. També obté dades de Firebase i actualitza la BBDD local amb aquestes.`;
                link_img = "images/projects/ProjFInalJava.png";
            }
            else if (item.name.includes("desktop")){
                langs[0] = `Hecho el <i>22/04/2021</i>.
                <br>Parte de una aplicación de consulta de actividades. Se encarga de la gestión de la BBDD. La interfície es simple y efectiva, haciendo clic a "Administrar Activitats" podemos gestionar las tablas de la BBDD. Seleccionando alguna de las opciones, nos mostrarà una tabla con los registros actuales i botones para añadir, consultar, editar o borrar registros. El programa tiene un botón que nos permite generar un fichero de text que posteriormente será tratado en el programa de Java.`;
                langs[1] = `Made on <i>22/04/2021</i>.
                <br>Part of an activity query application. It is responsible for the management of the database. The UI is simple and effective, clicking "Administrar Activitats" we can manage the database tables. Selecting one of the options, it will display a table with the current records and buttons to add, read, edit or delete records. The application has a button that allows us to generate a text file that will later be managed with the Java application.`;
                langs[2] = `Fet el <i>22/04/2021</i>.
                <br>Part d'una aplicació de consulta d’activitats. S’encarrega de la gestió de la BBDD. La interfície és simple i efectiva, fent clic a “Administrar Activitats” podem gestionar les taules de la BBDD. Seleccionant alguna de les opcions, ens mostrarà una taula amb els registres actuals i botons per afegir, consultar, editar o esborrar registres. El programa té un botó que ens permet generar un fitxer de text que posteriorment serà tractat en el programa de Java.`;
                link_img = "images/projects/ProjFinalDesktop.png";
            }
            else {
                langs[0] = `Hecho el <i>22/04/2021</i>.
                <br>Parte de una aplicación de consulta de actividades. Al entrar en la aplicación y una vez hecho login, veremos una pantalla con los eventos que recibe del archivo XML (que ha sido cargado en un servidor web anteriormente con Java). Se mostrará una lista resumida de los próximos eventos, en esta lista resumida haremos clic en un elemento para acceder a una lista de sus actividades. Los usuarios de la aplicación, aparte de poder buscar actividades, pueden realizar una reserva para cualquier actividad. Todos los datos se guardan en una BBDD de Firebase.`;
                langs[1] = `Made on <i>22/04/2021</i>.
                <br>Part of an activity query application. Upon entering the application and once logged in, we will see a screen with the events received from the XML file (which has been previously loaded on a web server with Java). A summary list of upcoming events will be displayed, in this summary list we will click on an item to access a list of its activities. Users of the application, apart from being able to search for activities, can make a reservation for any activity. All data is stored in a Firebase database.`;
                langs[2] = `Fet el <i>22/04/2021</i>.
                <br>Part d'una aplicació de consulta d’activitats. En entrar a l'aplicació i una vegada fet login, veurem una pantalla amb els esdeveniments que rep del fitxer XML (que ha estat carregat a un servidor web anteriorment amb Java). Es mostrarà una llista resumida dels propers esdeveniments, en aquesta llista resumida farem clic a un element per accedir a una llista de les seves activitats. Els usuaris de l’aplicació, a part de poder cercar activitats, poden fer una reserva per qualsevol activitat. Totes les dades es guarden en una BBDD de Firebase.`;
                link_img = "images/projects/ProjFinalAndroid.PNG";
            }
            demo_link = "files/Projecte_DAM_JDS.pdf#toolbar=0";
        }
        else if (item.name.includes("website")) {
            if (item.name.includes("php")){
                langs[0] = `Hecho el <i>21/11/2019</i>.
                <br>Página web de PHP y base de datos MySQL hecha para un juego online de MMO, del tipo de estratégia en tiempo real. Contiene páginas de: Inicio, Descarga, Preguntas Frecuentes, Soporte, Guías, Foro, Login y Registrar. Las últimas dos hacen comprovación y creación de usuarios en una BBDD local. La página utiliza w3.css.`;
                langs[1] = `Made on <i>21/11/2019</i>.
                <br>PHP and MySQL database website made for an online MMO game, of realtime strategy type. It contains the following pages: Home, Downloads, FAQ, Support, How To, Forum, Login and Register. The latter two check and create users on a local database. The website uses w3.css.`;
                langs[2] = `Fet el <i>21/11/2019</i>.
                <br>Pàgina web de PHP i base de dades MySQL feta per a un joc online MMO, del tipus d’estratègia en temps real. Conté pàgines de: Inici, Descarrega, Preguntes Freqüents, Soport, Guies, Fòrum, Login i Registrar. Les últimes dues fan comprovació i creació d'usuaris a una BBDD local. La pàgina fa servir w3.css.`;
                link_img = "images/projects/PhpWebsite.PNG";
            }
            else if (item.name.includes("css")){
                langs[0] = `Hecho el <i>01/02/2019</i>.
                <br>Página web hecha con HTML5 y CSS3. Fue una de las primeras páginas que he hecho, y contiene varios elementos con el propósito de practicar y aprender (formularios, tablas, listas, tarjeta, texto, posicionamiento...).`;
                langs[1] = `Made on <i>01/02/2019</i>.
                <br>Website made with HTML5 and CSS3. It was one of the first websites I've made, and it contains various elements with the purpose of practising and learning (forms, tables, lists, card, text, positioning...).`;
                langs[2] = `Fet el <i>01/02/2019</i>.
                <br>Pàgina web feta amb HTML5 i CSS3. Va ser una de les primeres pàginas que he fet, i conté varis elements amb el propòsit de practicar i aprendre (formularis, taules, llistes, tarjeta, text, posicionament...).`;
                link_img = "images/projects/CssWebsite.png";
            }
        }
        else {
            if (item.name.includes("mobilegame")){
                langs[0] = `Hecho el <i>10/03/2021</i>.
                <br>El juego está ambientado en el descubrimiento de América, donde el jugador debe escapar de los colonos. Hay obstáculos que debe esquivar en tres carriles, cuando el personaje toca el obstáculo se acaba la partida. Este juego fue desarrollado con libGDX en Android Studio.`;
                langs[1] = `Made on <i>10/03/2021</i>.
                <br>The game is based on the descovery of America, where the player must escape the colonists. There are obstacles that must be dodged in three lanes, when the character bumps into an obstacle the game ends. This game was developed with libGDX on Android Studio.`;
                langs[2] = `Fet el <i>10/03/2021</i>.
                <br>El joc està ambientat en el descobriment d'Amèrica, on el jugador ha d'escapar dels colons. Hi ha obstacles que ha d'esquivar en tres carrils, quan el personatge toca l'obstacle s'acaba la partida. Aquest joc va ser desenvolupat amb libGDX a Android Studio.`;
                link_img = "images/projects/MobileGame.png";
                demo_link = "files/Colonitzacio-i-els-venuts.pdf#toolbar=0";
            }
            else if (item.name.includes("potatoapp")){
                langs[0] = `Hecho el <i>25/01/2021</i>.
                <br>És una aplicación donde podemos guardar los datos sobre los diferentes tipos de patatas y podemos añadir de nuevas. Permite hacer trabajos CRUD sobre una base de datos interna donde se guardar todos los datos de los diferentes tipos de patatas. También hay una pantalla de login y 3 idiomas soportados (Español, Catalán e Inglés).`;
                langs[1] = `Made on <i>25/01/2021</i>.
                <br>It is an app where we can save data about the different types of potatoes and we can also add new types. It allows you to do CRUD jobs on a local database where all the data about the different types of potatoes is stored. There is also a login screen and 3 supported languages (Spanish, Catalan and English).`;
                langs[2] = `Fet el <i>25/01/2021</i>.
                <br>És una aplicació on podem emmagatzemar les dades sobre els diferents tipus de patates i podem afegir-ne de noves. Permet fer treballs CRUD sobre una base de dades interna on s'emmagatzemen totes les dades dels diferents tipus de patates. També hi ha una pantalla de login i 3 llenguatges soportats (Castellà, Català i Anglés).`;
                link_img = "images/projects/PotatoApp.png";
                demo_link = "files/ProjectePatata_Dana.pdf#toolbar=0";
            }
            else if (item.name.includes("ciberpunk")){
                langs[0] = `Hecho el <i>08/11/2020</i>.
                <br>És un programa ambientado en un futuro distópico que permite gestionar las personas, los territorios y los gremios a los que pertenecen, y sus actividades. Permite hacer operaciones CRUD sobre una base de datos local. Tiene un diseño futurista y minimalista.`;
                langs[1] = `Made on <i>08/11/2020</i>.
                <br>It is a program based on a dystopian future that allows you to manage the people, the territories and the guils they belong in, and their activities. It allows you to make CRUD operations on a local database. It has a futuristic and minimalistic design.`;
                langs[2] = `Fet el <i>08/11/2020</i>.
                <br>És un programa ambientat en un futur distòpic que permet gestionar les persones, els territoris i els gremis als quals pertanyen, i les seves activitats. Permet fer operacions CRUD sobre una base de dades local. Té un disseny futurista i minimalista.`;
                link_img = "images/projects/Ciberpunk.png";
                demo_link = "files/Projecte-Ciberpunk_DanaGomez.pdf#toolbar=0";
            }
            else if (item.name.includes("chessgame")){
                langs[0] = `Hecho el <i>08/10/2020</i>.
                <br>Un juego multijugador de ajedrez basico basado en la guerra fría. El primer jugador es de color blanco, y el segundo negro. El juego se asegura de que el jugador siga las normas básicas del ajedrez, controlando el movimiento de las piezas, poder atrapar piezas enemigas, matar al rey y ganar la partida. También tiene un contador de piezas atrapadas y una pantalla de resultados.`;
                langs[1] = `Made on <i>08/10/2020</i>.
                <br>A basic multiplayer chess game based on the cold war. The first player is of white color, and the second one black. The game ensures that the player follows the basic rules of chess, controlling the movement of the pieces, allowing to capture enemy pieces, kill the king and win the game. It also has a counter for captured pieces and a results screen.`;
                langs[2] = `Fet el <i>08/10/2020</i>.
                <br>Un joc multijugador d'escacs bàsic basat en la guerra freda. El primer jugador és de color blanc, i el segon negre. El joc s'assegura de que el jugador segueixi les normes bàsiques dels escacs, controlant el moviment de les peçes, poder atrapar peçes enemigues, matar al rei i guanyar la partida. També té un comptador de peçes atrapades i una pantalla de resultats.`;
                link_img = "images/projects/ChessGame.png";
                demo_link = "files/Projecte-Escacs_DanaGomez.pdf#toolbar=0";
            }
            else {
                langs[0] = `Una página web creada con HTML5, CSS3, JavaScript y jQuery. Está completamente desarrollada y mantenida por mí.
                <br><strong>Algunos aspectos clave</strong>: varios idiomas, botón de imprimir/descargar, modo oscuro, pestaña de proyectos (donde los proyectos están categorizados y ordenados por fecha), filtros de proyecto, animaciones, cookies temporales, etc...`;
                langs[1] = `A website created with HTML5, CSS3, JavaScript and jQuery. It is fully developed and mainteined by me.
                <br><strong>Some key aspects</strong>: various languages, print/download button, dark mode, projects tab (where projects are categorized and ordered by date), project filters, animations, temporary cookies, etc...`;
                langs[2] = `Una pàgina web creada amb HTML5, CSS3, JavaScript i jQuery. Està totalment desenvolupada i mantinguda per mi.
                <br><strong>Alguns aspectes clau</strong>: varis llanguatges, botó de imprimir/descarregar, mode oscur, pestanya de projectes (on els projectes estan categoritzats i ordenats per data), filtres de projecte, animacions, cookies temporals, etc...`;
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
            if (!item.article) {
                return;
            }
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
                        <i class="icon fa-solid fa-plus"></i>
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
                current.toggleClass('more', 'less').html(`<i class="icon fa-solid fa-minus"></i>`);
            }
            else {
                thisParent.find('.hide').css("transition", "none").hide(700, function(){
                    $(this).css("transition", "all 0.2s ease-in");
                });
                current.toggleClass('more', 'less').html(`<i class="icon fa-solid fa-plus"></i>`);
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
        $('#curriculum .hide').hide();

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
// TODO: Read repo info from a file instead of hard-coded
