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
  },
  detailed_info: {
    padding: 10
  },
  detailed_title: {
    fontSize: 30
  },
  books: {
    width: '100%'
  }
});

export const book_card = StyleSheet.create({
  book: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    borderWidth: 1
  },
  image: {
    backgroundColor: '#fff'
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
    backgroundColor: "#DDD",
    borderRadius: 25,
    width: "65%",
    height: 50,
    marginBottom: 20,
    alignItems: "center",
    padding: 15
  }
});