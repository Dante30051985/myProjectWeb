const enterSite = document.querySelector('button#enterSite');

enterSite.onclick = () => {
    if (document.querySelector('div.backgroundShadow') != null) {
    
    document.querySelector('div.backgroundShadow').remove();
    document.querySelector('div.containerFormAuth').remove();
    }
    document.querySelector('button#enterSite').setAttribute('disabled', true);
    createForm();
    eventsForm();
    eventsButtonRecovery();
}

const eventsRecoverey = () => {
    const buttonRecovery = document.querySelector('button#sendRecovery');

    buttonRecovery.onclick = () => {
        checkedCaptachaResult = checkedCaptcha();
    }
}

const checkedCaptcha = () =>{
    if (navigator.cookieEnabled === false) {
        return cookie_disabled = 'У вас выключены куки, включите их!';
    } else {
            enterCaptcha = 'userCaptcha='+
            encodeURIComponent(document.querySelector('input[name=code]').value);      
        fetch('./php/captcha/checkedCaptcha.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            },
            body: enterCaptcha
        }).then(response => response.text()).then(result => processingResultCaptcha(result))
    }
}

const processingResultCaptcha = (result) => {
     if (result === 'false') {
        contForm = document.querySelector('div.containerFormAuth');
        warningError = document.createElement('div');
        warningError.className = 'errorCaptcha';
        warningError.innerHTML = '<div class="wrapError"><div class="textCaptchaError">Капча введена неправильно!</div>'+
                                 '<button id="closeWarningCaptcha">ОК</button></div>';
        contForm.appendChild(warningError);

        document.querySelector('button#closeWarningCaptcha').addEventListener('click', function(){
            document.querySelector('div.errorCaptcha').remove();
        })
    } else {
       const recoveryEmailUser = document.querySelector('input#recoveryEmail');
       if (!recoveryEmailUser.value) {
        errorMsg(msg = 'Вы не указали эл. почту!');
       } else {
            checkedRecoveryEmailValid = validEmail(recoveryEmailUser.value);
            if (checkedRecoveryEmailValid) {
                console.log('Отправляю письмо для восстановления доступа');
            } else {
                errorMsg(msg = 'Неправильная эл. почта!');
            }
       }
    }
}

const eventsButtonRecovery = () => {
    const recoveryPassword = document.querySelector('button#recoveryPassowrd');
    recoveryPassword.onclick = () => {
        const titleEntereSite = document.querySelector('div.titleFormAuth');
        const wrapInput = document.querySelector('div.inputEnterSite');
        const authUser = document.querySelector('button#authUser');
        const recoveryPassowrd = document.querySelector('button#recoveryPassowrd');    
        
        titleEntereSite.remove();
        wrapInput.remove();
        authUser.remove();
        recoveryPassowrd.remove();

        createInputRecovery();
        createCaptcha();
        eventsRecoverey();
}
}


const createCaptcha = () =>{
    const formCaptcha = document.createElement('div');
    const wpInput = document.querySelector('div.wrapInput');

    formCaptcha.className = 'captcha';
    formCaptcha.innerHTML = '<div class="wrapCaptcha"><img src="./php/captcha/captcha_generation.php" id="captcha-image">'+
                            '<div class="wrapInputCaptcha"><input type="text" name="code" placeholder="Введите капчу">'+
                            '<button id="sendRecovery">Отправить</button>'+
                            '</div>';
    wpInput.appendChild(formCaptcha);


    
}

const createInputRecovery = () => {
    const titleFormRecovery = document.createElement('div');
    titleFormRecovery.className = 'titleFormRec';
    titleFormRecovery.innerHTML = '<div id="titleRecovery">Восстановление доступа</div>';
    document.querySelector('div.wrapTitleAuth').appendChild(titleFormRecovery);

    const inputRecoverySite = document.createElement('div');
    inputRecoverySite.className = 'inputRecoverySite';
    inputRecoverySite.innerHTML = '<label>Эл. почта</label><input type="text" id="recoveryEmail" placeholder="Ваша эл. почта">';
    document.querySelector('div.wrapInput').appendChild(inputRecoverySite);

 
}

