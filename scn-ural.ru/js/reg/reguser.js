const buttonRegUser = document.querySelector('button#regUser');

buttonRegUser.onclick = () => {
    if (document.querySelector('div.backgroundShadowCover') != null) {
    
        document.querySelector('div.backgroundShadowCover').remove();
        document.querySelector('div.containerFormReg').remove();
        }
        buttonRegUser.setAttribute('disabled', true);
    createFormRegUser();
    eventFormRegHint();
    eventCreateNewUser();
}

function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}

eventCreateNewUser = () => {
    login = document.querySelector('input#loginUser');
    emailUser = document.querySelector('input#emailUser');
    nameUser = document.querySelector('input#nameUser');
    famUser = document.querySelector('input#famUser');
    passwordUser = document.querySelector('input#password');
    recoveryPassword = document.querySelector('input#retryPassword');
    caphUser = document.querySelector('input#enterCaptcha');
    userAgree = document.querySelector('input#userAgree');
    buttonCreateAccount = document.querySelector('button#createAccount');
    buttonCreateAccount.onclick = () => {
    if (!login.value) { 
        errorMsg(msg = 'Вы не заполнили поле логин!');
       } else {
        if (!emailUser.value) {
            errorMsg(msg = 'Вы не указали электронную почту!');
        } else {
            checkedEnterEmail = validEmail(emailUser.value);
            if (!checkedEnterEmail) {
            errorMsg(msg = 'Вы ввели не правильный адрес электронной почты!');    
            } else {
        if (!nameUser.value) {
            errorMsg(msg = 'Вы не указали своё имя');
        } else {
        if (!famUser.value) {
            errorMsg(msg = 'Вы не указали свою фамилию');
        } else {
        if (!passwordUser.value) {
            errorMsg(msg = 'Вы не указали пароль');
        } else {
        if (!recoveryPassword.value) {
            errorMsg(msg = 'Вы забыли повторить свой пароль');
        } else {
            if (passwordUser.value != recoveryPassword.value) {
                errorMsg(msg = 'Введённые пароли не совпадают!');
            } else {
        if (!caphUser.value) {
            errorMsg(msg = 'Вы не ввели капчу!');
        } else {
        if (!userAgree.checked) {
            errorMsg(msg = 'Вы не согласились с пользовательским соглашением');
        } else {
                sendCaptcha(login, emailUser, nameUser, famUser, passwordUser, userAgree);
              }
          }}}}}}}}}
    }
}

function sendCaptcha(login, emailUser, nameUser, famUser, passwordUser, userAgree) {
    if (navigator.cookieEnabled === false) {
        return cookie_disabled = 'У вас выключены куки, включите их!';
    } else {
            enterCaptcha = 'userCaptcha='+
            encodeURIComponent(document.querySelector('input#enterCaptcha').value);      
        fetch('./php/captcha/checkedCaptcha.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: enterCaptcha
        }).then(response => response.text()).then(result => resultCheckedCaptchaFormReg(result, login, emailUser, nameUser, famUser, passwordUser, userAgree))
    }
}

function resultCheckedCaptchaFormReg(result, login, emailUser, nameUser, famUser, passwordUser, userAgree) {
   if (result === 'false') {
    errorMsg(msg = 'Неверно введена капча!');
   } else {
            param = 'userLogin='+login.value+'&emailUser='+emailUser.value+'&nameUser='+nameUser.value+
                    '&famUser='+famUser.value+'&password='+passwordUser.value+'&userAgreee='+userAgree.value;
           // encodeURIComponent(document.querySelector('input#enterCaptcha').value);      
        fetch('./php/reg/reg.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: param
        }).then(response => response.text()).then(result => console.log(result))
   }
}

