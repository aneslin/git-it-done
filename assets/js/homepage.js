const userFormEl= document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

let getUserRepos = function(user) {
   //url
   let  apiUrl = "https://api.github.com/users/" + user +"/repos"
   fetch(apiUrl).then(function(response){ 
    if (response.ok){
    response.json().then(function(data){
        
        displayRepos(data,user);
    });
}   else {
    alert("error: github user not found");}
})
.catch(function(error){
    alert("unable to connect to Github")
})
}

let formSubmitHandler = function(event){
    event.preventDefault();
    let username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value='';
    }
    else{
        alert("Please Enter a GitHub username");
    }
  //  console.log(event)
};

let displayRepos = function(repos,searchTerm){
    if(repos.length === 0){
        repoContainerEl.textContent = "no repositories found";
        return
    }
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    for (var i = 0; i < repos.length; i++){
        let repoName = repos[i].owner.login +"/"+ repos[i].name;
    
        var  repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
        let titleEl = document.createElement("span");
        titleEl.textContent=repoName;
        repoEl.appendChild(titleEl);
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        

        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }
        else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        repoEl.appendChild(statusEl)
        repoContainerEl.appendChild(repoEl)
        }
        
    }



userFormEl.addEventListener("submit", formSubmitHandler)

