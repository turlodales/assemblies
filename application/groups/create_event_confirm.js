import Colors from '../styles/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import NavigationBar from 'react-native-navbar';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import _ from 'underscore';
import {autocompleteStyles} from '../utilities/style_utilities';
import CalendarPicker from 'react-native-calendar-picker';
import Picker from 'react-native-picker';
import {TECHNOLOGIES,} from '../utilities/fixtures';
import {
  overlayStyles,
  optionTextStyles,
  optionStyles,
  selectStyles,
} from '../utilities/style_utilities'
import DropDown, {
  Select,
  Option,
  OptionList,
} from '../select/index';
import React, {
  ScrollView,
  Component,
  StyleSheet,
  Text,
  TextInput,
  View,
  TabBarIOS,
  Image,
  TouchableOpacity,
  Dimensions,
  NativeModules,
  InteractionManager,
  ActivityIndicatorIOS,
} from 'react-native';

const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');
let UIImagePickerManager = require('NativeModules').UIImagePickerManager;

class CreateEventConfirm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      date: new Date(),
      duration: 2,
      capacity: 100,
      showCalendar: false,
      choseDate: false,
      choseDuration: false,
      showDuration: false,
    }
  }
  onDateChange(date){
    this.setState({date: date, choseDate: true, showCalendar: false})
  }

  _renderBackButton(){
    return (
      <TouchableOpacity style={styles.backButton} onPress={()=>{
        this.props.navigator.pop();
      }}>
        <Icon name="ios-arrow-back" size={25} color="#ccc" />
      </TouchableOpacity>
    )
  }
  _renderDuration(){
    return (
      <Picker
        ref="picker"
        pickerHeight={300}
        showDuration={300}
        pickerCancelBtnText='Cancel'
        pickerBtnText='Confirm'
        onValueChange={(val)=>this.setState({duration: val})}
        pickerTitle="Event Duration"
        pickerData={[1, 2, 3, 4, 5]}//picker`s value List
        selectedValue={this.state.duration}//default to be selected value
        onPickerDone={()=>{
          this.setState({showDuration: false, choseDuration: true,})
        }}
      />
    )
  }
  _renderCapacity(){
    return (
      <Picker
        ref="picker"
        pickerHeight={300}
        showDuration={300}
        pickerCancelBtnText='Cancel'
        pickerBtnText='Confirm'
        onValueChange={(val)=>this.setState({capacity: val})}
        pickerTitle="Event Duration"
        pickerData={_.range(300)}//picker`s value List
        selectedValue={this.state.capacity}//default to be selected value
        onPickerDone={()=>{
          this.setState({showDuration: false, choseDuration: true,})
        }}
      />
    )
  }
  _renderCalendar(){
    return (
      <CalendarPicker
        selectedDate={this.state.date}
        onDateChange={this.onDateChange.bind(this)}
      />
    )
  }
  render(){
    console.log('RENDER')
    let titleConfig = {title: 'Create Assembly', tintColor: 'white'}
    let leftButtonConfig = this._renderBackButton();
    return (
      <View style={styles.container}>
        <NavigationBar
          title={titleConfig}
          tintColor={Colors.brandPrimary}
          leftButton={leftButtonConfig}
        />
        <ScrollView style={styles.formContainer}>
          <Text style={styles.h4}>When is the event?</Text>
          <View style={styles.formField}>
            <TouchableOpacity
              onPress={()=>this.setState({showCalendar: true})}
              style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.input}>{this.state.choseDate ? this.state.date.toLocaleString() : 'Choose a date'}</Text>
              <Icon name="ios-arrow-forward" color='#777' size={30} style={{marginRight: 15}}/>
            </TouchableOpacity>
          </View>
          {this.state.showCalendar ? this._renderCalendar() : null}
          <Text style={styles.h4}>How long will it last?</Text>
          <View style={styles.formField}>
            <TouchableOpacity
              onPress={()=>this.setState({showDuration: true})}
              style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.input}>{this.state.choseDuration ? this.state.duration : 'Choose a duration'}</Text>
              <Icon name="ios-arrow-forward" color='#777' size={30} style={{marginRight: 15}}/>
            </TouchableOpacity>
          </View>
          {this.state.showDuration ? this._renderDuration() : null}
          <Text style={styles.h4}>Attendee capacity</Text>
          <View style={styles.formField}>
            <TextInput placeholderTextColor='#bbb' style={styles.input} placeholder="Choose a duration"/>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={()=>{
            let {date, duration, capacity} = this.state;
            this.props.navigator.push({
              name: 'CreateGroupConfirm',
              date: date,
              duration: duration,
              capacity: capacity
            })
          }}
          style={styles.submitButton}
        >
          <Text style={styles.buttonText}>Create Event</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

let styles = {
  container: {
    flex: 1,
  },
  backButton: {
    paddingLeft: 20,
    backgroundColor: 'transparent',
    paddingBottom: 10,
  },
  formContainer: {
    backgroundColor: Colors.inactive,
    flex: 1,
    paddingTop: 25,
  },
  submitButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.brandPrimary,
    height: 80,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '400'
  },
  h4: {
    fontSize: 20,
    fontWeight: '300',
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  formField: {
    backgroundColor: 'white',
    height: 50,
    paddingTop: 5,
  },
  largeFormField: {
    backgroundColor: 'white',
    height: 100,
  },
  addPhotoContainer: {
    backgroundColor: 'white',
    marginVertical: 15,
    marginHorizontal: (deviceWidth - 200) / 2,
    borderRadius: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontSize: 18,
    paddingHorizontal: 10,
    color: Colors.brandPrimary
  },
  technologyList:{
    textAlign: 'left',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brandPrimary,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  input: {
    color: '#777',
    fontSize: 18,
    fontWeight: '300',
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  avatar: {
    height: 200,
    width: deviceWidth,
    borderRadius: 3,
    padding: 20,
  },
  largeInput: {
    color: '#777',
    fontSize: 18,
    backgroundColor: 'white',
    fontWeight: '300',
    height: 120,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
}

module.exports = CreateEventConfirm
