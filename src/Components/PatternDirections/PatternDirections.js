import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { withFirebase } from '../Firebase';
import SignIn from '../Signin'; 
import DemoPDF from '../../sample-files/DemoPDF.pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


class PatternDirections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            numPages: null,
            pageNumber: 1,
        }
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }

    togglePanel = (e) => {
        this.setState({ open: !this.state.open })
    }

    componentDidMount(){
        this.listener = this.props.firebase.auth.onAuthStateChanged(
            authUser => {
                authUser ?  this.setState({authUser}): this.setState({authUser:null});
            },
        );
    }

    componentWillUnmount(){
        this.listener();
    }

    render() {
        const { pageNumber, numPages } = this.state;

        return (
            <div className="coll-div">
                <div className="collapsible-header" onClick={((e) => { this.togglePanel(e) })}>Pattern Instructions</div>                
                {this.state.open && this.state.authUser ? (
                    <>
                        <div>embeded PDF here -- only for those who are signed in</div>
                        <a href="https://twistedknit.s3-us-west-1.amazonaws.com/DemoPDF.pdf" target="_blank" rel="noopener noreferrer">Open, Print, or Download File</a>
                        <div>
                            <Document
                                file={DemoPDF}
                                onLoadSuccess={this.onDocumentLoadSuccess}
                            >
                                <Page pageNumber={pageNumber} />
                            </Document>
                            <p className="pdf-pg">Page {pageNumber} of {numPages}</p>
                        </div>
                    </>) : this.state.open && !this.state.authUser ? 
                    <>
                    <div>
                    You must be logged in to view the pattern directions.
                    Please sign in!
                    <SignIn />
                    </div>
                    </>
                    : null}
            </div>
        );
    }

}

export default withFirebase(PatternDirections);