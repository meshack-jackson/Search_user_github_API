const github_url = 'https://api.github.com/users/';

const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const main = document.querySelector('.main');

async function getUser(user) {
  const { data } = await axios.get(`${github_url}${user}`);
  const res = await axios.get(`${github_url}${user}/repos`);
  const repos = res.data;
  gitUserUI(data, repos);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  main.innerHTML = '';
  getUser(searchInput.value);
  searchInput.value = '';
});

function gitUserUI(user, repos) {
  const { name, avatar_url, bio, followers, following, public_repos } = user;

  const card = document.createElement('div');
  card.classList.add('card');

  //   Image
  const div = document.createElement('div');
  const img = document.createElement('img');
  img.src = avatar_url;
  img.alt = name ? name : 'null';
  div.appendChild(img);
  //User info
  const userInfo = document.createElement('div');
  userInfo.classList.add('user-info');
  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  h2.innerHTML = name;
  p.innerHTML = bio ? bio : 'null';
  //List
  const ul = document.createElement('ul');
  ul.innerHTML = `<li>${followers} <strong>Followers</strong></li> <li>${following} <strong>Following</strong></li> <li>${public_repos} <strong>Repos</strong></li></li> `;
  userInfo.append(h2, p, ul);
  const reposDiv = document.createElement('div');
  reposDiv.setAttribute('id', 'repos');

  for (let repo of repos.slice(0, 5)) {
    const link = document.createElement('a');
    link.setAttribute('href', `https://github.com/${repo.full_name}`);
    link.classList.add('repos');
    link.innerHTML = repo.name;
    reposDiv.appendChild(link);
  }
  userInfo.appendChild(reposDiv);
  card.append(div, userInfo);
  main.appendChild(card);
}
