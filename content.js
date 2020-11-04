
let imgs = []

const imgUrls = []

try {
  // 모든 이미지 요소 저장
  imgs = document.getElementsByTagName('img')
  for (let i = 0; i < imgs.length; i++) {
    const img = imgs[i]
    // console.log(img.width, img.height)
    const url = img.getAttribute('src')
    // 이미지 요소를 외부에서 가져오고 크기가 500이상인 경우만 번역하기 인덱스랑 같이 저장
    if (img.width > 500 && url.startsWith('http')) {
      imgUrls.push({ index: i, url })
    }
  }
} catch (err) { console.log(err) }


console.log('Image urls: ', imgUrls)

let xhr

function repeatedlyRequestImgTranslate(imgUrls) {
  if (imgUrls.length == 0) return

  const { index, url } = imgUrls.shift()
  console.log('Processing img: ', url)
  xhr = new XMLHttpRequest()

  // 이거는 크롬 익스텐션 디렉토리에서 바로 가져올때.
  // xhr.open("POST", chrome.extension.getURL('https://118.33.41.203:8081'), true)

  xhr.open("POST", 'https://118.33.41.203:8081/', true)
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(JSON.stringify({
    index,
    url
  }));


  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const translatedImgUrl = xhr.responseText
      console.log(xhr.responseText)
      imgs[index].src = translatedImgUrl
      return repeatedlyRequestImgTranslate(imgUrls)
    }
  }
}

chrome.runtime.onMessage.addListener(
  function (req, sender, sendResponse) {
    try {
      console.log(req)
      if (req.message == 'StartTranslate') {
        repeatedlyRequestImgTranslate(imgUrls)
        sendResponse({ message: "TranslationStarted" })
      } else if (req.message == 'StopTranslate') {
        xhr.abort()
        sendResponse({ message: "TranslationStopped" })
      }
    } catch (err) {
      console.log(err)
    }

  }
)