eventFormRegHint = () => {
    login = document.querySelector('input#loginUser');
    emailUser = document.querySelector('input#emailUser');
    passwordUser = document.querySelector('input#password');
    captchaUser = document.querySelector('input#enterCaptcha');
    
    closeReg = document.querySelector('div.closeReg');
    closeReg.onclick = () => {
        document.querySelector('div.backgroundShadowCover').remove();
        document.querySelector('button#regUser').removeAttribute('disabled');
    }

    captchaUser.onfocus = () => {
        if (document.querySelector('div.wrapHint') == null) {
            hintMsg(hint = 'Укажите слова изображенные на картинке через пробел');
            
            hint = document.querySelector('div.wrapHint');
            captchaUsers = document.querySelector('input#enterCaptcha');
            
            resolutionScreenWidth = document.body.offsetWidth;
        //подсказки для ноутбука и desktop
            if (resolutionScreenWidth > 800) {
                element = captchaUsers.getBoundingClientRect();
                leftx = element.x - 205;
                topy = element.y-40;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            } else {
                console.log('подсказки для мобильных');
            }
        }
    }

    captchaUser.onblur = () => {
        document.querySelector('div.wrapHint').remove();
    }


    passwordUser.onfocus = () => {
        if (document.querySelector('div.wrapHint') == null) {
            hintMsg(hint = 'Рекомендуемая длинна пароля не менее 5 символов с использованием цифр, например: vasya1235');
            
            hint = document.querySelector('div.wrapHint');
            passwUser = document.querySelector('input#password');
            
            resolutionScreenWidth = document.body.offsetWidth;
        //подсказки для ноутбука и desktop
            if (resolutionScreenWidth > 800) {
                element = passwUser.getBoundingClientRect();
                leftx = element.x - 205;
                topy = element.y-40;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            } 
            if (resolutionScreenWidth < 800) {
                element = passwUser.getBoundingClientRect();
                leftx = element.x ;
                topy = element.y - 145;
                document.querySelector('div.treangleHint').setAttribute('style', '-webkit-clip-path: polygon(58% 80%, 23% 2%, 109% -32%)');
                // document.querySelector('div.treangleHint').style.clipPath = 'polygon(58% 80%, 23% 2%, 109% -32%)';
                document.querySelector('div.wrapHint').style.flexDirection = 'column';
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            }
        }
    }

    passwordUser.onblur = () => {
        document.querySelector('div.wrapHint').remove();
    }


    emailUser.onfocus = () => {
        if (document.querySelector('div.wrapHint') == null) {
            hintMsg(hint = 'Укажите свою эл. почту! Он будет использоваться для входа на сайт, и для отправки вам сообщения для восстановления аккаунта. В случае утери к нему доступа.');
            
            hint = document.querySelector('div.wrapHint');
            emailUser = document.querySelector('input#emailUser');
            
            resolutionScreenWidth = document.body.offsetWidth;
        //подсказки для ноутбука и desktop
            if (resolutionScreenWidth > 800) {
                element = emailUser.getBoundingClientRect();
                leftx = element.x - 205;
                topy = element.y-85;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            } else {
                element = emailUser.getBoundingClientRect();
                leftx = element.x + 30;
                topy = element.y + 30;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            }
        }
    }

    emailUser.onblur = () => {
        document.querySelector('div.wrapHint').remove();
    }


    login.onfocus = () => {
        if (document.querySelector('div.wrapHint') == null) {
            hintMsg(hint = 'Придумайте себе логин. Он будет использоваться в качестве адреса вашей страницы. Логин должен состоять из букв латиницы');
            
            hint = document.querySelector('div.wrapHint');
            login = document.querySelector('input#loginUser');
            
            resolutionScreenWidth = document.body.offsetWidth;
        //подсказки для ноутбука и desktop
            if (resolutionScreenWidth > 800) {
                element = login.getBoundingClientRect();
                leftx = element.x - 205;
                topy = element.y - 65;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            } else {
                element = login.getBoundingClientRect();
                leftx = element.x + 30;
                topy = element.y + 30 ;
                document.querySelector('div.wrapHint').style.left = leftx+'px';
                document.querySelector('div.wrapHint').style.top = topy+'px';
            }
        }
    }
    login.onblur = () => {
        document.querySelector('div.wrapHint').remove();
    }
    

}

