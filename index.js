#! /usr/bin/env node

// const program = require('commander')

// program.parse(process.argv);

const program = require('commander')

// const {helpOptions} = require('./lib/core/help')
// const creareCommands = require('./lib/core/create')

// 查看版本號
// program.version(require('./package.json').version, '-v', '--version'); //新增-v的參數設置
// program.version(require('./package.json').version)

program
  // 定義命令

  .command('create <app-name>')
  .description('create a new project')
  // -f or --force 強制創建
  .option('-f, --force', 'overwrite target directory if it exist')
  .action((name, options) => {
    // 打印結果

    console.log('name:', name, 'options:', options)
  })

// 配置版本信息
program.version(require('./package.json').version, '-v', '--version') // 新增-v的參數設置
program.version(`v${require('./package.json').version}`).usage('<command> [option]')

// 幫助和可選信息
// helpOptions()
// creareCommands()

program.parse(process.argv)
