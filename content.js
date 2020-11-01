
let imgs = []

const imgUrls = []

try {
  imgs = document.getElementsByTagName('table')[0].getElementsByTagName('img')
  for (let img of imgs) {
    const url = img.getAttribute('src')
    if (url.includes('ep_content')) {
      imgUrls.push(url)
    }
  }
} catch { }


console.log('Image urls: ', imgUrls)

let xhr

function repeatedlyRequestImgTranslate(index, imgUrls) {
  if (imgUrls.length == 0) return

  const url = imgUrls.shift()
  console.log('Processing img: ', url)
  xhr = new XMLHttpRequest()

  // 이거는 크롬 익스텐션 디렉토리에서 바로 가져올때.
  // xhr.open("POST", chrome.extension.getURL('https://13.125.232.150:8081'), true)

  xhr.open("POST", 'https://13.125.232.150:8081/', true)
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
      return repeatedlyRequestImgTranslate(index + 1, imgUrls)
    }
  }
}

chrome.runtime.onMessage.addListener(
  function (req, sender, sendResponse) {
    try {
      console.log(req)
      if (req.message == 'StartTranslate') {
        repeatedlyRequestImgTranslate(0, imgUrls)
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

