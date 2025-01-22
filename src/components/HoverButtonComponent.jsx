import {useState} from 'react';
import PropTypes from 'prop-types';

const HoverButtonComponent = ({
     width = "20px",
     height = "20px",
     onClick = {onClick},
     text = "Button",
     icon: Icon = null
    }) => {

    const [isHovered, setIsHovered] = useState(false);


    const styles = {
        container: {
            backgroundColor: isHovered ? 'grey' : '#242424',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            padding: '10px' ,
            border: '5px solid white' ,
            borderRadius: '1000px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,


        },

    };

    return (

        <div
        
        style={styles.container}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        >
            <Icon/>
            {text}
        </div>
    )

}



HoverButtonComponent.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    icon: PropTypes.elementType, // Ensures the `icon` prop is a valid React component
    width: PropTypes.string, // Accepts a string like '20px'
    height: PropTypes.string, // Accepts a string like '20px'
  };







export default HoverButtonComponent;