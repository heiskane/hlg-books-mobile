import RNFetchBlob from 'rn-fetch-blob'

export function download_book() {

  let dirs = RNFetchBlob.fs.dirs

  // send http request in a new thread (using native code)
  RNFetchBlob.config({
    fileCache: true,
    path: dirs.DownloadDir + "/image5.jpg",
    addAndroidDownloads: {
      useDownloadsManager: true,
      notifications: true,
      description: 'Pls work for the love of god once in your damn life',
      title: 'test420',
    }
  })
    .fetch('GET', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Baked_Potato_%283662019664%29.jpg/1920px-Baked_Potato_%283662019664%29.jpg', {
      // Authorization : 'Bearer access-token...',
      // more headers  ..
    })
    .then((res) => {
      console.log("Saved to: " + res.path())
      alert("File saved as " + res.path())
    })
    // Something went wrong:
    .catch((errorMessage, statusCode) => {
      // error handling
      console.log("ERROR DOWNLOADING FILE: " + errorMessage + " -> " + statusCode)
    })

}