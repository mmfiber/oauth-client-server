// import fs from "fs"

// type File = {
//   path: string
//   name: string
//   extension: string
// }
// export function readdirRecursively (dir: string, files: File[] = []) {
//   const dirents = fs.readdirSync(dir, { withFileTypes: true })
//   const dirs = []
//   for (const dirent of dirents) {
//     if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
//     if (dirent.isFile()) {
//       const splitted = dirent.name.split(".")
//       const name = splitted.length > 1
//         ? splitted.slice(0, splitted.length - 1).join(".")
//         : splitted[0]
//       const extension = splitted.length > 1
//         ? splitted[splitted.length - 1]
//         : ""
//       files.push({ path: `${dir}/${dirent.name}`, name, extension })
//     }
//   }
//   for (const d of dirs) {
//     files = readdirRecursively(d, files)
//   }
//   return files
// }

export function urlBuilder(url: string, queries: any = {}) {
  const query = Object.keys(queries).map(k => k + "=" + queries[k]).join("&")
  return query ? url + "?" + query : url
}