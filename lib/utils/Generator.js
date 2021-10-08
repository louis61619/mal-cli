const util = require('util')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const downloadGitRepo = require('download-git-repo')

const { repoList } = require('../config/repo-config')
const { getTagList } = require('../http/repo')

// 導入es6模塊
let ora
import('ora').then((module) => {
  ora = module.default
})

// 加載動畫函數
async function wrapLoading(fn, message, ...args) {
  const spinner = ora(message)
  spinner.start()

  try {
    const result = await fn(...args)
    spinner.succeed()
    return result
  } catch (error) {
    // 修改狀態為失敗
    spinner.fail('Request failed, refetch ...')
    return false
  }
}

class Generator {
  constructor(name, targetDir) {
    // 目錄名稱
    this.name = name
    // 目錄位置
    this.targetDir = targetDir
    this.wrapLoading = wrapLoading
    this.repoList = repoList
    this.downloadGitRepo = util.promisify(downloadGitRepo)
  }

  // 獲取倉庫
  async getRepo() {
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: this.repoList,
      message: 'Please choose a template to create project'
    })
    return repo
  }

  // 從倉庫中獲取tag列表給用戶選擇
  async getTag(repo) {
    const tags = await this.wrapLoading(getTagList, 'waiting fetch tag', repo)
    if (!tags) return {}

    const tagsList = tags.map((item) => item.name)

    const { tag } = await inquirer.prompt({
      name: 'tag',
      type: 'list',
      choices: tagsList,
      message: 'Place choose a tag to create project'
    })

    return tag
  }

  async download(repo, tag) {
    // 1）拼接下载地址
    const requestUrl = `louis61619/${repo}${tag ? `#${tag}` : ''}`

    // 2）调用下载方法
    await wrapLoading(
      this.downloadGitRepo, // 遠程倉庫下載方法
      'waiting download template', // 提示訊息
      requestUrl, // 下載地址
      path.resolve(process.cwd(), this.targetDir) // 目錄地址
    )
  }

  // 創建邏輯
  async create() {
    // 獲取倉庫名
    const repo = await this.getRepo()

    // 獲取tag名
    const tag = await this.getTag(repo)

    // 下載
    await this.download(repo, tag)

    // 提示完成
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run serve\r\n')
  }
}

module.exports = Generator
