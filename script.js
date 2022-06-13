//////////////////////////////////////////////////////////////////////////////
//login sidan nedan
let loggedInStateContainer = document.getElementById('loggedInStateContainer');
loggedInStateContainer.style.display = 'none';
let loginBtn = document.getElementById('loginBtn');
let text = document.getElementById('text');
let userSubcribeState = document.getElementById('userSubcribeState');
let checkbox = document.getElementById('changeUserSub');
let infoUserID = document.getElementById('infoUserID');
let LoginContainer = document.getElementById('LoginContainer');
let logOutBtn = document.getElementById('logOutBtn');
let updateBtn = document.getElementById('updateBtn');
let infoUserEmail = document.getElementById('infoUserEmail');
let updatedText = document.getElementById('updatedText');
let adminContainer = document.getElementById('adminContainer');
let logOutBtnContainer = document.getElementById('logOutBtnContainer');
///Kollar LS
checkLS = () => {
  let LS = localStorage.getItem('loggedinUser');
  let LSParsed = JSON.parse(LS);

  if (LSParsed) {
    infoUserID.textContent = LSParsed._id;
    infoUserEmail.textContent = LSParsed.email;

    loggedInStateContainer.style.display = 'block';
    LoginContainer.style.display = 'none';

    if (LSParsed.subscribed) {
      userSubcribeState.textContent = 'ja';
      changeUserSub.checked = true;
    } else {
      userSubcribeState.textContent = 'nej';
      changeUserSub.checked = false;
    }
  } else {
    loggedInStateContainer.style.display = 'none';
    LoginContainer.style.display = 'block';
  }
};

checkLS();

//logga in knapp

loginBtn.addEventListener('click', () => {
  let loginEmail = document.getElementById('emailLogin').value;
  let loginPassword = document.getElementById('passwordLogin').value;

  loginUserInfo = {
    email: loginEmail,
    password: loginPassword,
  };

  if (loginEmail === '' || loginPassword === '') {
    console.log('Fel');
    text.textContent = 'Var snäll och fyll i båda fälten...';
    return;
  } else {
    loginUser(loginUserInfo);
  }
});

//////////////////////////
///Logga in user

const loginUser = async (loginUserInfo) => {
  try {
    await fetch('https://wahlstrommm-newsletter-app.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginUserInfo),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById('loginForm').reset();
        loggedInStateContainer.style.display = 'block';
        LoginContainer.style.display = 'none';
        infoUserID.textContent = result._id;
        infoUserEmail.textContent = result.email;

        if (result.subscribed) {
          userSubcribeState.textContent = 'ja';
          changeUserSub.checked = true;
        } else {
          userSubcribeState.textContent = 'nej';
          changeUserSub.checked = false;
        }

        let loggedUser = {
          isAllowed: result.isAllowed,
          _id: result._id,
          subscribed: changeUserSub.checked,
        };
        localStorage.setItem('loggedinUser', JSON.stringify(loggedUser));
      });
  } catch (error) {
    console.error('Fel ', error);
    document.getElementById('loginForm').reset();
    text.textContent = 'Fel inmatning..';
  }
};
///Logga ut knapp som tömmer LS
logOutBtn.addEventListener('click', () => {
  localStorage.clear();
});

///uppdatera knapp som uppdaterar användare och sätter nya LS ut

updateBtn.addEventListener('click', () => {
  let _id = infoUserID.textContent;
  let subscribed = changeUserSub.checked;
  let updatedUser = {
    _id: _id,
    subscribed: subscribed,
  };

  updateUser(updatedUser);
  localStorage.setItem('loggedinUser', JSON.stringify(updatedUser));
});
//////////////////////////////////////////////
///Uppdatera user
const updateUser = async (updatedUser) => {
  try {
    await fetch('https://wahlstrommm-newsletter-app.herokuapp.com/updateUser', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        updatedText.textContent = 'Det konto har nu blivit uppdaterad';
      });
  } catch (error) {
    console.error('Fel ', error);
    document.getElementById('loginForm').reset();

    text.textContent = 'Fel inmatning..';
  }
};
/////////////////////////////////////////////////
