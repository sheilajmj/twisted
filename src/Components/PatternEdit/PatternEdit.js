import React, { Component } from 'react';
import Context from '../../Context';

class PatternEdit extends Component {
    static contextType = Context;


    render() {

        return (
            <>
                <h2>Edit Pattern</h2>
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
            </>
        );
    }
}


export default PatternEdit;