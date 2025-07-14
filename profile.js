// Redirect to login if not logged in
if (localStorage.getItem('shopeaseLoggedIn') !== 'true') {
  window.location.href = 'login.html';
}

const user = JSON.parse(localStorage.getItem('shopeaseUser') || '{}');

document.getElementById('profileName').value = user.name || '';
document.getElementById('profilePhone').value = user.phone || '';
document.getElementById('profileEmail').value = user.email || '';

document.getElementById('profileForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const updatedUser = {
    name: document.getElementById('profileName').value.trim(),
    phone: document.getElementById('profilePhone').value.trim(),
    email: document.getElementById('profileEmail').value.trim(),
    password: user.password // keep the original password
  };

  localStorage.setItem('shopeaseUser', JSON.stringify(updatedUser));
  alert('Profile updated!');
  window.location.href = 'index.html'; // Redirect to homepage
});
