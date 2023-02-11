const newSearchSubmit = document.getElementById('github-form').addEventListener('submit', gitSearch)

function gitSearch (event) {
    event.preventDefault()
    document.getElementById('user-list').innerHTML = ''
    document.getElementById('repos-list').innerHTML = ''
    const searchValue = document.getElementById('search').value
    document.getElementById('github-form').reset()
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        }
    }
    fetch(`https://api.github.com/search/users?q=${searchValue}`, request)
        .then(response => response.json())
        .then(data => getUsernames(data.items))
}

function getUsernames(results) {
    // console.log(results)
    const usernames = results.map((result) => result.login)
    // console.log(usernames)
    for (const user of usernames) {
        postUsersToDom(user)
    }
}

function postUsersToDom (user) {
    // console.log(user)
    const newUserSpot = document.createElement('li')
    newUserSpot.textContent = user
    newUserSpot.className = 'user'
    newUserSpot.addEventListener('click', () => getRepos(user))
    document.getElementById('user-list').appendChild(newUserSpot)
    // console.log(newUserPlace)
}

function getRepos(user) {
    console.log(user)
    document.getElementById('repos-list').innerHTML = ''
    
    const request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.v3+json'
        },
    }
    fetch(`https://api.github.com/users/${user}/repos`, request)
        .then(response => response.json())
        // .then(data => console.log(data))
        .then(data => postRepos(data))
    // const newRepoList = document.createElement(li)
}

function postRepos(repos) {
    console.log(repos)
    const repoUrls = repos.map((repo) => repo.html_url)
    for (const repoUrl of repoUrls) {
        const newRepoSpot = document.createElement('li')
        newRepoSpot.textContent = repoUrl
        document.getElementById('repos-list').appendChild(newRepoSpot)
    }
}