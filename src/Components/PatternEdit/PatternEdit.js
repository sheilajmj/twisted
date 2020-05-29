import React, { Component } from 'react';
import Context from '../../Context';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import { withFirebase } from '../Firebase';

class PatternEdit extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            newPattern: {}
        }
    }


    getPatternData = () => {
        this.props.firebase.db.ref(`patterns/${this.props.match.params.patternId}`).once("value", (snapshot) => {
            let pattern = snapshot.val()
            this.setState({ defaultPattern: pattern })
        })
            .catch((error) => console.log(error))
    }


    handleChange = (event) => {
        const key = (event.target.name);
        const value = (event.target.value);
        const { newPattern } = this.state;
        newPattern[key] = value;
        this.setState({ newPattern });
    }

    ////////////////////////////////////////


    handleImageChange = (event) => {
        const { newPattern } = this.state;
        newPattern["image_file"] = event.target.files[0]
        newPattern["image_file_name"] = event.target.files[0].name
        this.setState({ newPattern })
        // this.setState({ image_file: event.target.files[0] });
        // this.setState({ image_file_name: event.target.files[0].name });
    }

    handleFileChange = (event) => {
        const { newPattern } = this.state;
        newPattern["pdf_file"] = event.target.files[0]
        newPattern["pdf_file_name"] = event.target.files[0].name
        this.setState({ newPattern })
    }

    checkUploadPdf = () => {
        if (this.state.pdf_file) {
            this.handleUploadPdf();
        }
        else {
            this.checkUploadImage();
        }
    }

    handleUploadPdf = () => {
        if (this.state.newPattern.pdf_file) {
            let metadata = {
                contributor_user_id: this.state.defaultPattern.contributor_user_id,
                pattern_name: this.state.newPattern.pattern_name ? this.state.newPattern.pattern_name : this.state.defaultPattern.pattern_name
            }
            const uploadTask = this.props.firebase.storage.ref().child('pattern-directions/' + this.state.newPattern.pdf_file_name).put(this.state.newPattern.pdf_file, metadata);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },

                () => {

                    this.props.firebase.storage.ref('/pattern-directions/')
                        .child(this.state.newPattern.pdf_file_name)
                        .getDownloadURL()
                        .then(fireBaseUrl => {
                            const { newPattern } = this.state;
                            newPattern["pdf_file_URL"] = fireBaseUrl
                            this.setState({ newPattern }) })
                        })
                        .then(() => {
                            this.checkUploadImage();
                        });
                }
    }

    handleSetThumbnail = () => {

        let fileName = this.state.newPattern.image_file_name.slice(0, -4)
        let fileExt = this.state.newPattern.image_file_name.slice(-4)


        if (this.state.newPattern.image_file_URL) {

            this.props.firebase.storage.ref('/images/thumbnails')
                .child(fileName + '_200x200' + fileExt)
                .getDownloadURL()
                .then(fireBaseUrl => {
                    const { newPattern } = this.state;
                    newPattern["thumbnail_image_file_URL"] = fireBaseUrl
                    newPattern["thumbnail_image_file_name"] = fileName + '_200x200' + fileExt 
                    this.setState({ newPattern }) 
                })
                .then(() => {
                    this.createPattern()
                });
        }
    }


    checkUploadImage = () => {
        if (this.state.newPattern.image_file) {
            this.handleUploadImage()
        }
        else {
            this.handleSetThumbnail();
        }
    }

    handleUploadImage = () => {
        if (this.state.newPattern.image_file) {
            let metadata = {
                contributor_user_id: this.state.defaultPattern.contributor_user_id,
                pattern_name: this.state.newPattern.pattern_name ? this.state.newPattern.pattern_name : this.state.defaultPattern.pattern_name
            }
            const uploadTask = this.props.firebase.storage.ref().child('images/' + this.state.newPattern.image_file_name).put(this.state.newPattern.image_file, metadata);

            uploadTask.on(
                "state_changed",
                snapshot => { },
                error => {
                    console.log(error)
                },

                () => {
                    // gets the functions from storage refences the image storage in firebase by the children
                    // gets the download url then sets the image from firebase as the value for the imgUrl key:
                    this.props.firebase.storage.ref('/images/')
                        .child(this.state.newPattern.image_file_name)
                        .getDownloadURL()
                        .then(fireBaseUrl => {

                            const { newPattern } = this.state;
                            newPattern["image_file_URL"] = fireBaseUrl
                            this.setState({ newPattern })
                         })
                        }
                        );
                        this.handleSetThumbnail();
                }
        };
    


    createPattern = () => {
        if (this.state.newPattern) {
            console.log("GOT HERE")
            let pattern_id = this.state.defaultPattern.pattern_id
            let author_name = this.state.newPattern.author_name ? this.state.newPattern.author_name : this.state.defaultPattern.author_name
            let pattern_name = this.state.newPattern.pattern_name ? this.state.newPattern.pattern_name : this.state.defaultPattern.pattern_name
            let description = this.state.newPattern.description ? this.state.newPattern.description : this.state.defaultPattern.description
            let craft = this.state.newPattern.craft ? this.state.newPattern.craft : this.state.defaultPattern.craft
            let yarn_weight = this.state.newPattern.yarn_weight ? this.state.newPattern.yarn_weight : this.state.defaultPattern.yarn_weight
            let needle_size = this.state.newPattern.needle_size ? this.state.newPattern.needle_size : this.state.defaultPattern.needle_size
            let image_file_name = this.state.newPattern.image_file_name ? this.state.newPattern.image_file_name : this.state.defaultPattern.image_file_name
            let thumbnail_image_file_URL = this.state.newPattern.thumbnail_image_file_URL ? this.state.newPattern.thumbnail_image_file_URL : this.state.defaultPattern.thumbnail_image_file_URL
            let thumbnail_image_file_name = this.state.newPattern.thumbnail_image_file_name ? this.state.newPattern.thumbnail_image_file_name : this.state.defaultPattern.thumbnail_image_file_name
            let pdf_file_name = this.state.newPattern.pdf_file_name ? this.state.newPattern.pdf_file_name : this.state.defaultPattern.pdf_file_name
            let contributor_user_id = this.state.newPattern.contributor_user_id ? this.state.newPattern.contributor_user_id : this.state.defaultPattern.contributor_user_id
            let contributor_name = this.state.newPattern.contributor_name ? this.state.newPattern.contributor_name : this.state.defaultPattern.contributor_name
            let image_file_URL = this.state.newPattern.image_file_URL ? this.state.newPattern.image_file_URL : this.state.defaultPattern.image_file_URL
            let pdf_file_URL = this.state.newPattern.pdf_file_URL ? this.state.newPattern.pdf_file_URL : this.state.defaultPattern.pdf_file_URL


            let pattern = {
                pattern_id,
                author_name,
                pattern_name,
                description,
                craft,
                yarn_weight,
                needle_size,
                image_file_name,
                thumbnail_image_file_URL, 
                thumbnail_image_file_name, 
                pdf_file_name,
                contributor_user_id,
                contributor_name,
                image_file_URL,
                pdf_file_URL

            }

            this.props.firebase.db.ref(`/patterns/`).update({ [`${pattern_id}`]: pattern })

                // .then((response)=> {
                //   let pattern_id = response.key
                //   this.props.firebase.db.ref(`/patterns/${pattern_id}`).update({pattern_id: pattern_id})
                //   this.props.firebase.db.ref(`/users/${contributor_user_id}/contributed/`).update({[`${pattern_id}`]: true})
                //     return (response)  
                // })                    
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.checkUploadPdf();
    }

    ////////////////////////

    componentDidMount = () => {
        this.getPatternData();

    }

    render() {
        let pattern = this.state.defaultPattern
        if (this.state.defaultPattern) {
            return (
                <>
                    <AccountNavigationMain userId={this.props.match.params.userId} />
                    <h2>Edit Pattern</h2>
                    <div className="add-flex-container">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-space">
                                <label htmlFor="pattern_name" className="pattern-add">Pattern Name:</label>
                                <input type="text" name="pattern_name" id="pattern_name" onChange={this.handleChange} placeholder='Pattern Name' defaultValue={pattern.pattern_name} required />
                            </div>
                            <div className="form-space">
                                <label htmlFor="description" className="pattern-add">Description</label>
                                <br /><textarea type="text" className="description-textarea w-99" name="description" id="description" onChange={this.handleChange} placeholder='Description' defaultValue={pattern.description} required />
                            </div>
                            <div className="form-space">
                                <label htmlFor="craft" className="pattern-add">Craft</label>
                                <input type="text" name="craft" id="craft" onChange={this.handleChange} placeholder='Craft' defaultValue={pattern.craft} required />
                            </div>
                            <div className="form-space">
                                <label htmlFor="yarn-weight" className="pattern-add">Yarn Weight</label>
                                <input type="text" name="yarn-weight" id="yarn-weight" onChange={this.handleChange} placeholder="Yarn Weight" defaultValue={pattern.yarn_weight} required />
                            </div>
                            <div className="form-space">
                                <label htmlFor="needle-size">Needle Size</label>
                                <input type="text" name="needle-size" id="needle-size" onChange={this.handleChange} placeholder="Needle Size" defaultValue={pattern.needle_size} required />
                            </div>
                            <hr></hr>
                            <div className="form-space add-img-form">
                                <div>To change image file - please select new image to replace existing.</div>
                                <label htmlFor="image" className="pattern-add">Image:</label>
                                <input type="file" name="images" id="images" onChange={this.handleImageChange} />
                            </div>
                            <div className="form-space add-file-form">
                                <div>To change PDF file - please select new file to replace existing.</div>
                                <label htmlFor="image">PDF file</label>
                                <input type="file" name="patterndirections" id="image" onChange={this.handleFileChange} />
                            </div>
                            <hr></hr>
                            <button className="btn" type="submit" value="submit">Publish Pattern</button>
                        </form>
                    </div>
                </>
            );
        }
        else {
            return <div></div>
        }
    }
}


export default withFirebase(PatternEdit);