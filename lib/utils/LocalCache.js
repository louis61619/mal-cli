const fs = require('fs-extra')
// const path = require('path')
const { homedir } = require('os')

// https://github.com/louis61619/vue3-template.git

class LocalCache {
  constructor() {
    this.configPath = ''
    this.config = {
      path: {
        // 'vue3-template': 'https://api.github.com/repos/louis61619/vue3-template'
        'vue3-template': 'https://github.com/louis61619/vue3-template.git'
      }
    }
  }

  initCofingPath() {
    // 如果不存在則添加設定
    if (this.configPath === '') {
      this.configPath = `${homedir()}/.mal-cli/config.json`
    }
    const exist = fs.pathExistsSync(this.configPath)
    if (!exist) {
      fs.ensureFileSync(`${this.configPath}`)
    }
  }

  initConfig() {
    const config = fs.readFileSync(this.configPath, 'utf8')
    if (!config) {
      fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, '\t'), 'utf-8')
    } else {
      let fileConfig
      try {
        fileConfig = JSON.parse(config)
      } catch (error) {
        fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, '\t'), 'utf-8')
        return
      }
      if (fileConfig.path === undefined) {
        fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, '\t'), 'utf-8')
      } else {
        this.config = fileConfig
      }
    }
  }

  setConfig(key, value) {
    this.config.path[key] = value
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, '\t'), 'utf-8')
  }

  removeConfig(key) {
    delete this.config.path[key]
    fs.writeFileSync(this.configPath, JSON.stringify(this.config, null, '\t'), 'utf-8')
  }
}

module.exports = new LocalCache()
