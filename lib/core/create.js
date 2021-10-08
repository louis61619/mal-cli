const program = require('commander')
const { creareProjectAction } = require('./action')

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
}

module.exports = createCommands
