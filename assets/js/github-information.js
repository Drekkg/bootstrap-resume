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

function fetchGitHubInformation() {
  let username = $("#gh-username").val();
  if (!username) {
    $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`);
    return;
  }
  $("#gh-user-data").html(`<div id="#loader">
    <img src="assets/styles/loader.gif" alt="Loading...."/></div>`);

  $.when($.getJSON(`https://api.github.com/users/${username}`)).then(
    function (response) {
      let userData = response;
      $("#gh-user-data").html(userInformationHTML(userData));
    },
    function (errorResponse) {
      if (errorResponse.status === 403) {
        $("#gh-user-data").html(`<h2>User not found ${username}</h2>`);
      } else {
        console.log(errorResponse);
        $("#gh-user-data").html(`<h2>error: ${errorResponse.errorResponseJSON.message}</h2>`);
      }
    }
  );
}
