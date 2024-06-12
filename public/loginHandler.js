document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
  
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        alert('Вы успешно вошли в систему');
      } else {
        alert('Ошибка входа в систему');
      }
    };
  
    xhr.send('email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password));
  });