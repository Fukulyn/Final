# Palworld Deck Manager 帕魯管理系統

## 專案簡介

讓遊玩幻獸帕魯的玩家有可以管理遊玩中收集到的帕魯

## 功能簡介

能根據每個人自行創建管理帳號及登入系統

能新增、刪除、更新現有帕魯名單

能根據帕魯的名稱與工作特性做搜尋

## 技術選用

前端: React, TypeScript, CSS

後端 :MongoDB

## API規格


## 架構與流程圖

![image](frontend/系統架構圖2.drawio.png)

# 使用與執行

## 下載程式封裝碼

`git clone https://github.com/Fukulyn/Final.git`

## 設定後端環境變數 
在 `backend` 中
將 `.env.example` 複製到 `.env `上

```
DBUSER=test               # 資料庫使用者
DBPASSWORD=password       # 資料庫密碼
DBHOST=127.0.0.1          # 資料庫連線位置
DBPORT=8974               # 資料庫連線埠
DBNAME=name               # 資料庫名稱
PORT=2083                 # 後端監聽位置
LogPath=logs              # log生成位置
assetsPath=/assets        # assets生成位置
HomePagePath=/index.html  # 首頁位置
privateKey=key            # 私密金鑰

```

## 切換到專案目錄

`cd Final`

前端

`cd frontend`

後端

`cd backend`

## 下載相關安裝模組與執行

`npm install`

`npm run dev`

# 影片連結