function hintMsg(hintMsg) {
    hintWrap = document.createElement('div');
    hintWrap.className = 'wrapHint';
    document.querySelector('div.containerFormReg').appendChild(hintWrap);

    containerHint = document.createElement('div');
    containerHint.className = 'containerHint';
    document.querySelector('div.wrapHint').appendChild(containerHint);

    treangleHint = document.createElement('div');
    treangleHint.className = 'treangleHint';
    document.querySelector('div.wrapHint').appendChild(treangleHint);

    textHint = document.createElement('div');
    textHint.className = 'textHint';
    textHint.innerHTML = hintMsg;
    document.querySelector('div.containerHint').appendChild(textHint);


}

function errorMsg(messgaeError) {
    contFormReg = document.querySelector('div.containerFormReg');
    warningError = document.createElement('div');
    warningError.className = 'errorCaptcha';
    warningError.innerHTML = '<div class="wrapError"><div class="textCaptchaError">'+messgaeError+'</div>'+
                              '<button id="closeWarningCaptcha">ОК</button></div>';
                              contFormReg.appendChild(warningError);

    document.querySelector('button#closeWarningCaptcha').addEventListener('click', 
    function(){ document.querySelector('div.errorCaptcha').remove();
    })
}

const createFormRegUser = () => {
    const backgroundShadow = document.createElement('div');
    backgroundShadow.className = 'backgroundShadowCover';
    document.body.appendChild(backgroundShadow);

    const containerFormRegAuth = document.createElement('div');
    containerFormRegAuth.className = 'containerFormReg';
    document.querySelector('div.backgroundShadowCover').appendChild(containerFormRegAuth);
   
    const leftFormReg = document.createElement('div');
    leftFormReg.className = 'leftFormReg';
    document.querySelector('div.containerFormReg').appendChild(leftFormReg);
    
    const rightFormReg = document.createElement('div');
    rightFormReg.className = 'rightFormReg';
    document.querySelector('div.containerFormReg').appendChild(rightFormReg);

    const wrapTitleReg = document.createElement('div');
    wrapTitleReg.className = 'wrapTitleReg';
    document.querySelector('div.rightFormReg').appendChild(wrapTitleReg);

    const titleReg = document.createElement('div')
    titleReg.className = 'titleReg';
    titleReg.innerHTML = 'Новый аккаунт';
    document.querySelector('div.wrapTitleReg').appendChild(titleReg);

    const closeReg = document.createElement('div')
    closeReg.className = 'closeReg';
    closeReg.innerHTML = 'X';
    document.querySelector('div.wrapTitleReg').appendChild(closeReg);

    const inputFormReg = document.createElement('div')
    inputFormReg.className = 'inputFormReg';
    inputFormReg.innerHTML = '<label>Логин</label><input type="text"  id="loginUser" placeholder="Логин">'+
        
                             '<label>Эл.почта</label><input type="text" id="emailUser" placeholder="Эл. почта">'+
                             '<label>Имя</label><input type="text" id="nameUser" placeholder="Ваше имя">'+
                             '<label>Фамилия</label><input type="text" id="famUser" placeholder="Ваша фамилия">'+
                          
                           
                             '<label>Пароль</label><input type="password" id="password" placeholder="Придумайте пароль">'+
                             '<label>Повторите пароль</label><input type="password" id="retryPassword" placeholder="Повторите пароль">'+
                             '<img src="./php/captcha/captcha_generation.php" id="captchaReg">'+
                             '<input type="text" id="enterCaptcha" placeholder="Введите капчу">'+
                             '<div class="wrapUserAgree">'+
                             '<input type="checkbox" id="userAgree">'+
                             '<label>я ознакомился(ась) с пользовательским соглашением</label></div>'+
                             '<button id="createAccount">Создать аккаунт</button>';
    document.querySelector('div.rightFormReg').appendChild(inputFormReg);

 
}

