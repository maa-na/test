import express from 'express'
import line from '@line/bot-sdk'
import dotenv from 'dotenv'
import { getGourmetSearch } from './apiCall.mjs'

dotenv.config()
const PORT = process.env.PORT || 3008;

const config = {
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

express()
  .get('/', (req, res) => res.send('Hello LINE BOT!(GET)'))
  .get("/webhook", (req, res) => res.send('webhook ok(GET)'))
  .post('/webhook', line.middleware(config), (req, res) => handleEvent(req, res))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const client = new line.Client(config);

async function handleEvent(req, res) {
  res.status(200).end();

  const apiRes = await getGourmetSearch()
  console.log('res', apiRes.results)

  const names = apiRes.results.shop.map(val => val.name)

  const promises1 = names.map(name => repalyNames(name))

  console.log('come on handler')
  const events = req.body.events;
  const promises2 = events.map(event => replay(event))

  Promise.all(promises).then(console.log("pass1"));
  Promise.all(promises2).then(console.log("pass2"));
}

async function repalyNames(name) {
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: name
  })
}

async function replay(event) {
  const profile =  await client.getProfile(event.source.userId);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: `${profile.displayName}さん、今「${event.message.text}」って言いました？`
  })
}
