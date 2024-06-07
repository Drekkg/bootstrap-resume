function userInformationHTML(user) {
  return `
  <h2>${user.name}<span class="small-name">
      (@<a href="${user.html_url}" target="_blank">${user.login}</a>)
      </span>
      </h2>
      <div class="gh-content">
          <div class="gh-avatar">
      <a href="${user.html_} target="_blank">
      <img src="${user.avatar_url} width="80" height="80" alt="${user.name}" />
      </a>
           </div>
           <p> Followers: ${user.followers} - Following: ${user.following} <br>
           Repos: ${user.public_repos}</p>
      </div>`;
}

function repoInformationHTML(repos) {
  if (repos.length === 0) {
    return `<div class="clearfix repo-list">No Repos!</div>`;
  }
  let listItemsHTML = repos.map((repo) => {
    return `<li>
    <a href="${repo.html_url}" target=_blank">${repo.name}</a>
    </li>`;
  });
  return `<div class="clearfix repo-list">
  <p>
  <strong>Repo List:</strong>
  </p>
  <ul>
  ${listItemsHTML.join("\n")}
  </ul>
  </div>`;
}

function fetchGitHubInformation() {
  $("#gh-user-data").html("");
  $("#gh-repo-data").html("");
  let username = $("#gh-username").val();
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }
  $("#gh-user-data").html(`<div id="#loader">
    <img src="assets/styles/loader.gif" alt="Loading...."/></div>`);

  $.when(
    $.getJSON(`https://api.github.com/users/${username}`),
    $.getJSON(`https://api.github.com/users/${username}/repos`)
  ).then(
    function (firstResponse, secondResponse) {
      let userData = firstResponse[0];
      let repoData = secondResponse[0];
      $("#gh-user-data").html(userInformationHTML(userData));
      $("#gh-repo-data").html(repoInformationHTML(repoData));
    },
    function (errorResponse) {
      if (errorResponse.status === 404) {
        $("#gh-user-data").html(`<h2>User not found ${username}</h2>`);
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(`<h2>error: ${errorResponse.errorResponseJSON.message}</h2>`);
      }
    }
  );
}
$(document).ready(fetchGitHubInformation);
