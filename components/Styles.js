import { StyleSheet } from 'react-native';

export const books = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailed: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  detailed_info: {
    width: '100%',
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#000'
  },
  detailed_title: {
    fontSize: 30,
    padding: 10,
  },
  detailed_subtitle: {
    backgroundColor: '#DDD',
    padding: 2,
  },
  books: {
    width: '100%',
  }
});

export const book_card = StyleSheet.create({
  book: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10
  },
  image: {
    resizeMode: 'cover'
  },
  title: {
    fontSize: 30,
    padding: 10
  },
  price: {
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1976D2'
  },
  description: {
    padding: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
});

export const forms = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputView: {
    backgroundColor: "#EEE",
    borderRadius: 25,
    width: "65%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    padding: 15
  },
  form_title: {
    fontSize: 50,
    padding: 20
  }
});