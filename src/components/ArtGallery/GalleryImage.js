/////////////////////////
//   React Components  //
/////////////////////////
import React from "react";

/////////////////////////////
//   3rd Party Components  //
/////////////////////////////
import Lightbox from "react-image-lightbox"; //Basic lightbox component https://www.npmjs.com/package/react-image-lightbox

///////////////////
//   Components  //
///////////////////
import ArtGallery from "./ArtGallery";

///////////////////
//   Classes     //
///////////////////
class GalleryImage extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            photoIndex: ArtGallery.images.indexOf("assets/img/"+this.props.src),
            isOpen: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
        this.setState(state => ({
            photoIndex: ArtGallery.images.indexOf("assets/img/"+this.props.src),
            isOpen: true
        }));
    }

    render() {
        const { photoIndex, isOpen } = this.state;

        return (
            <div className="col-sm-6 col-md-4 col-lg-3 item">
                <img style={{cursor:"pointer"}} onClick={this.handleClick} alt={this.props.alt} className="img-fluid" src={"assets/img/"+this.props.src} />
                {isOpen && (
                    <Lightbox
                        mainSrc={ArtGallery.images[photoIndex]}
                        nextSrc={ArtGallery.images[(photoIndex + 1) % ArtGallery.images.length]}
                        prevSrc={ArtGallery.images[(photoIndex + ArtGallery.images.length - 1) % ArtGallery.images.length]}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                        onMovePrevRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + ArtGallery.images.length - 1) % ArtGallery.images.length
                            })
                        }
                        onMoveNextRequest={() =>
                            this.setState({
                                photoIndex: (photoIndex + 1) % ArtGallery.images.length
                            })
                        }
                    />
                )}
            </div>
        );
    }
}

export default GalleryImage