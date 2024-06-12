document.getElementById('userForm').addEventListener('submit', function(e) {  
    e.preventDefault();
  
    var xhr = new XMLHttpRequest();  xhr.open('POST', '/register', true);
    xhr.onload = function() {    if (xhr.status === 201) {
        alert('Пользователь успешно зарегистрирован');    } else if (xhr.status === 409) {
        alert('Пользователь с такими данными уже существует');    } else {
        alert('Что-то пошло не так');    }
    };  
    xhr.send(new FormData(e.target));});
  