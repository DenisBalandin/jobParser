import React, {Component} from 'react';
import {BrowserRouter as Router,Route, Link} from 'react-router-dom';
import { db } from "../firebase";

class Indeed extends Component{
    constructor(props){
        super(props);
        this.state = {
            data:[]
        }
    }
    componentWillMount(){
        this.getMessageList();
    }
    getMessageList = () =>{
        db.collection("Indeed")
        .get()
        .then(querySnapshot => {
            let fullArray = [];
            const data = querySnapshot.docs.map(doc => doc.data());
            // for(var int = 0; int < data.length; int++){
            //     fullArray[int] = {
            //         name: data[int].name,
            //         date:data[int].date,
            //         check:data[int].check,
            //         id: querySnapshot.docs[int].id,
            //     }
            // }
            this.setState({ data: data });
            // console.log(this.state.users);
        });
    }
    linkMove = (link, id) =>{
        //window.location.href = "https://www.indeed.com"+link;
        window.open("https://www.indeed.com"+link, "_blank");
        db.collection("Indeed")
        .doc(id)
        .update({
            active:0,
        });
        db.collection("Indeed")
        .get()
        .then(querySnapshot => {
            let fullArray = [];
            const data = querySnapshot.docs.map(doc => doc.data());
            this.setState({ data: data });
        });
    }
    render(){
        console.log(this.state.data);
        return(
            <div>
                <h1>Indeed NY</h1>
                <div id="linkBlock">
                    {this.state.data.filter(data => data.active !== 0).map((index)=>(
                        <div className="linkRow">
                            <div>{index.jobTitle}</div>
                            <div>{index.comName}</div>
                            <div className="linka" onClick={this.linkMove.bind(this, index.link, index.uniceCode)}>Link</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
export default Indeed;