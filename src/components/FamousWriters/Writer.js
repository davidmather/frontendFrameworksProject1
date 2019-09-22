import React from "react";

function Writer(props){
    return <div className="row" >
        <div className="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4">
            <img alt={props.alt} src={"assets/img/" + props.src} />
        </div>
        <div className="w-100 d-sm-block d-md-none d-lg-none d-xl-none"></div>
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h4 className="card-title"><strong>{props.writerName}</strong><br /></h4>
                    <h6 className="text-muted card-subtitle mb-2">{props.writerDescription}</h6>
                    <p className="card-text">{props.moreWriterInfo}</p>
                </div>
            </div>
        </div>
    </div>;
}

export default Writer