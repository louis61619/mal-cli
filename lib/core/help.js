const program = require('commander')
const chalk = require('chalk')
const figlet = require('figlet')

const helpOptions = () => {
  // 增加自己的option(定義可選參數)

  program.on('--help', () => {
    console.log(
      `\r\n${figlet.textSync('my-cli', {
        font: 'Ghost',
        horizontalLayout: 'default',
        verticalLayout: 'default',
        width: 80,
        whitespaceBreak: true
      })}`
    )

    console.log(
      `\r\nRun ${chalk.cyan(`my-cli <command> --help`)} for detailed usage of given command\r\n`
    )
  })
}

module.exports = { helpOptions }
