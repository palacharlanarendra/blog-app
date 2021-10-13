export default function storeCollector() {
  let store = JSON.parse(localStorage.getItem('login'));
  if (store && store.login) {
    this.setState({ login: true, store: store });
  }
}
