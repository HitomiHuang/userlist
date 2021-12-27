const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users/'

const users = []
const dataPanel = document.querySelector('#data-panel')

function renderUserList(data) {
  let userHTML = ''
  data.forEach((item) => {
    userHTML += `<div style="width: 10rem;">
      <img src="${item.avatar}" type="button" class=" border border-1 border-dark rounded user-avatar " data-bs-toggle="modal" data-bs-target="#avatarInfo" data-id = ${item.id} alt="UserAvatar">
        <p class="fs-6">${item.name + ' ' + item.surname}</p>       
    </div>`
  })
  dataPanel.innerHTML = userHTML
}

function showUserInfo(id) {
  const userName = document.querySelector('#modal-userName')
  const userInfo = document.querySelector('#modal-userInfo')
  const userAvatar = document.querySelector('#modal-avatar')
  axios
    .get(INDEX_URL + id)
    .then((response) => {
      const data = response.data
      userName.innerText = data.name + ' ' + data.surname
      userAvatar.src = data.avatar
      userInfo.innerHTML = `
<p>email: ${data.email}</p>
<p>gender: ${data.gender}</p>
<p>age: ${data.age}</p>
<p>region: ${data.region}</p>
<p>birthday: ${data.birthday}</p>`
    })
    .catch((err) => console.log(err))
}

dataPanel.addEventListener('click', function onClickAvatar(event) {
  if (event.target.matches(".user-avatar")) {
    showUserInfo(event.target.dataset.id)
  }
})

axios
  .get(INDEX_URL)
  .then((response) => {
    users.push(...response.data.results)
    renderUserList(users)
  })
  .catch((err) => console.log(err))
