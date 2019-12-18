import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container1: {
    flex: 4,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
    backgroundColor: '#ECECEC',
    paddingBottom: 20
  },
  container2: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  container3: {
    flex: 6,
    backgroundColor: '#ECECEC',
    paddingBottom: 20
  },
  sayhiText: {
    paddingTop: 5,
    fontSize: 17,
    flex: 1,
    flexDirection: 'column'
  },
  bodyHeaderTextBox: {
    borderLeftWidth: 2,
    borderLeftColor: "#ECECEC",
    flexDirection: 'row',
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bodyHeaderText: {
    fontSize: 17
  },
  editIcon: {
    backgroundColor: '#ccc',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  bodyHeaderGroupText: {
    fontSize: 17,
    paddingLeft: 15
  }
});

export default styles;