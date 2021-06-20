export const sessionStorage = {
  setItem(key: string, val: string) {
    window.sessionStorage.setItem(key, val)
  },
  setItems(items: { [key: string]: string }) {
    Object.keys(items).forEach(key => this.setItem(key, items[key]))
  }
}