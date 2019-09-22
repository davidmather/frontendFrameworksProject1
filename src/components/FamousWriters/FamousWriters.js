import React from 'react';
import AOS from 'aos';
import {db} from "../Constants/Firebase/Firestore";
import Writer from "./Writer";
import Log from "../Logging"
import {VERBOSE_LOG} from "../Constants/Constants";

class FamousWriters extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {writers: ""};
        AOS.init();

        db.collection("FamousWriter")
            .get()
            .then(querySnapshot => {
                Log("---featured list Firebase start---",VERBOSE_LOG);
                const data = querySnapshot.docs.map(doc => doc.data());
                Log(data,VERBOSE_LOG);
                var writerList = [];
                for (var i = 0; i < data.length; i++) {
                    let famousWriter = data[i];
                    writerList.push(<Writer
                        src={famousWriter.src}
                        writerName={famousWriter.writerName}
                        writerDescription={famousWriter.writerDescription}
                        moreWriterInfo={famousWriter.moreWriterInfo}
                        key={i}
                    />);
                }
                Log("---featured list Firebase end---",VERBOSE_LOG);
                this.setState({
                    writers: writerList
                })
            });

    }

    componentDidUpdate (){
        AOS.refresh();
    }

    render() {
        return (
            <div data-aos="fade-up" data-aos-duration="250" id="famous-writers">
                <div className="container">
                    {this.state.writers}
                </div>
            </div>
        );
    }
}

export default FamousWriters;