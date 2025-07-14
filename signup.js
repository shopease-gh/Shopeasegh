document.getElementById('signupForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('signupName').value.trim();
  const phone = document.getElementById('signupPhone').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value;

  if (!name || !phone || !email || !password) {
    alert('Please fill all fields.');
    return;
  }

  const user = { name, phone, email, password };
  localStorage.setItem('shopeaseUser', JSON.stringify(user));
  localStorage.setItem('shopeaseLoggedIn', 'true');

  window.location.href = 'profile.html';
});
