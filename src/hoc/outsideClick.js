import React from 'react';


const outsideClick = (WC) => {

    return class EnhancedWC extends React.Component {

        constructor(props) {
            super(props);
            this.ref = React.createRef();
        }

        componentDidMount() {
            document.addEventListener('mousedown', this.handleClickOutside);
        }

        componentWillUnmount() {
            document.removeEventListener('mousedown', this.handleClickOutside);
        }

        handleClickOutside = (event) => {
            if (this.ref.current && !this.ref.current.contains(event.target)) {
                // this.props.toggleModal(this.props.modalName, false);
                this.props.handleClickOutside();
            }
        }

        render() {
            return (<WC {...this.props} ref={this.ref} />);
        }
    }

}

export default outsideClick;