export function saveCredential(credentials) {
  localStorage.setItem('credentials', JSON.stringify(credentials));
}

export function getCredentials() {
  return JSON.parse(localStorage.getItem('credentials'));
}
