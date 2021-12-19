let getUserRepos = function(user) {
   //url
   let apiUrl = `https://api.github.com/users/${user}/repos`
fetch(apiUrl).then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
});
}
getUserRepos("microsoft")

