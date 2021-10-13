#! /usr/bin/env node

const program = require('commander')

const { helpOptions } = require('./lib/core/help')
const creareCommands = require('./lib/core/create')

// 創建本地緩存
const LocalCache = require('./lib/utils/LocalCache')

LocalCache.initCofingPath()
LocalCache.initConfig()

// 查看版本號
program.version(require('./package.json').version, '-v', '--version') // 新增-v的參數設置
program.version(`v${require('./package.json').version}`).usage('<command> [option]')

// 幫助和可選信息
helpOptions()
creareCommands()

program.parse(process.argv)
