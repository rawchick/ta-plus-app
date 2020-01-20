import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#064ACB'
  },
  verticalField: {
    marginVertical: 10
  },
  formWrapper: {
    margin: 20,
    marginBottom: 10
  },
  icon: {
    paddingLeft: 10,
  },
  staffListContainer: {
    flexWrap: 'wrap',
    margin: 20,
    flexDirection: 'row',
  },
  staffText: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  removeTripDestinationIcon: {
    color: "#D9534F",
    paddingLeft: 10
  },
  tripDestinationText: {
    color: 'black',
    fontSize: 18,
    marginLeft: 10,
    flex: 1,
    textAlign: "left"
  },
  addMoreText: {
    color: '#AEB3B8',
    fontSize: 16,
    marginLeft: 5
  },
  addMoreDestinationBtn: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  tripDestinationItem: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#AEB3B8"
  },
  tripDestinationList: {
    marginVertical: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor: '#5CB85C',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2
  },
  submitText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#1C7CD5',
    margin: 20,
    marginBottom: 30,
  },
  staffImg: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 3,
    borderRadius: 50,
    borderColor: '#AC91FD',
    marginLeft: 15,
    marginTop: 15,
  },
  addStaffBtn: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 4,
    borderRadius: 50,
    borderColor: "#AEB3B8",
    marginLeft: 15,
    marginTop: 15
  }
});

export default styles;
