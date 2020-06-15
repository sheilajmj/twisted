import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import PageNav from '../Navigation/PageNav';


const INITIAL_STATE = {
  newPattern: {
    author_name: '',
    pattern_name: '',
    description: '',
    craft: '',
    yarn_weight: '',
    needle_size: '',
  },
  errors: {},
  loading: false
}

class AddPattern extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      newPattern: {
        author_name: '',
        pattern_name: '',
        description: '',
        craft: '',
        yarn_weight: '',
        needle_size: '',
      },
      errors: {},
      loading: false,
      attempt: 0,
    }
  }

  setContributorUserId = () => {
    this.setState({ contributor_user_id: this.props.match.params.userId }, () => this.setContributorName());
  }

  setContributorName = () => {
    this.props.firebase.db.ref(`/users/${this.props.match.params.userId}/username`).once("value", (snapshot) => {
      let name = snapshot.val();
      this.setState({ contributor_name: name }, () => this.checkUploadPdf());
    })
  }

  handleChange = (event) => {
    const key = (event.target.name);
    const value = (event.target.value);
    const { newPattern } = this.state;
    newPattern[key] = value;
    this.setState({ newPattern });
  }

  //this validates the image to upload, insuring it is an image, and then sets state if valid with the image file and file name.
  handleImageChange = (event) => {
    let formIsValid = true;
    if (event.target.files[0]) {
      if (event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png") {
        let errors = this.state.errors;
        errors["image_file"] = "Image file must be a png or jpg only";
        this.setState({ errors: errors });
        return formIsValid = false;
      }
     if (formIsValid){
        this.setState({ image_file: event.target.files[0] });
        this.setState({ image_file_name: event.target.files[0].name });
        return formIsValid; 
      }
    }
  }

  //this validates the file to upload, insuring it is a PDF, and then sets state if valid with the file and file name.
  handleFileChange = (event) => {
    let formIsValid = true;
    if (event.target.files[0]) {
      if (event.target.files[0].type !== "application/pdf") {
        let errors = this.state.errors;
        errors["pdf_file"] = "File must be a PDF only";
        this.setState({ errors: errors });
        return formIsValid = false;
      }
      if(formIsValid){
        this.setState({ pdf_file: event.target.files[0] });
        this.setState({ pdf_file_name: event.target.files[0].name });
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

  //this uploads the PDF file to the database and gets the URL for the uploaded PDF and sets that in state to be included in the new pattern.
  handleUploadPdf = () => {
    if (this.state.pdf_file) {
      let metadata = {
        contributor_user_id: this.state.contributor_user_id,
        pattern_name: this.state.pattern_name
      };
      const uploadTask = this.props.firebase.storage.ref().child('pattern-directions/' + this.state.pdf_file_name).put(this.state.pdf_file, metadata);
      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error)
        },

        () => {
          this.props.firebase.storage.ref('/pattern-directions/')
            .child(this.state.pdf_file_name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              this.setState({ pdf_file_URL: fireBaseUrl })
            })
            .then(() => {
              this.checkUploadImage();
            });
        }
      );
    };

  }

  //this gets the thumbnail file name and URL and sets the values in state to be included in the new pattern.
  handleSetThumbnail = () => {
    let fileName = this.state.image_file_name.slice(0, -4);
    let fileExt = this.state.image_file_name.slice(-4);
    if (this.state.image_file_URL) {
      this.props.firebase.storage.ref('/images/thumbnails')
        .child(fileName + '_200x200' + fileExt)
        .getDownloadURL()
        .then(fireBaseUrl => {
          this.setState({ thumbnail_image_file_URL: fireBaseUrl });
          this.setState({ thumbnail_image_file_name: fileName + '_200x200' + fileExt });
          return fireBaseUrl
        })
        .then(() => {
          this.createNewPattern();
        });
    }
    else {
      this.createNewPattern();
    }
  }

  checkUploadImage = () => {
    if (this.state.image_file) {
      this.handleUploadImage();
    }
    else {
      this.createNewPattern();
    }
  }

    //this uploads the image file to the database and gets the URL for the uploaded image and sets that in state to be included in the new pattern.
  handleUploadImage = () => {
    if (this.state.image_file) {
      let metadata = {
        contributor_user_id: this.state.contributor_user_id,
        pattern_name: this.state.pattern_name
      }
      const uploadTask = this.props.firebase.storage.ref().child('images/' + this.state.image_file_name).put(this.state.image_file, metadata);

      uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
          console.log(error)
        },

        () => {
          // gets the functions from storage, refences the image storage in firebase by the children
          // gets the download url then sets the image from firebase as the value for the imgUrl key:
          this.props.firebase.storage.ref('/images/')
            .child(this.state.image_file_name)
            .getDownloadURL()
            .then(fireBaseUrl => {
              this.setState({ image_file_URL: fireBaseUrl });
              this.startTimeout = () => {
                setTimeout(() => {this.handleSetThumbnail();}, 5000);
              }
              this.startTimeout();
            });
        }
      );
    };
  }

