
/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

/////////////////////////////
//   3rd Party Components  //
/////////////////////////////
//Animate on scroll library http://michalsnik.github.io/aos/
import AOS from "aos";

/////////////////////////////
//   3rd Party Styles      //
/////////////////////////////
import "react-image-lightbox/style.css"; //Basic lightbox component https://www.npmjs.com/package/react-image-lightbox

///////////////////
//   Components  //
///////////////////
import {db} from "../Constants/Firebase/Firestore"; //Google Firestore connection information
import GalleryImage from "./GalleryImage";
import Log from "../Logging"
import {DEBUG_LOG, IMAGES_DIRECTORY, VERBOSE_LOG} from "../Constants/Constants";

///////////////////
//   Classes     //
///////////////////
class ArtGallery extends React.Component{
    static images = [];
    constructor(props, context) {
        super(props, context);
        this.state = {gallery:""};
        AOS.init();

        db.collection("Gallery")
            .get()
            .then(querySnapshot => {
                Log("---Firebase---", VERBOSE_LOG);
                const data = querySnapshot.docs.map(doc => doc.data());
                Log(data, DEBUG_LOG);
                var galleryList = [];
                for(var i = 0; i < data.length; i++){
                    let galleryImage = data[i];
                    let imageSrc = IMAGES_DIRECTORY+galleryImage.src;
                    ArtGallery.images.push(imageSrc);
                    this.preload(imageSrc);
                    galleryList.push(<GalleryImage src={galleryImage.src} alt={galleryImage.alt}
                        key={i}
                    />);
                }
                Log("---no Firebase---",VERBOSE_LOG);
                this.setState({
                    gallery: galleryList
                })
            });

    }

    preload(imageSrc) {
        //preload images prior to displaying them on the webpage
        const img = new Image();
        img.src = imageSrc;
    }
  componentDidUpdate (){
    AOS.refresh(); 
  } 
    
  render() {
      return (
          <div id="artgallery" className="photo-gallery">
		<div className="container">
			<div className="intro">
				<h2 className="text-center">Gallery</h2>
				<p className="text-center">A small selection of art available at the event.</p>
			</div>
			<div className="row photos">
                {this.state.gallery}
			</div>
		</div>
	</div>
   );
  }
}

export default ArtGallery;