const { RTMClient, WebClient } = require('@slack/client');
const puppeteer = require('puppeteer');
const uuidv4 = require('uuid/v4');
const short = require('./regex');
const fs = require('fs');
const token = process.env.SLACK_TOKEN;
const rtm = new RTMClient(token);
const web = new WebClient(token);
rtm.start();

rtm.on('message', (event) => {
  let result = short.matchShorts(event.text);
  console.log(result);
  if(result != undefined){
    let fileid = uuidv4();
    (async () => {
    const browser = await puppeteer.launch({args: ['--lang=ko-KR']});
    const page = await browser.newPage();
    await page.goto(`http://${result}`);
    await page.waitFor(2000);
    await page.screenshot({path: `${fileid}.png`});
    let realUrl = await page.url();
    let pageTitle = await page.title();
    await browser.close();

    rtm.sendMessage(`*단축 URL 감지됨!*
    단축 URL: ${result}
    원래 URL: ${realUrl}
    페이지 제목: ${pageTitle}`, event.channel)
    .then((res) => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
    rtm.sendMessage(`*메시지 원본*\n`
      +`>>>\n ${event.text}\n`
      +`<@${event.user}> 님이 작성함`, event.channel)
    .then((res) => {
      // `res` contains information about the posted message
      console.log('Message sent: ', res.ts);
    })
    .catch(console.error);
    console.log(`Uploading ${fileid}.png`);
    web.files.upload({
      filename:`${result}_${fileid}.png`,
      // You can use a ReadableStream or a Buffer for the file option
      file: fs.createReadStream(`./${fileid}.png`),
      // Or you can use the content property (but not both)
      // content: 'plain string content that will be editable in Slack'
      channels: event.channel
    })
      .then((res) => {
        // `res` contains information about the uploaded file
        console.log('File uploaded: ', res.file.id);
        fs.unlink(`${fileid}.png`, (err) => {
          if (err) console.log(err);
          console.log(`${fileid}.png was deleted from disk`);
        });
      })
      .catch(console.error);
    })();
  }

  // Log the message
  console.log(`(channel:${event.channel}) ${event.user} says: ${event.text}`);
});