//creates the new pattern and sends it to database
  createNewPattern = () => {
    if (this.state.thumbnail_image_file_URL) {
      let { author_name, pattern_name, description, craft, yarn_weight, needle_size } = this.state.newPattern;
      let { image_file_URL, image_file_name, pdf_file_name, pdf_file_URL, contributor_user_id, contributor_name, thumbnail_image_file_URL, thumbnail_image_file_name } = this.state;
      let newPattern = {
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
      };

    //this gets the newly created pattern key and sets it as the pattern_id in the database
      this.props.firebase.patterns().push(newPattern)
        .then((response) => {
          let pattern_id = response.key;
          this.props.firebase.db.ref(`/patterns/${pattern_id}`).update({ pattern_id: pattern_id })
          
          //this adds the pattern_id to the contributing user's 'contributed' patterns object in the database
          this.props.firebase.db.ref(`/users/${contributor_user_id}/contributed/`).update({ [`${pattern_id}`]: true })
          return response
        })
        .then(() => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push('/account/' + contributor_user_id + '/contributed')
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });

    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      this.setContributorUserId();
      this.setState({ loading : true });
      // this.startTimeout = () => {
      //   setTimeout(() => {if(this.state.attempt === 0){
      //     this.setContributorUserId(); this.setState({attempt: 1})
      //   } 
      //   }, 5000);
      // }
      // this.startTimeout();
    }
    else {
      console.log(this.state.errors);
    }
  }

  //Form validation - triggered after submitting
  handleValidation = () => {
    let fields = this.state.newPattern;
    let errors = {};
    let formIsValid = true;

    this.startTimeout = () => {
      setTimeout(() => { this.setState({ errors: {} }) }, 5000);
    }

    //pattern name
  if (!fields["pattern_name"]) {
      formIsValid = false;
      errors["pattern_name"] = "Cannot be empty - please do not use special characters";
      this.startTimeout(); 
    }
    if (typeof fields["pattern_name"] !== "undefined" && fields["pattern_name"] !== null) {
      if (!fields["pattern_name"].match(/^[-a-zA-Z0-9,'".!? ]*$/)) {
        formIsValid = false;
        errors["pattern_name"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //author name
      if (!fields["author_name"]) {
      formIsValid = false;
      errors["author_name"] = "Cannot be empty - please do not use special characters";
      this.startTimeout(); 
    }

    if (typeof fields["author_name"] !== "undefined" && fields["author_name"] !== null) {
      if (!fields["author_name"].match(/^[-a-zA-Z0-9,'".!? ]*$/)) {
        formIsValid = false;
        errors["author_name"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    // description
    if (typeof fields["description"] !== "undefined" && fields["description"] !== null) {
      if (!fields["description"].match(/^[-a-zA-Z0-9,'."!? ]*$/)) {
        formIsValid = false;
        errors["description"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //craft
    if (!fields["craft"]) {
      formIsValid = false;
      errors["craft"] = "Cannot be empty - please use letters only";
      this.startTimeout(); 
    }

    if (typeof fields["craft"] !== "undefined" && fields["craft"] !== null) {
      if (!fields["craft"].match(/^[-a-zA-Z0-9,'."!? ]*$/)) {
        formIsValid = false;
        errors["craft"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }

    //yarn weight
    if (typeof fields["yarn_weight"] !== "undefined" && fields["yarn_weight"] !== null) {
      if (!fields["yarn_weight"].match(/^[-a-zA-Z0-9,'."!? ]*$/)) {
        formIsValid = false;
        errors["yarn_weight"] = "Please do not use special characters.";
      }
    }

    //needle size
    if (typeof fields["needle_size"] !== "undefined" && fields["needle_size"] !== null) {
      if (!fields["needle_size"].match(/^[-a-zA-Z0-9,'."!? ]*$/)) {
        formIsValid = false;
        errors["needle_size"] = "Please do not use special characters.";
        this.startTimeout();
      }
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  render() {
    return (
      <>
        <AccountNavigationMain userId={this.props.match.params.userId} />
        <section className="container add-pattern">
          <div className="add-wrap">
            <PageNav userId={this.props.match.params.userId} pageHeader={"Add New Pattern"} />
            <div className="add-flex-container bkg-color-wt">
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-space">
                  <label htmlFor="pattern_name" className="pattern-add">Pattern Name:  </label>
                  <input className="form-input" type="text" name="pattern_name" id="pattern_name" onChange={this.handleChange} placeholder='Pattern Name' required />
                </div>
                <div className="errorMsg">{this.state.errors.pattern_name}</div>
                <div className="form-space">
                  <label htmlFor="author_name" className="author-add">Author Name:  </label>
                  <input className="form-input" type="text" name="author_name" id="author_name" onChange={this.handleChange} placeholder='Author Name' required />
                </div>
                <div className="errorMsg">{this.state.errors.author_name}</div>
                <div className="form-space">
                  <label htmlFor="description" className="pattern-add">Description  </label>
                  <br /><textarea className="form-input description-textarea w-99" type="text" name="description" id="description" onChange={this.handleChange} placeholder='Description' required />
                </div>
                <div className="errorMsg">{this.state.errors.description}</div>
                <div className="form-space">
                  <label htmlFor="craft" className="pattern-add">Craft  </label>
                  <input className="form-input" type="text" name="craft" id="craft" onChange={this.handleChange} placeholder='Craft' required />
                </div>
                <div className="errorMsg">{this.state.errors.craft}</div>
                <div className="form-space">
                  <label htmlFor="yarn_weight" className="pattern-add">Yarn Weight  </label>
                  <input className="form-input" type="text" name="yarn_weight" id="yarn_weight" onChange={this.handleChange} placeholder="Yarn Weight" required />
                </div>
                <div className="errorMsg">{this.state.errors.yarn_weight}</div>
                <div className="form-space">
                  <label htmlFor="needle_size">Needle Size  </label>
                  <input className="form-input" type="text" name="needle_size" id="needle_size" onChange={this.handleChange} placeholder="Needle Size" required />
                </div>
                <div className="errorMsg">{this.state.errors.needle_size}</div>
                <div className="form-space add-img-form">
                  <label htmlFor="image_file" className="pattern-add">Image:  </label>
                  <input className="form-input" type="file" name="image_file" id="image_file" onChange={this.handleImageChange} />
                </div>
                <div className="errorMsg">{this.state.errors.image_file}</div>
                <div className="form-space add-file-form">
                  <label htmlFor="pdf_file">PDF file  </label>
                  <input className="form-input" type="file" name="pdf_file" id="pdf_file" onChange={this.handleFileChange} />
                </div>
                <div className="errorMsg">{this.state.errors.pdf_file}</div>
            
                <div className="btn-wrap">
                  {this.state.loading === true ? <div><div className='spin1'> </div><div className='spin2'> </div><div className='spin3'> </div><div className="loading"> Loading please wait ...</div></div> :  <button className="btn" type="submit" value="submit">Publish Pattern</button>}
                </div>
              </form>
            </div>
          </div>
        </section>
      </>
    );
  }
}


export default withFirebase((withRouter)(AddPattern));