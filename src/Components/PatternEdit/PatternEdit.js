import React, { Component } from 'react';
import Context from '../../Context';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import { withFirebase } from '../Firebase';
import PageNav from '../Navigation/PageNav';

class PatternEdit extends Component {
    static contextType = Context;
    constructor(props) {
        super(props);
        this.state = {
            newPattern: {},
            errors: {}
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

    handleImageChange = (event) => {
        let formIsValid = true;
        if (event.target.files[0]) {
            if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") {
                let errors = this.state.errors;
                errors["image_file"] = "Image file must be a png or jpg only";
                this.setState({ errors: errors });
                return formIsValid = false;
            }
            if (formIsValid) {
                const { newPattern } = this.state;
                newPattern["image_file"] = event.target.files[0];
                newPattern["image_file_name"] = event.target.files[0].name;
                this.setState({ newPattern });
                return formIsValid;
            }
        }
    }

    handleFileChange = (event) => {
        let formIsValid = true;
        if (event.target.files[0]) {
            if (event.target.files[0].type !== "application/pdf") {
                let errors = this.state.errors
                errors["file"] = "File must be a PDF only";
                this.setState({ errors: errors })
               return formIsValid = false;
            }

            if(formIsValid) {
                const { newPattern } = this.state;
                newPattern["pdf_file"] = event.target.files[0]
                newPattern["pdf_file_name"] = event.target.files[0].name
                this.setState({ newPattern })
                return formIsValid;
            }
        }
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
                            this.setState({ newPattern })
                        })
                })
                .then(() => {
                    this.checkUploadImage();
                });
        }
        else {
            this.checkUploadImage();
        }
    }

    handleSetThumbnail = () => {
        if (this.state.newPattern.image_file_URL) {
            let fileName = this.state.newPattern.image_file_name.slice(0, -4)
            let fileExt = this.state.newPattern.image_file_name.slice(-4)
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
                    this.createPattern();
                });
        }
        else {
            this.createPattern();
        }
    }


    checkUploadImage = () => {
        if (this.state.newPattern.image_file) {
            this.handleUploadImage()
        }
        else {
            this.createPattern();
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
                .then(() => {
                    this.props.history.push(`/account/${contributor_user_id}/contributed`)
                })
                .catch(function (error) {
                    console.error("Error writing document: ", error);
                });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            this.checkUploadPdf();
        }
        else {
            console.log(this.state.errors);
        }
    }

    componentDidMount = () => {
        this.getPatternData();
    }

    //Form validation - triggered after submitting
    handleValidation = () => {
        let fields = this.state.newPattern
        let errors = {};
        let formIsValid = true;

        this.startTimeout = () => {
            setTimeout(() => { this.setState({ errors: {} }) }, 5000);
        }

        //pattern name
        if (typeof fields["pattern_name"] !== "undefined" && fields["pattern_name"] !== null) {
            if (!fields["pattern_name"].match(/^[a-zA-Z0-9,.!? ]*$/)) {
                formIsValid = false;
                errors["pattern_name"] = "Please do not use special characters.";
                this.startTimeout();
              }
        }

        //author name
        if (typeof fields["author_name"] !== "undefined" && fields["author_name"] !== null) {
            if (!fields["author_name"].match(/^[a-zA-Z0-9,.!? ]*$/)) {
                formIsValid = false;
                errors["author_name"] = "Please do not use special characters.";
                this.startTimeout();
            }
        }

        // description
        if (typeof fields["description"] !== "undefined" && fields["description"] !== null) {
            if (!fields["description"].match(/^[a-zA-Z0-9,.!? ]*$/)) {
                formIsValid = false;
                errors["description"] = "Please do not include special characters.";
                this.startTimeout();
            }
        }

        //craft
        if (typeof fields["craft"] !== "undefined" && fields["craft"] !== null) {
            if (!fields["craft"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["craft"] = "Please use letters only.";
                this.startTimeout();
            }
        }

        //yarn weight
        if (typeof fields["yarn-weight"] !== "undefined" && fields["yarn-weight"] !== null) {
            if (!fields["yarn-weight"].match(/^[a-zA-Z ]+$/)) {
                formIsValid = false;
                errors["yarn_weight"] = "Please use letters only.";
            }
        }

        //needle size
        if (typeof fields["needle-size"] !== "undefined" && fields["needle-size"] !== null) {
            if (!fields["needle-size"].match(/^[a-zA-Z0-9,.!? ]*$/)) {
                formIsValid = false;
                errors["needle_size"] = "Please do not use special characters.";
                this.startTimeout();
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }



    render() {
        let pattern = this.state.defaultPattern
        if (this.state.defaultPattern) {
            return (
                <>
                    <AccountNavigationMain userId={this.props.match.params.userId} />
                    <section className="container add-wrap">
                        <h2>Edit Pattern</h2>
                        <PageNav />
                        <div className="add-flex-container bkg-color-wt">
                            <form noValidate onSubmit={this.handleSubmit}>
                                <div className="form-space">
                                    <label htmlFor="pattern_name" className="pattern-add">Pattern Name (required):</label>
                                    <input type="text" name="pattern_name" id="pattern_name" onChange={this.handleChange} placeholder='Pattern Name' defaultValue={pattern.pattern_name} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.pattern_name}</div>
                                <div className="form-space">
                                    <label htmlFor="author_name" className="author-add">Author Name (required):</label>
                                    <input className="form-input" type="text" name="author_name" id="author_name" onChange={this.handleChange} placeholder='Author Name' defaultValue={pattern.author_name} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.author_name}</div>
                                <div className="form-space">
                                    <label htmlFor="description" className="pattern-add">Description:</label>
                                    <br /><textarea type="text" className="description-textarea w-99" name="description" id="description" onChange={this.handleChange} placeholder='Description' defaultValue={pattern.description} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.description}</div>
                                <div className="form-space">
                                    <label htmlFor="craft" className="pattern-add">Craft (required):</label>
                                    <input type="text" name="craft" id="craft" onChange={this.handleChange} placeholder='Craft' defaultValue={pattern.craft} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.craft}</div>
                                <div className="form-space">
                                    <label htmlFor="yarn-weight" className="pattern-add">Yarn Weight (required):</label>
                                    <input type="text" name="yarn-weight" id="yarn-weight" onChange={this.handleChange} placeholder="Yarn Weight" defaultValue={pattern.yarn_weight} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.yarn_weight}</div>
                                <div className="form-space">
                                    <label htmlFor="needle-size">Needle Size (required):</label>
                                    <input type="text" name="needle-size" id="needle-size" onChange={this.handleChange} placeholder="Needle Size" defaultValue={pattern.needle_size} required />
                                </div>
                                <div className="errorMsg">{this.state.errors.needle_size}</div>
                                <hr></hr>
                                <div className="form-space add-img-form">
                                    <div>To change image file - please select new image to replace existing.</div>
                                    <label htmlFor="image_file" className="pattern-add">Image:</label>
                                    <input type="file" name="image_file" id="image_file" onChange={this.handleImageChange} />
                                    <div className="errorMsg">{this.state.errors.image_file}</div>
                                </div>
                                <div className="form-space add-file-form">
                                    <div>To change PDF file - please select new file to replace existing.</div>
                                    <label htmlFor="file">PDF file</label>
                                    <input type="file" name="patterndirections" id="file" onChange={this.handleFileChange} />
                                    <div className="errorMsg">{this.state.errors.file}</div>
                                </div>
                                <hr></hr>
                                <button className="btn" type="submit" value="submit">Update Pattern</button>
                            </form>
                        </div>
                    </section>
                </>
            );
        }
        else {
            return <div></div>
        }
    }
}


export default withFirebase(PatternEdit);