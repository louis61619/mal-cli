const fs = require('fs-extra')
const path = require('path')
const inquirer = require('inquirer')

const Generator = require('../utils/Generator')

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

module.exports = {
  creareProjectAction
}
