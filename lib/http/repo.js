const axios = require('axios')

axios.interceptors.response.use((res) => {
  return res.data
})
/**
 * 獲取倉庫資訊
 * @param {string} repo
 * @returns Promise
 */
async function getTagList(repo) {
  return axios.get(`https://api.github.com/repos/louis61619/${repo}/tags`)
}

module.exports = {
  getTagList
}
