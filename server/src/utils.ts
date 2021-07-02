import crypto from "crypto"

export function urlBuilder(url: string, queries: any = {}) {
  const query = Object.keys(queries).map(k => k + "=" + queries[k]).join("&")
  return query ? url + "?" + query : url
}

export function hash(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex")
}

export function date(daysLater: number) {
  const dt = new Date()
  return new Date(dt.setDate((dt.getDate() + daysLater)))
}