import React, {Component} from 'react';


class Spinner extends Component {
    state = {
        loading: false
    }

    fetchData = () => {
        this.setState({ loading : true });
    }

    render(){
        const loading = this.state;

    return(
        <div className="loader center">
                             <button className="spinner btn" type="submit" value="submit" onClick={this.fetchData}>
                             {loading === true ? <div><div className='spin'>h</div><div className='spin'>i</div><div className='spin'>j</div>Loading please wait ...</div> : <div></div>}
                                </button>
            </div>
    );
}
}

export default Spinner;

