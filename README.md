# Kurtz Kloud

A poor man's CloudApp, built with Node

### It goes like this
- You start Kurtz Kloud.
- It watches a directory of your choice, for new files matching your defined criteria. (In my case it watches my Desktop for new screen shot pngs.)
- When a new file is detected, Kurtz Kloud saves the file to a bucket of your choice in S3, copies the file's S3 URL to your clipboard, and displays a notification.

![Terminal output](https://s3.amazonaws.com/kurtzkloud.com/p/kurtz-kloud-terminal.png)
![Native notification](https://s3.amazonaws.com/kurtzkloud.com/p/kurtz-kloud-notification.jpg)

## Requirements
- Node.js ([http://nodejs.org/]())

## Install
```
git clone git@github.com:ltk/kurtz-kloud.git
cd kurtz-kloud
npm install node-notifier
```

## Configure
```
cd kurtz-kloud
cp config.json.example config.json
```

Edit `config.json` to suit your needs. Your S3 bucket must already exist. Kurtz Kloud will not create a bucket if the configured bucket is not found.

## Run
```
cd kurtz-kloud
node .
```
