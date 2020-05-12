import React, { Component } from 'react';
//import Context from '../../Context';
import PatternCard from '../PatternCard/PatternCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
 

class Account extends Component {
   // static contextType = Context;

    // handleAddClick = (location) => {
    //     this.context.history.push(`/${location}/add`)
    // }


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

                    <TabPanel>
                        <h2>Favorites </h2>
                        <PatternCard 
                        // cards={this.state.favorites}
                        />
                    </TabPanel>
                    <TabPanel>
                        <h2>Contributions</h2>
                        <PatternCard 
                        // cards={this.state.contributions}
                        />
                    </TabPanel>
                    <TabPanel>
                        <h2>Account Information</h2>
                        <div>Name:</div>
                        <div>Account Name:</div>
                        <div>Reset Password</div>
                    </TabPanel>
                    </Tabs>

                </div>
            </section>
        );
    }
}


export default Account;