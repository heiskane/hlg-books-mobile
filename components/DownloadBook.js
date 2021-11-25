import RNFetchBlob from 'rn-fetch-blob'
import { PermissionsAndroid } from 'react-native';

export async function download_book(book) {

  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    {
      title: "Book Download",
      message: "Downloading a book requires access to storage",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log("Permissions Granted")
    // send http request in a new thread (using native code)
    
    let dirs = RNFetchBlob.fs.dirs
    const android = RNFetchBlob.android

    RNFetchBlob.config({
      //fileCache: true,
      path: dirs.DownloadDir + `/${book.title}.pdf`,
      addAndroidDownloads: {
        useDownloadsManager: true,
        notifications: true,
        title: book.title,
        description: book.description,
        mediaScannable: true,
      }
    })
      .fetch('GET', 'http://12a5-86-115-55-28.ngrok.io/books/1/download/', {
        // Authorization : 'Bearer access-token...',
        // more headers  ..
      })
      .then((res) => {
        console.log("Saved to: " + res.path())
        //alert("File saved as " + res.path())
        android.actionViewIntent(res.path(), 'application/pdf')
      })
      // Something went wrong:
      .catch((errorMessage, statusCode) => {
        // error handling
        console.log("ERROR DOWNLOADING FILE: " + errorMessage + " -> " + statusCode)
      })
  } else {
    console.log("Permissions denied")
  }



}