# mal-cli

這是一個用於管理 github 倉庫的工具，透過設定檔案快速下載想要使用的模板

## 安裝

```
npm i -g mal-cli
```

## 使用

下載模板

```
mal-cli create my-app
```

> 預設只有一個 vue3 的模板

新增模板

```
mal-cli add new-repo
```

刪除模板

```
mal-cli setup
```

查看本地設置

```
mal-cli ls
```

## 修改設定檔

設定檔位於 ~/.mal-cli/config.json

```
{
  "path": {
    "vue3-template": "https://github.com/louis61619/vue3-template"
  }
}
```

你可以加入新的倉庫模板，key 是自訂名稱，value 是倉庫地址，請寫在 path 中

---

you can use this cli tools to manage your template on github

## Install

download repo

```
npm i -g mal-cli
```

add new repo config

```
mal-cli add new-repo
```

see local config

```
mal-cli ls
```

remove local config

```
mal-cli setup
```

## Usage

```
mal-cli create my-app
```

## Config

if you want to change setting, you can modify setting file in ~/.mal-cli

```
{
  "path": {
    "vue3-template": "https://github.com/louis61619/vue3-template"
  }
}
```

repo setting in path, key is cutom name, value is repo path
