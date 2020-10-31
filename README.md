# Getting started with chrome extension development

## Basic Guideline

1. Implement manifest.json
2. Go to `chrome://extensions`
3. Turn on Chrome extension `developer mode`
4. `Load unpacked`

manifest.json

```js
"page_action": {
  "default_popup": "popup.html",
  "default_icon": {
    "16": "images/get_started16.png",
    "32": "images/get_started32.png",
    "48": "images/get_started48.png",
    "128": "images/get_started128.png"
  }
},
```

## Image Translator

1. 크롬 익스텐션에서 현재 페이지의 이미지들을 전부 추출함
2. 추출한 이미지를 로컬호스트로 보냄.
3. 로컬 서버에서 이미지를 처리해서 http response 를 전달해줌.
4. 받은 이미지를 원래 이미지와 바꿔치기함.
