import React from "react";

class SectionDivider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fill1:this.props.fill1,
            fill2:this.props.fill2,
            fill3:this.props.fill3,
            fill4:this.props.fill4
        }
    }

    render() {
        return (<svg className="editorial"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink"
                     viewBox="0 24 150 28 "
                     preserveAspectRatio="none">
            <defs>
                <path id="gentle-wave"
                      d="M-160 44c30 0
                            58-18 88-18s
                            58 18 88 18
                            58-18 88-18
                            58 18 88 18
                            v44h-352z"/>
            </defs>
            <g className="parallax1">
                <use xlinkHref="#gentle-wave" x="50" y="3" fill={this.state.fill1} />
            </g>
            <g className="parallax2">
                <use xlinkHref="#gentle-wave" x="50" y="0" fill={this.state.fill2} />
            </g>
            <g className="parallax3">
                <use xlinkHref="#gentle-wave" x="50" y="9" fill={this.state.fill3} />
            </g>
            <g className="parallax4">
                <use xlinkHref="#gentle-wave" x="50" y="6" fill={this.state.fill4} />
            </g>
        </svg>)
    }
}

export default SectionDivider