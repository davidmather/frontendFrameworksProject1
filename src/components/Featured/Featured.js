/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

/////////////////////////
//   Components        //
/////////////////////////
import {db} from "../Constants/Firebase/Firestore";
import FeaturedCard from "./FeaturedCard";
import Log from "../Logging"
import {VERBOSE_LOG} from "../Constants/Constants";

/////////////////////////
//   Classes           //
/////////////////////////
class Featured extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {featured: ""};

		db.collection("Featured")
			.get()
			.then(querySnapshot => {
				Log("---featured list Firebase start---", VERBOSE_LOG);
				const data = querySnapshot.docs.map(doc => doc.data());
				Log(data, VERBOSE_LOG);
				var featuredList = [];
				for (var i = 0; i < data.length; i++) {
					let card = data[i];
					featuredList.push(<FeaturedCard
						day={card.day}
						month={card.month}
						src={card.src}
						alt={card.alt}
						title={card.title}
						paragraph={card.paragraph}
						key={i}
					/>);
				}
				Log("---featured list Firebase end---", VERBOSE_LOG);
				this.setState({
					featured: featuredList
				})
			});
	}

	render() {
		return (
			<div id="featured" className="container fig_container bg-light">
				{this.state.featured}
			</div>
		);
	}
}


export default Featured;