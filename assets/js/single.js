const issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");


let getRepoIssues = function(repo){
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayIssues(data);
                if (response.headers.get("Link")) {
                    displayWarning(repo)
                }
            })
        } else {
            alert("there was a problem with your request")
        }
    })
};

var displayWarning= function(repo){
    limitWarningEl.textContent="To see more than 30 issues visit ";
    var linkEl = document.createElement("a");
    linkEl.textContent = "see more issues on github";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank")
    limitWarningEl.appendChild(linkEl)
}

let displayIssues = function(issues){
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues";
        return
    }
    for (let i = 0; i < issues.length; i++){
        var issueEl = document.createElement("a");
            issueEl.classList = "list-item flex-row justify-space-between align-center";
            issueEl.setAttribute("href", issues[i].html_url);
            issueEl.setAttribute("targer", "_blank");

            let titleEl = document.createElement("span");
                titleEl.textContent=issues[i].title;
                issueEl.appendChild(titleEl);
            
            let typeEl = document.createElement("span")
            if (issues[i].pull_request){
                typeEl.textContent="(Pull Request)";
            } else {
                typeEl.textContent="(Issue)"
            }
            issueEl.appendChild(typeEl)
            issueContainerEl.appendChild(issueEl);
    };
    

}


getRepoIssues("facebook/react")