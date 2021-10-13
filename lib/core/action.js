const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')
const chalk = require('chalk')
const Table = require('cli-table')

const Generator = require('../utils/Generator')
const LocalCache = require('../utils/LocalCache')

const creareProjectAction = async (name, options) => {
  const cwd = process.cwd()
  // 獲取要創建的目錄地址
  const targetAir = path.join(cwd, name)

  // 判斷目錄是否存在
  if (fs.existsSync(targetAir)) {
    // 是否強制創建
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // 詢問是否覆蓋
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Target directory already exists Pick an action:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])

      if (action === 'overwrite') {
        await fs.remove(targetAir)
      } else {
        return
      }
    }
  }

  // 創建項目
  const generator = new Generator(name, targetAir)

  // 開始創建
  generator.create()
}

const addNewTemplateAction = async (name, options) => {
  // console.log(LocalCache.config, name)

  // 如果不強制覆蓋則要詢問
  if (LocalCache.config.path[name]) {
    if (!options.force) {
      const { action } = await inquirer.prompt([
        {
          name: 'action',
          type: 'list',
          message: 'Name is exist, pick an action to operate the setting:',
          choices: [
            {
              name: 'Overwrite',
              value: 'overwrite'
            },
            {
              name: 'Cancel',
              value: false
            }
          ]
        }
      ])
      if (action !== 'overwrite') {
        return
      }
    }
  }

  const { repoPath } = await inquirer.prompt([
    {
      name: 'repoPath',
      type: 'input',
      message: 'enter the github repo url:\n'
    }
  ])

  LocalCache.setConfig(name, repoPath)
  console.log(`\r\nSuccessfully add new template ${chalk.cyan(name)}`)
}

const operateSetting = async () => {
  const repoList = Object.keys(LocalCache.config.path)

  const { repoKey, action } = await inquirer.prompt([
    {
      name: 'repoKey',
      type: 'list',
      choices: repoList,
      message: 'choose a repo:'
    },
    {
      name: 'action',
      type: 'list',
      choices: [
        {
          name: 'Remove',
          value: 'remove'
        },
        {
          name: 'Cancel',
          value: false
        }
      ],
      message: 'choose action:'
    }
  ])
  if (action === 'remove') {
    LocalCache.removeConfig(repoKey)
  }
  console.log(`\r\nSuccessfully remove template ${chalk.cyan(repoKey)}`)
}

const checkConfig = () => {
  const table = new Table({
    head: ['repo name', 'repo url path']
  })
  const config = LocalCache.config.path
  Object.keys(config).forEach((key) => {
    table.push([key, config[key]])
  })

  console.log(table.toString())
}

module.exports = {
  creareProjectAction,
  addNewTemplateAction,
  checkConfig,
  operateSetting
}
