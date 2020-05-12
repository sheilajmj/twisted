import React, { Component } from 'react';
import Context from '../../Context';
import PatternCard from '../PatternCard/PatternCard';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import PatternCardEdit from '../PatternCard/PatternCardEdit';


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
                            <PatternCard />
                        </TabPanel>
                        <TabPanel className="contributions tab">
                            <h2>Contributions</h2>
                            <Tabs>
                                <TabList>
                                    <Tab>Published Patterns</Tab>
                                    <Tab>Add New Pattern</Tab>
                                    <Tab>Edit Patterns</Tab>
                                </TabList>
                                <TabPanel>
                                    <PatternCard />
                                </TabPanel>
                                <TabPanel>
                                    <h2>Add New Pattern</h2>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-space">
                                            <label htmlFor="name" className="pattern-add">Pattern Name:</label>
                                            <input type="text" name="name" id="name" onChange={this.handleChange} placeholder='Pattern Name' required />
                                        </div>
                                        <div className="form-space">
                                            <label htmlFor="description" className="pattern-add">Description</label>
                                            <br /><textarea type="text" className="description-textarea" name="description" id="description" onChange={this.handleChange} placeholder='Description' required />
                                        </div>
                                        <div className="form-space">
                                            <label htmlFor="craft" className="pattern-add">Craft</label>
                                            <input type="text" name="craft" id="craft" onChange={this.handleChange} placeholder='Craft' required />
                                        </div>
                                        <div className="form-space">
                                            <label htmlFor="yarn-weight" className="pattern-add">Yarn Weight</label>
                                            <input type="text" name="yarn-weight" id="yarn-weight" onChange={this.handleChange} placeholder="Yarn Weight" required />
                                        </div>
                                        <div className="form-space">
                                            <label htmlFor="needle-size">Needle Size</label>
                                            <input type="text" name="needle-size" id="needle-size" onChange={this.handleChange} placeholder="Needle Size" required />
                                        </div>
                                        <div className="form-space add-img-form">
                                            <label htmlFor="image" className="pattern-add">Image:</label>
                                            <input type="file" name="images" id="images" onChange={this.handleImageChange} />
                                        </div>
                                        <div className="form-space add-file-form">
                                            <label htmlFor="image">PDF file</label>
                                            <input type="file" name="patterndirections" id="image" onChange={this.handleFileChange} />
                                        </div>
                                        <button type="submit" value="submit">Publish Pattern</button>
                                    </form>
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