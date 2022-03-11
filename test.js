const API_URL = "https://api.github.com/users/";
const user = "danagomezbalada";

window.onload = getGithub();

async function getGithub() {
    var resp = await fetch(API_URL + user);
    var respData = await resp.json();

    const cardHTML = `
      <div class="card">
          <div>
              <img class="avatar" src="${respData.avatar_url}" alt="${respData.name}" />
          </div>
          <div class="user-info">
              <h2>${respData.name}</h2>
              <p>${respData.bio}</p>
              <ul class="info">
                  <li><strong>Followers :</strong>${respData.followers}</li>
                  <li><strong>Following :</strong>${respData.following}</li>
                  <li><strong>Repos :</strong>${respData.public_repos}</li>
                  <li><strong>Twitter :</strong> ${respData.twitter_username}</li>
                  <li><strong>Location :</strong>${respData.location}</li>
              </ul>
              <div id="repos"></div>
          </div>
      </div>
  `;
    document.getElementById("repo-box").innerHTML = cardHTML;

    resp = await fetch(API_URL + user + "/repos");
    respData = await resp.json();

    respData.forEach(item => { 
        var repo_url = item.html_url;
        var username = item.owner.login;
        var repo_name = item.name;
        var repo_description = item.description;
        var repo_language = item.language;
        var repo_stars = item.stargazers_count;
        var repo_forks = item.forks;

        // replaces null values to be better represented when displayed
        if (repo_description == null)
            repo_description = "<i>No Description</i>";
        if (repo_language == null)
            repo_language = "-";

        // Puts repo information into div
        $("#repo-box").append("<a href='" + repo_url + "' target='_blank'><div class='repo-item'><h1 class='title'>" +
            username + "/" +
            repo_name + "</h1><p class='description'>" +
            repo_description + "</p>" + "<div class='bottom'><div class='language'><span class='img' uk-icon='code' class='uk-icon'></span>" +
            repo_language + "</div>  <div class='star'><span class='img' uk-icon='star' class='uk-icon'></span>" +
            repo_stars + "  </div> <div class='fork'><span class='img' uk-icon='git-fork' class='uk-icon'></span>" +
            repo_forks + "</div></div></div>");
    });
}


function genRepo(user) {
    var requestURL = 'https://api.github.com/users/' + user + '/repos';
    var request = $.get(requestURL, function () {
    }).done(function () {
        request = request.responseJSON;
        request.forEach(item => {
            console.log(item.owner.login);
            
        });
    });
}