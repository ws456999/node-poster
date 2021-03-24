const Service = require('egg').Service
const puppeteer = require('puppeteer')
const fs = require('fs')

const generatePoster = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    // devtools: false,
  })
  const page = await browser.newPage()
  const iPhone6 = {
    'userAgent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
    'viewport': {
      'width': 375,
      'height': 667,
      'deviceScaleFactor': 2,
      'isMobile': true,
      'hasTouch': true,
      'isLandscape': false
    }
  }
  await page.emulate(iPhone6)
  await page.setViewport({ width: 375, height: 667 })

  await page.setContent(`<div id="content">
    <style>
      .app {
        background: red;
      }
    </style>
    <div>
      <div class="app">
        123123123
      </div>
      <div class="app">
        123123123
      </div>
      <div class="app">
        123123123
      </div>
      <div class="app">
        123123123
      </div>
      <div class="app">
        123123123
      </div>
      <div class="app">
        123123123
      </div>
    </div>
  </div>`)
  const elementHandle = await page.$('#content')
  const base64 = await elementHandle.screenshot({
    encoding: 'base64',
  })

  await browser.close()
  // fs.writeFileSync('./img.txt',  `data:image/png;base64,${base64}"/>`)

  return base64
}

class UserService extends Service {
  async generatePoster() {
    // 假如 我们拿到用户 id 从数据库获取用户详细信息
    const base64 = await generatePoster();
    return {
      img: `data:image/png;base64,${base64}`,
    }
  }
}
module.exports = UserService
