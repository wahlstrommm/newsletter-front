//Skapa användare

let regBtn = document.getElementById('regBtn');
let text = document.getElementById('text');
//kollar LS om någon är inloggad eller inte
const checkLS = () => {
  let LS = localStorage.getItem('loggedinUser');
  let LSParsed = JSON.parse(LS);

  if (LSParsed) {
    document.getElementById('FormContainer').style.display = 'none';
    let div = document.createElement('div');
    let text = document.createElement('h2');
    text.textContent = 'Du är redan inloggad om du vill logga ut tryck nedan:';
    div.append(text);
    let btn = document.createElement('button');
    btn.innerText = 'Logga ut';
    btn.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
    div.append(btn);
    let root = document.getElementById('root');
    root.append(div);
  }
};
checkLS();

//registreringsknapp
regBtn.addEventListener('click', function () {
  let userFname = document.getElementById('fName').value;
  let userLname = document.getElementById('lName').value;
  let userEmail = document.getElementById('email').value;
  let userPassword = document.getElementById('password').value;
  let subcriber = false;

  if (document.getElementById('checkbox').checked) {
    subcriber = true;
  } else {
    subcriber = false;
  }
  if (userFname == '' || userLname == '' || userEmail == '' || userPassword == '') {
    return (text.textContent = 'Något blev fel! Var snäll att kolla så du har skrivit in rätt uppgifter..');
  } else {
    let newUser = {
      fname: userFname,
      lname: userLname,
      email: userEmail,
      password: userPassword,
      subcriber: subcriber,
    };

    createUser(newUser);
  }
});
//Skapar användare
const createUser = async (newUser) => {
  try {
    await fetch('https://wahlstrommm-newsletter-app.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then((response) => response.json())
      .then((result) => {
        document.getElementById('form').reset();
        if (result.message) {
          return (text.textContent = result.message);
        } else {
          text.textContent = 'Lyckad!..';
        }
      });
  } catch (error) {
    console.error('Fel ', error);
    document.getElementById('form').reset();

    text.textContent = 'Fel, det finns ett konto med denna mail redan.. Om du har glömt bort ditt lösenord kontakta Support!';
  }
};
