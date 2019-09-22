import React from 'react';
import AOS from 'aos';
import {db} from "../Constants/Firebase/Firestore";
import Log from '../Logging'
import Exhibitor from "./Exhibitor";
import {VERBOSE_LOG} from "../Constants/Constants";

class Exhibitors extends React.Component{
    constructor(props, context) { 
        super(props, context); 
        this.state = {exhibitors:""};
        AOS.init(); 
        
        this.handleAllClick = this.handleAllClick.bind(this);
        this.handleCategory1Click = this.handleCategory1Click.bind(this);
        this.handleCategory2Click = this.handleCategory2Click.bind(this);
        this.handleCategory3Click = this.handleCategory3Click.bind(this);
    }
    componentDidMount() {
        db.collection("Exhibitors")
            .get()
            .then(querySnapshot => {
                Log("---Firebase---",VERBOSE_LOG);
                var json_obj = querySnapshot.docs.map(doc => doc.data());
                var exhibitorList = json_obj.map((exhibitor, i) =>
                    <Exhibitor key={i}
                        category={exhibitor.category}
                        exhibitorName={exhibitor.exhibitorName}
                        exhibitorSrc={exhibitor.exhibitorSrc}
                        exhibitorDescription={exhibitor.exhibitorDescription}
                        recommendedBooks={exhibitor.recommendedBooks}
                        boothNumber={exhibitor.boothNumber}
                        website={exhibitor.website}
                    />
                );
                Log(exhibitorList,VERBOSE_LOG);
                Log("test",VERBOSE_LOG);

                this.json_obj = json_obj;
                this.setState({
                    exhibitors: exhibitorList
                });
            });
    }
    componentDidUpdate (){
        AOS.refresh();         
    }
    
    handleAllClick(){
        var exhibitorList = [];
        
        for(var i=0;i<this.json_obj.length;i++){
            let exhibitor = this.json_obj[i];
             // push the component to elements!
            exhibitorList.push(<Exhibitor key={i}
              category={exhibitor.category}
              exhibitorName={exhibitor.exhibitorName}
              exhibitorSrc={exhibitor.exhibitorSrc}
              exhibitorDescription={exhibitor.exhibitorDescription}
              recommendedBooks={exhibitor.recommendedBooks}
              boothNumber={exhibitor.boothNumber}
              website={exhibitor.website}
            />);
        }
        Log(exhibitorList);
                
        this.setState({
            exhibitors: exhibitorList
        })
    }
    
    handleCategory1Click(){
        var exhibitorList = [];
        
        for(var i=0;i<this.json_obj.length;i++){
            let exhibitor = this.json_obj[i];
            
            if(exhibitor.category.indexOf("1") !== -1){
                 // push the component to elements!
                 exhibitorList.push(<Exhibitor key={i}
                     category={exhibitor.category}
                     exhibitorName={exhibitor.exhibitorName}
                     exhibitorSrc={exhibitor.exhibitorSrc}
                     exhibitorDescription={exhibitor.exhibitorDescription}
                     recommendedBooks={exhibitor.recommendedBooks}
                     boothNumber={exhibitor.boothNumber}
                     website={exhibitor.website}
                 />);
            }
            
        }
       Log(exhibitorList,VERBOSE_LOG);
       Log("test",VERBOSE_LOG);
                
        this.setState({
            exhibitors: exhibitorList
        })
        
    }
    
    handleCategory2Click(){
        var exhibitorList = [];
        
        for(var i=0;i<this.json_obj.length;i++){
            let exhibitor = this.json_obj[i];
            
            if(exhibitor.category.indexOf("2") !== -1){
                 // push the component to elements!
                 exhibitorList.push(<Exhibitor key={i}
                     category={exhibitor.category}
                     exhibitorName={exhibitor.exhibitorName}
                     exhibitorSrc={exhibitor.exhibitorSrc}
                     exhibitorDescription={exhibitor.exhibitorDescription}
                     recommendedBooks={exhibitor.recommendedBooks}
                     boothNumber={exhibitor.boothNumber}
                     website={exhibitor.website}
                 />);
            }
            
        }
        Log(exhibitorList);
                
        this.setState({
            exhibitors: exhibitorList
        })
    }
    
    handleCategory3Click(){
        var exhibitorList = [];
        
        for(var i=0;i<this.json_obj.length;i++){
            let exhibitor = this.json_obj[i];
            
            if(exhibitor.category.indexOf("3") !== -1){
                 // push the component to elements!
                 exhibitorList.push(<Exhibitor key={i}
                     category={exhibitor.category}
                     exhibitorName={exhibitor.exhibitorName}
                     exhibitorSrc={exhibitor.exhibitorSrc}
                     exhibitorDescription={exhibitor.exhibitorDescription}
                     recommendedBooks={exhibitor.recommendedBooks}
                     boothNumber={exhibitor.boothNumber}
                     website={exhibitor.website}

                 />);
            }
            
        }
       Log(exhibitorList,VERBOSE_LOG);
                
        this.setState({
            exhibitors: exhibitorList
        })
    }
    
    render(){   
	    return (
            <section data-aos="fade-up" data-aos-duration="250" id="exhibitors" className="py-5">
              <div className="container">
                <h1 className="text-center mb-4">Exhibitors</h1>
                <div className="filtr-controls text-center lead text-uppercase mb-3">
                    <span onClick={this.handleAllClick} className="active d-inline-block mx-3 py-1 position-relative" data-filter="all">all </span>
                    <span onClick={this.handleCategory1Click} className="d-inline-block mx-3 py-1 position-relative" data-filter="1">category 1 </span>
                    <span onClick={this.handleCategory2Click} className="d-inline-block mx-3 py-1 position-relative" data-filter="2">category 2 </span>
                    <span onClick={this.handleCategory3Click} className="d-inline-block mx-3 py-1 position-relative" data-filter="3">category 3 </span>
                </div>
                <div className="row filtr-container">
                    {this.state.exhibitors}
                    
                </div>
              </div>		
             </section>
         ); 
     }
}


export default Exhibitors;