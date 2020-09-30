export class SessionStorage {
  get (value) {
    return sessionStorage.getItem(value);
  }

  set (property, value) {
    sessionStorage.setItem(property, value)
  }
}