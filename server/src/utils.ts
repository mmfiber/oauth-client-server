import fs from "fs"

type file = {
  path: string
  name: string
  extension: string
}
export function readdirRecursively (dir: string, files: file[] = []) {
  const dirents = fs.readdirSync(dir, { withFileTypes: true })
  const dirs = []
  for (const dirent of dirents) {
    if (dirent.isDirectory()) dirs.push(`${dir}/${dirent.name}`)
    if (dirent.isFile()) {
      const splitted = dirent.name.split(".")
      const name = splitted.length > 1
        ? splitted.slice(0, splitted.length - 1).join(".")
        : splitted[0]
      const extension = splitted.length > 1
        ? splitted[splitted.length - 1]
        : ""
      files.push({ path: `${dir}/${dirent.name}`, name, extension })
    }
  }
  for (const d of dirs) {
    files = readdirRecursively(d, files)
  }
  return files
}