const eventsForm = () => {
       const closeForm = document.querySelector('div#closeEnterSite');
       const form = document.querySelector('div.backgroundShadowCover');
       const enterUser = document.querySelector('button#authUser');

       closeForm.onclick = () => { form.remove();
        document.querySelector('button#enterSite').removeAttribute('disabled');
    }
       enterUser.onclick = () => {
        const email = document.querySelector('input#emailuser');
        const passw = document.querySelector('input#passworduser');
        
        if (!email.value) {
            errorMsg(msg = 'Вы не указали электронную почту!');
                 } else {
            let correctnessEmailUser = validEmail(email.value);
                if (correctnessEmailUser) {
                    if (!passw.value) {
                        errorMsg(msg = 'Вы не указали пароль!');
                    } else {
                        console.log('Входим на сайт');
                    }
                } else {
                    errorMsg(msg = 'Неправильная эл. почта!');
                }
        }
    }
}

function errorMsg(messgaeError) {
    contForm = document.querySelector('div.containerFormAuth');
    warningError = document.createElement('div');
    warningError.className = 'errorCaptcha';
    warningError.innerHTML = '<div class="wrapError"><div class="textCaptchaError">'+messgaeError+'</div>'+
                             '<button id="closeWarningCaptcha">ОК</button></div>';
    contForm.appendChild(warningError);

    document.querySelector('button#closeWarningCaptcha').addEventListener('click', 
    function(){ document.querySelector('div.errorCaptcha').remove();
    })
}

function validEmail(e) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return String(e).search (filter) != -1;
}


const createForm = () => {
    const backgroundShadow = document.createElement('div');
    backgroundShadow.className = 'backgroundShadowCover';
    document.body.appendChild(backgroundShadow);

    const containerFormAuth = document.createElement('div');
    containerFormAuth.className = 'containerFormAuth';
    document.querySelector('div.backgroundShadowCover').appendChild(containerFormAuth);

    const leftFormAuth = document.createElement('div');
    leftFormAuth.className = 'leftFormAuth';
    document.querySelector('div.containerFormAuth').appendChild(leftFormAuth);
    
    const rightFormAuth = document.createElement('div');
    rightFormAuth.className = 'rightFormAuth';
    document.querySelector('div.containerFormAuth').appendChild(rightFormAuth);

    const wrapTitleAuth = document.createElement('div');
    wrapTitleAuth.className = 'wrapTitleAuth';
    document.querySelector('div.rightFormAuth').appendChild(wrapTitleAuth);
   
    const wrapInput= document.createElement('div');
    wrapInput.className = 'wrapInput';
    document.querySelector('div.rightFormAuth').appendChild(wrapInput);
   
    const closeFormAuth = document.createElement('div');
    closeFormAuth.className = 'closeFormAuth';
    closeFormAuth.innerHTML = '<div id="closeEnterSite">X</div>';
    document.querySelector('div.wrapTitleAuth').appendChild(closeFormAuth);

    const titleFormAuth = document.createElement('div');
    titleFormAuth.className = 'titleFormAuth';
    titleFormAuth.innerHTML = '<div id="titleAuth">Вход на сайт</div>';
    document.querySelector('div.wrapTitleAuth').appendChild(titleFormAuth);

    const inputEnterSite = document.createElement('div');
    inputEnterSite.className = 'inputEnterSite';
    inputEnterSite.innerHTML = '<label>Эл. почта</label><input type="text" id="emailuser" placeholder="Ваша эл. почта">'+
                               '<label>Пароль</label><input type="password" id="passworduser" placeholder="Ваш пароль">';
    document.querySelector('div.wrapInput').appendChild(inputEnterSite);

    const buttonEnterSite = document.createElement('div');
    buttonEnterSite.className = 'buttonEnterSite';
    buttonEnterSite.innerHTML = '<button id="authUser">Войти</button><button id="recoveryPassowrd">Забыли пароль...</button>';
    document.querySelector('div.rightFormAuth').appendChild(buttonEnterSite);
}