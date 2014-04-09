# Kurtz Kloud

A Node application for detecting screen shots, uploading them to S3, and copying the URL to your clipboard.

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
