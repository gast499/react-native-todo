import React, {Component} from 'react';
import {View, AsyncStorage} from 'react-native';
import {Router, Scene} from 'react-native-router-flux';
import Home from './components/home';
import NewTask from './components/new_task';
import Data from '../tasks.json';
import {connect} from 'react-redux';
import {getTasks} from './actions';

class Main extends Component {
    componentDidMount() {
        var _this = this;
        AsyncStorage.getItem('data', (err, data) => {
            if (data === null) {
                AsyncStorage.setItem('data', JSON.stringify(Data.tasks));
                _this.props.getTasks();
            }
        });
    }

    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" component={Home} title="Home" initial/>
                    {/*<Scene key="new_task" component={NewTask} title="New Task"/>*/}
                </Scene>
            </Router>
        );
    }
}
export default connect(null, {getTasks})(Main);