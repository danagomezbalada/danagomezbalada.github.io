// GitLab API Docs: https://docs.gitlab.com/ee/api/api_resources.html
// GitHub API Docs: https://docs.github.com/en/rest/overview/resources-in-the-rest-api
// itch.io API Docs: https://itch.io/docs/api/javascript


//getGitLab();
getGithub();

async function getGitLab(){
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
        
        var tags = "";
        item.topics.forEach(element => {
            tags+= element + " ";
        });
        
        var repo_description = "";
        var link_img = `<img>`;
        if (item.name.includes("PEC1")) {
            repo_description = "UOC PEC 1 Unity 2D Game";
            link_img = `<iframe frameborder="0" src="https://itch.io/embed/1237915?bg_color=1e1e1e&amp;fg_color=d4d4d4&amp;link_color=87cfd4&amp;border_color=5f5f5f" width="208" height="167"><a href="https://danagomez.itch.io/pec-1-monkey-island">PEC 1 Monkey Island by Dana Gomez</a></iframe>`;
        }
        else if (item.name.includes("PEC2")) {
            repo_description = "UOC PEC 2 Unity 2D Game";
            link_img = `<iframe frameborder="0" src="https://itch.io/embed/1276637?bg_color=444444&amp;fg_color=ffffff&amp;link_color=2ce8f4&amp;border_color=585858" width="208" height="167"><a href="https://danagomez.itch.io/pec-2-super-mario-bros">PEC 2 Super Mario Bros by Dana Gomez</a></iframe>`;
        }
        else if (item.name.includes("PEC3")) {
            repo_description = "UOC PEC 3 Unity 2D Game";
            link_img = `<iframe frameborder="0" src="https://itch.io/embed/1315332?bg_color=535353&amp;fg_color=ffffff&amp;link_color=fa5c5c&amp;border_color=575757" width="208" height="167"><a href="https://danagomez.itch.io/pec-3-scorched-earth-worms">PEC 3 Scorched Earth / Worms by Dana Gomez</a></iframe>`;
        }
        else if (item.name.includes("PEC4")) {
            repo_description = "UOC PEC 4 Unity 2D Game";
            link_img = `<iframe frameborder="0" src="https://itch.io/embed/1352334?bg_color=373737&amp;fg_color=e5e5e5&amp;link_color=fa5c5c&amp;border_color=545454" width="208" height="167"><a href="https://danagomez.itch.io/pec-4-projecte-final">PEC 4 - Projecte Final by Dana Gomez</a></iframe>`;
        }
        
        createDIV("gitlab", item.web_url, tags, link_img, item.name, repo_description, date, repo_language, item.star_count, item.forks_count, item.topics);
    }
}

async function getGithub() {
    const GITHUB_API = "https://api.github.com/users/";
    const GITHUB_USER = "danagomezbalada";
    resp = await fetch(GITHUB_API + GITHUB_USER + "/repos");
    respData = await resp.json();

    for (const item of respData) {
        console.log(item);

        var tags = "";
        item.topics.forEach(element => {
            tags+= element + " ";
        });

        var link_img = "";
        var repo_description = "";

        var date_parts = item.updated_at.split("T")[0].split("-").reverse();
        var date = date_parts[0] + "/" + date_parts[1] + "/" + date_parts[2];
        

        createDIV("github", item.html_url, tags, link_img, item.name, repo_description, date, item.language, item.stargazers_count, item.forks, item.topics);
    }
}

function createDIV(article, url, tags, link_img, name, description, date, language, stars, forks, topics) {
    // Puts repo information into div
    $(".project." + article).append(`
        <a href='${url}' target='_blank'>
            <div class='repo-item ${tags}'>
                ${link_img}
                <h1 class='title'>${name}</h1>
                <p class='description'>${description}<br>${date}</p>
                <div class='bottom'>
                    <div class='language'>
                        <span class='img' uk-icon='code' class='uk-icon'></span>
                        ${language}
                    </div>
                    <div class='star'>
                        <span class='img' uk-icon='star' class='uk-icon'></span>
                        ${stars}
                    </div>
                    <div class='fork'>
                        <span class='img' uk-icon='git-fork' class='uk-icon'></span>
                        ${forks}
                    </div>
                    <div class='fork'>
                        <span class='img' uk-icon='git-fork' class='uk-icon'></span>
                        ${topics}
                    </div>
                </div>
            </div>
    `);
}