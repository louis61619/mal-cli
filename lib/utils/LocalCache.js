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
    if (this.configPath === '') {
      this.configPath = `${homedir()}/.mal-cli/config.json`
    }
    // this.baseDir = path.dirname(this.configPath)
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
      this.config = JSON.parse(config)
    }
    return this.config
  }
}

module.exports = new LocalCache()
