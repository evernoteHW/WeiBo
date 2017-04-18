
module.exports = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(247,247,242)',
  },
  flatlist: {
    width: '100%',
    height: '100%',
    marginBottom: 0,
    // backgroundColor: '#FFFFFF'
  },
  itemComponent:{
    // flex: 1,
    height: 80,
    flexWrap:'wrap',
    flexDirection: 'row',
    // height: '100%',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'white',
    // backgroundColor:'white',
    // shadowColor: 'gray',
    // shadowOffset: {width:0,height:5},
    // shadowRadius: 0.5,
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    // borderRadius: 5,

    // marginTop: 20,
    // marginBottom: 20,
  },
  headerComponent:{
    flexDirection:'column',
    width: '100%',
    height: 365,
  },
  whiteShadow:{
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor:'white',
    left: 10,
    right: 10,
    bottom: 15,
    height: 138,
    shadowColor: 'gray',
    shadowOffset: {width:0,height:5},
    shadowRadius: 0.5,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    borderRadius: 5,
  },
  footerComponent:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 90,
  },
  leftTipTitle:{
    marginLeft: 0,
    marginTop: 10,
    width: '50%' ,
    height: 14,
    textAlign:
    'center'
  },
  rightTipTitle:{
    marginRight: 0 ,
    marginTop: 10,
    width: '50%',
    textAlign:'center',
    height: 14
  },
  leftPercent:{
    marginLeft: 0, marginTop: 15, fontSize:27, width: '50%' ,height: 30, textAlign: 'center', color: 'red'
  },
  rightPercent:{
    marginRight: 0, marginTop: 15, width: '50%', height: 30,fontSize:27, textAlign: 'center', color: 'red'
  },
  headerText:{
    color:'#333333', fontSize:14, alignSelf:'center'
  },
  headersubText:{
    color:'#666666', fontSize:14, alignSelf:'center'
  },
};
