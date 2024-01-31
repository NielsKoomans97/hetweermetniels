const txtPassword = document.querySelector('#txtPassword');

txtPassword.addEventListener('input', () => {
    const specialChars = document.querySelector('#special_chars');
    const uppercaseChars = document.querySelector('#uppercase_chars');
    const lowercaseChars = document.querySelector('#lowercase_chars');
    const numbers = document.querySelector('#numbers');

    const text = txtPassword.value;

    if (text.match('([^\\d\\w\\s]+)')){
        specialChars.classList.add('allowed');
    }
    else{
        specialChars.classList.remove('allowed');
    }

    if (text.match('([A-Z]+)')){
        uppercaseChars.classList.add('allowed');
    }
    else{
        uppercaseChars.classList.remove('allowed');
    }

    if (text.match('([a-z]+)')){
        lowercaseChars.classList.add('allowed');
    }
    else{
        lowercaseChars.classList.remove('allowed');
    }

    if (text.match('([0-9]+)')){
        numbers.classList.add('allowed');
    }
    else{
        numbers.classList.remove('allowed');
    }
});