import React, { Component} from 'react';

class Comment extends Component {

    constructor(props){
        super(props);
        this.state = {
            commentPattern: "patternId", //pattern id,
            commentAuthorName: "Name1", //user id 
            commentText: "sample comment here", //the comment created by the user
        }
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        console.log(event.value);
    }


    render(){
    return (
        <>
        <div className="comment-form">
        <form onSubmit={() => this.handleSubmit()}>
        <label for="comment">New Comment:</label>
        <textarea rows="4" cols="50" id="comment" name="comment"/>
        <button type="submit">Post Comment</button>
        </form>
        </div>
      <div className="comment">

        {this.state.commentText}
        {this.state.commentAuthor}     
     </div>
     </>
    )
  }
}
export default Comment;