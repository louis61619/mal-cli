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
  // console.log(repo)
  return axios.get(repo)
}

module.exports = {
  getTagList
}
