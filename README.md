# short-url-resolving-bot
A Slack Bot that resolves real url from short url

## Usage

Basic usage
```js
npm install
npm start
```

Using with PM2
- Open `pm2.yaml` then put your slack bot token on `SLACK_TOKEN` under `env:`
- Install pm2
```js
npm install -g pm2
```
- Start with pm2
```js
pm2 start pm2.yaml
```
