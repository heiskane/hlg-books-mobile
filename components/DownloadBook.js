import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import { PermissionsAndroid } from 'react-native';


export async function download_book(book, auth) {

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
    const instance = axios.create();


    let task = RNFetchBlob.config({
      fileCache: true,
      path: dirs.DownloadDir + `/${book.title}.pdf`,
      addAndroidDownloads: {
        useDownloadsManager: true,
        notifications: true,
        path: dirs.DownloadDir + `/${book.title}.pdf`,
        title: book.title,
        description: book.description,
        mediaScannable: true,
      }
    })
      .fetch('GET', `${axios.defaults.baseURL}/books/${book.id}/download/`, {
        'Authorization': `Bearer ${auth.token}`
      })
      .then((res) => {
        // TODO: Figure out how to cancel download when unauthorized
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