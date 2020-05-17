import React, { Component } from 'react';
import Context from '../../Context';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PatternCardEdit from '../PatternCard/PatternCardEdit';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import AddPattern from '../AddPattern/AddPattern';
import * as ROLES from '../../constants/roles';
import PatternCardFavs from '../PatternCard/PatternCardFavs';
import PatternCardContributed from '../PatternCard/PatternCardContributed';


class Account extends Component {
    static contextType = Context;

    handleAddClick = (location) => {
        this.context.history.push(`/${location}/add`)
    }


    render() {

        return (
            <section className='home'>
                <div className="container">

                    <Tabs>
                        <TabList>
                            <Tab>Favorites</Tab>
                            <Tab>Contributions</Tab>
                            <Tab>Account Info</Tab>
                        </TabList>

                        <TabPanel className="favorites tab">
                            <h2>Favorites </h2>
                            <PatternCardFavs uid={`${this.props.match.params.uid}`}/>
                        </TabPanel>
                        <TabPanel className="contributions tab">
                            <h2>Contributions</h2>
                            <Tabs>
                                <TabList>
                                    <Tab>Contributed Patterns</Tab>
                                    <Tab>Add New Pattern</Tab>
                                    <Tab>Edit Patterns</Tab>
                                </TabList>
                                <TabPanel>
                                    <PatternCardContributed />
                                </TabPanel>
                                <TabPanel>
                                   <AddPattern uid={`${this.props.match.params.uid}`} />
                                </TabPanel>
                                <TabPanel>
                                    Edit Patterns
                                <PatternCardEdit />
                                </TabPanel>
                            </Tabs>
                        </TabPanel>
                        <TabPanel>
                            <h2>Account Information</h2>
                            <div>Name:</div>
                            <div>Email Address:</div>
                            <PasswordForgetForm />
                            <PasswordChangeForm />
                        </TabPanel>
                    </Tabs>

                </div>
            </section>
        );
    }
}

export default (Account);