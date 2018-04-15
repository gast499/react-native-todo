import React, {Component} from 'react';
import {StyleSheet, FlatList, View, Text, TextInput, ActivityIndicator, TouchableHighlight} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as ReduxActions from '../actions';
import {Actions} from 'react-native-router-flux';

class Home extends Component{
    constructor(props) {
        super(props);

        this.state={};
        this.renderItem = this.renderItem.bind(this);
    }
    componentDidMount(){
        this.props.getTasks();
    }
    render(){
        if (this.props.loading){
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            );
        }
        else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref="refList"
                        data={this.props.tasks}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}/>
                </View>
            );
        }
    }
    renderItem({item, index}){
        return (
          <View style={styles.row}>
            <Text style={styles.task}>
                {item.text}
            </Text>
          </View>
        );
    }
};

function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        tasks: state.dataReducer.tasks
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ReduxActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor: '#F5F5F5'
    },

    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },

    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        padding: 10
    },

    task: {
        marginTop: 5,
        fontSize: 14,
    },

    addButton: {
        backgroundColor: '#ff5722',
        borderColor: '#ff5722',
        borderWidth: 1,
        height: 50,
        width: 50,
        borderRadius: 50 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    }
});