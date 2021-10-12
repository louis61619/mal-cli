const program = require('commander')
const {
  creareProjectAction,
  addNewTemplateAction,
  checkConfig,
  operateSetting
} = require('./action')

const createCommands = () => {
  program
    // 定義命令
    .command('create <app-name>')
    .description('create a new project')
    // -f or --force 強制創建
    .option('-f, --force', 'overwrite target directory if it exist')
    .action((name, options) => {
      creareProjectAction(name, options)
    })

  program
    .command('add <new-template>')
    .description('add a new template')
    .option('-f, --force', 'overwrite the setting if it exist')
    .action((name, options) => {
      addNewTemplateAction(name, options)
    })

  program
    .command('setup')
    .description('operate setting, etc: remove some template')
    .action(() => {
      operateSetting()
    })

  program
    .command('ls')
    .description('see your config')
    .action(() => {
      checkConfig()
    })
}

module.exports = createCommands
