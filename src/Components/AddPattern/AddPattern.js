import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Context from '../../Context';
import { withFirebase } from '../Firebase';
import AccountNavigationMain from '../AccountNavigationMain/AccountNavigationMain';
import AccountContributedNav from '../AccountContributedNav/AccountContributedNav';



const INITIAL_STATE = {
  newPattern: {
    author_name: '',
    pattern_name: '',
    description: '',
    craft: '',
    yarn_weight: '',
    needle_size: '',
  }
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
      }
    }
  }

  setContributorUserId = () => {
    this.setState({contributor_user_id: this.props.match.params.userId}, () => this.setContributorName())
  }

  setContributorName = () => {
    this.props.firebase.db.ref(`/users/${this.state.contributor_user_id}/username`).once("value", (snapshot) => {
      let name = snapshot.val()
      this.setState({contributor_name: name})
    })
  }
  
  handleChange = (event) => {
    const key = (event.target.name);
    const value = (event.target.value);
    const { newPattern } = this.state;
    newPattern[key] = value;
    this.setState({ newPattern });
  }

  handleImageChange = (event) => {
    this.setState({ image_file: event.target.files[0] });
    this.setState({ image_file_name: event.target.files[0].name });
  }

  handleFileChange = (event) => {
    this.setState({ pdf_file: event.target.files[0] })
    this.setState({ pdf_file_name: event.target.files[0].name })
  }

  checkUploadPdf = () => {
    if (this.state.pdf_file){
      this.handleUploadPdf();
    };
  }

  handleUploadPdf = () => {
    if (this.state.pdf_file) {
      let metadata = {
        contributor_user_id: this.state.contributor_user_id,
        pattern_name: this.state.pattern_name
      }
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

  handleSetThumbnail = () => {

    let fileName = this.state.image_file_name.slice(0, -4) 
    let fileExt = this.state.image_file_name.slice(-4) 


    if (this.state.image_file_URL){
    
    this.props.firebase.storage.ref('/images/thumbnails')
        .child(fileName + '_200x200' + fileExt)
        .getDownloadURL()
        .then(fireBaseUrl => {
          this.setState({thumbnail_image_file_URL: fireBaseUrl})
          this.setState({thumbnail_image_file_name: fileName+ '_200x200' + fileExt})
        })
        .then(() => {
      this.createNewPattern()
    });
  }
}


  checkUploadImage = () => {
    if (this.state.image_file) {
      this.handleUploadImage()
    }
  }

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
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
            this.props.firebase.storage.ref('/images/')
              .child(this.state.image_file_name)
              .getDownloadURL()
              .then(fireBaseUrl => {
                this.setState({ image_file_URL: fireBaseUrl })
                this.handleSetThumbnail()
              });
          }
        );
      };
    }


    createNewPattern = () => {
      if (this.state.thumbnail_image_file_URL) {
        let { author_name, pattern_name, description, craft, yarn_weight, needle_size } = this.state.newPattern;
        let { image_file_URL, image_file_name, pdf_file_name, pdf_file_URL, contributor_user_id, contributor_name, thumbnail_image_file_URL, thumbnail_image_file_name } = this.state
        
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
        }

        this.props.firebase.patterns().push(newPattern)
        
        .then((response)=> {
          let pattern_id = response.key
          this.props.firebase.db.ref(`/patterns/${pattern_id}`).update({pattern_id: pattern_id})
          this.props.firebase.db.ref(`/users/${contributor_user_id}/contributed/`).update({[`${this.props.pattern_id}`]: null})
            return (response)  
        })
          .then(() => {
            this.setState({...INITIAL_STATE})
            this.props.history.push('/account/' + this.props.match.userId + '/contributions')
          })                      
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });

      }
    }



    handleSubmit = (e) => {
      e.preventDefault();
      this.checkUploadPdf(e);
      this.setContributorUserId();
    }


    render(){

  
      return (
        <>
        <AccountNavigationMain />
        <AccountContributedNav />
        <div className="bkg-color-l">
          <h2>Add New Pattern</h2>
          <div className="add-flex-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-space">
              <label htmlFor="pattern_name" className="pattern-add">Pattern Name:  </label>
              <input className="form-input" type="text" name="pattern_name" id="pattern_name" onChange={this.handleChange} placeholder='Pattern Name' required />
            </div>
            <div className="form-space">
              <label htmlFor="author_name" className="author-add">Author Name:  </label>
              <input className="form-input" type="text" name="author_name" id="author_name" onChange={this.handleChange} placeholder='Author Name' required />
            </div>
            <div className="form-space">
              <label htmlFor="description" className="pattern-add">Description  </label>
              <br /><textarea cols="50" className="form-input" type="text" className="description-textarea" name="description" id="description" onChange={this.handleChange} placeholder='Description' required />
            </div>
            <div className="form-space">
              <label htmlFor="craft" className="pattern-add">Craft  </label>
              <input className="form-input" type="text" name="craft" id="craft" onChange={this.handleChange} placeholder='Craft' required />
            </div>
            <div className="form-space">
              <label htmlFor="yarn_weight" className="pattern-add">Yarn Weight  </label>
              <input className="form-input" type="text" name="yarn_weight" id="yarn_weight" onChange={this.handleChange} placeholder="Yarn Weight" required />
            </div>
            <div className="form-space">
              <label htmlFor="needle_size">Needle Size  </label>
              <input className="form-input" type="text" name="needle_size" id="needle_size" onChange={this.handleChange} placeholder="Needle Size" required />
            </div>
            <div className="form-space add-img-form">
              <label htmlFor="image_file" className="pattern-add">Image:  </label>
              <input className="form-input" type="file" name="image_file" id="image_file" onChange={this.handleImageChange} />
            </div>
            <div className="form-space add-file-form">
              <label htmlFor="pdf_file">PDF file  </label>
              <input className="form-input" type="file" name="pdf_file" id="pdf_file" onChange={this.handleFileChange} />
            </div>
            <div className="btn-wrap">
            <button className="btn" type="submit" value="submit">Publish Pattern</button>
            </div>
          </form>
          </div>
          </div>
        </>

      );
    }
  }
  export default withFirebase((withRouter)(AddPattern));