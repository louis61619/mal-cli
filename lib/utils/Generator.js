const util = require('util')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const downloadGitRepo = require('download-git-repo')
const fs = require('fs-extra')

// const { repoList } = require('../config/repo-config')
const { getTagList } = require('../http/repo')
const { translateRepoToApi, translateRepoToName } = require('./translateRepo')
const LocalCache = require('./LocalCache')

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
    this.repoList = []
    this.downloadGitRepo = util.promisify(downloadGitRepo)
    this.repoMap = {}
  }

  // 獲取倉庫
  async getRepo() {
    this.repoMap = LocalCache.config.path
    this.repoList = Object.keys(this.repoMap)

    const { repoKey } = await inquirer.prompt({
      name: 'repoKey',
      type: 'list',
      choices: this.repoList,
      message: 'Please choose a template to create project'
    })
    return this.repoMap[repoKey]
  }

  // 從倉庫中獲取tag列表給用戶選擇
  async getTag(repo) {
    const tags = await this.wrapLoading(getTagList, 'waiting fetch tag', translateRepoToApi(repo))
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
    // 1）拼接下載地址
    const requestUrl = `${translateRepoToName(repo)}${tag ? `#${tag}` : ''}`

    // 2）調用下載方法
    await wrapLoading(
      this.downloadGitRepo, // 遠程倉庫下載方法
      'waiting download template', // 提示訊息
      requestUrl, // 下載地址
      path.resolve(process.cwd(), this.targetDir) // 目錄地址
    )
  }

  handleFile() {
    const filePath = `${path.resolve(process.cwd(), this.targetDir)}/package.json`
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath).toString()
      const json = JSON.parse(data)
      json.name = this.name
      // 修改package.json
      fs.writeFileSync(filePath, JSON.stringify(json, null, '\t'), 'utf-8')
    }
  }

  // 創建邏輯
  async create() {
    // 獲取倉庫名
    const repo = await this.getRepo()

    // 獲取tag名
    const tag = await this.getTag(repo)

    // 下載
    await this.download(repo, tag)

    // 處理文件
    this.handleFile()

    // 提示完成
    console.log(`\r\nSuccessfully created project ${chalk.cyan(this.name)}`)
    console.log(`\r\n  cd ${chalk.cyan(this.name)}`)
    console.log('  npm run serve\r\n')
  }
}

module.exports = Generator
