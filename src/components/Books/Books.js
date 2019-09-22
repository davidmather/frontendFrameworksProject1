
/////////////////////////
//   React Components  //
/////////////////////////
import React from 'react';

/////////////////////////////
//   3rd Party Components  //
/////////////////////////////
import AOS from "aos";  //Animate on scroll library http://michalsnik.github.io/aos/

///////////////////
//   Components  //
///////////////////
import Log from "../Logging"
import BookRow from "./BookRow";
import Navbar from "../Navbar";
import { db } from "../Constants/Firebase/Firestore";

///////////////////
//   Classes     //
///////////////////
class Books extends React.Component{
	constructor(props, context) {
		super(props, context);
		this.state = {books:""};
		AOS.init();

		db.collection("Books")
			.get()
			.then(querySnapshot => {
				Log("---Firebase---");
				const data = querySnapshot.docs.map(doc => doc.data());
				Log(data);
				Navbar.books = data;
				var bookList = [];
				for(var i = 0; i < data.length; i=i+3){
					let book = data[i];
					let book2 = data[i+1];
					let book3 = data[i+2];
					bookList.push(<BookRow
						book1Title={book.bookTitle}
					    book1FrontCover={book.frontCover}
					    book2Title={book2.bookTitle}
					    book2FrontCover={book2.frontCover}
					    book3Title={book3.bookTitle}
					    book3FrontCover={book3.frontCover}
						key={i}
					/>);
				}

				Log("---no Firebase---");
				this.setState({
					books: bookList
				})
			});

	}

	componentDidUpdate (){
		AOS.refresh();
	}

	render(){
		return (
			<div data-aos="fade-up" data-aos-duration="250" id="books" className="books">
				<div className="container">
					{this.state.books}
				</div>
			</div>
		);
	}
}

export default Books;