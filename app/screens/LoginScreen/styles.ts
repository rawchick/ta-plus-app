import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#F5FCFF'
  },
  topContainer: {
    flex: 4
  },
  imageTop: {
    flex: 1,
    height: undefined,
    width: '100%',
    resizeMode: 'stretch'
  },
  midContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageMid: {
    width: undefined,
    height: '100%',
    aspectRatio: 1
  },
  buttonContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    textAlign: 'center',
    margin: 5
  },
  subHeader: {
    textAlign: 'center',
    marginBottom: 30
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    marginBottom: 5
  },
  buttons: {
    height: 150,
    width: 150,
    justifyContent: 'space-around',
    alignContent: 'center',
    padding: 20,
    backgroundColor: '#064ACB',
    borderRadius: 100
  },
  button: {
    flex: 1,
    padding: 20,
    margin: 20
  },
  list: {
    flex: 5,
    margin: 20
  }
})

export default styles;