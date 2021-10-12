const { URL } = require('url')

// const str = 'https://github.com/louis61619/vue3-template.git'

function translateRepoToApi(string) {
  const parseUrl = new URL(string)
  const { pathname } = parseUrl
  const newUrl = `https://api.github.com/repos${pathname.replace(/\.git$/, '')}/tags`
  return newUrl
}

function translateRepoToName(string) {
  const parseUrl = new URL(string)
  const { pathname } = parseUrl
  return pathname.replace(/\.git$/, '').replace(/^./, '')
}

// translateRepo(str)

module.exports = {
  translateRepoToApi,
  translateRepoToName
}
