let loginDiv = document.getElementById('loginDiv');
let logOutDiv = document.getElementById('logOutDiv');
logOutDiv.style.display = 'none';
let logOutBtn = document.getElementById('logOutBtn');

const checkLS = () => {
  let LS = localStorage.getItem('loggedinUser');
  let LSParsed = JSON.parse(LS);

  if (LSParsed) {
    document.getElementById('createAccBtn').disabled = true;
    logOutDiv.style.display = 'block';
    loginDiv.style.display = 'none';
  } else {
    logOutDiv.style.display = 'none';
  }
};
checkLS();

logOutBtn.addEventListener('click', () => {
  localStorage.clear();
  location.reload();
});
