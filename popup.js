function log(text) {
  try {
    const bkg = chrome.extension.getBackgroundPage();
    bkg.console.log(text)
  } catch (err) {
    console.log(err)
  }
}

const startTranslateBtn = document.getElementById('startTranslate')
const stopTranslateBtn = document.getElementById('stopTranslate')
startTranslateBtn.disabled = false
stopTranslateBtn.disabled = true


// 버튼 클릭하면 페이지의 body 의 백그라운드 색을 바꿈.
// changeColor.onclick = function (element) {
//   console.log('Clicked change background image')
//   let color = element.target.value;
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     chrome.tabs.executeScript(
//       tabs[0].id,
//       { code: 'document.body.style.backgroundColor = "' + color + '";' });
//   });
// };

startTranslateBtn.onclick = () => {
  log('Clicked start translate')
  startTranslateBtn.disabled = true
  stopTranslateBtn.disabled = false
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'StartTranslate' }, () => {

    })
  })
}

stopTranslateBtn.onclick = () => {
  startTranslateBtn.disabled = false
  stopTranslateBtn.disabled = true
  log('Clicked stop translate')
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { message: 'StopTranslate' }, () => {

    })
  })
}


// var imgURL = chrome.runtime.getURL("images/myimage.png");
// document.getElementById("someImage").src = imgURL;