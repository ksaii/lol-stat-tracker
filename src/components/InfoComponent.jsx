import PropTypes from "prop-types";
import '../styles/PlayerProfile.css';



const InfoComponent = ({
  width = "40px",
  height = "40px",
  image1 = null,
  image2 = null,
  icon1alt = "icon1",
    icon2alt = "icon2",
  text1 = "",
  text2 = "",
  text3 = "",
  text4 = "",

}) => {


  
  return (
    <div
      className="info-container"
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "15px",
      }}
    >
         <div className="scale-in-center" style={{
            display: "flex", 
            flexDirection: "row" ,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 1.0)',
            borderRadius: "5px",    
            padding: "5px", 
            margin: "5px",
            width: "100%",
            height: "100%",
            overflow: 'auto',
            textOverflow: 'ellipsis',
            

        }}>
        {image1 && (
          <img
            src={image1}
            alt={icon1alt}
            style=
            {{ 
              height: "60px",
               width: "60px",
               padding: '10px',
              borderRadius: "50%",}}
          />
        )}
            <div style={{
          display: "flex",
           flexDirection: "column",
            justifyContent: "center",
             alignItems: "center",
             padding: "10px",
             }}>
        {text1 && <p>{text1}</p>}
        {text2 && <p>{text2}</p>}
        </div>
      </div>

        <div className="scale-in-center" style={{
            display: "flex", 
            flexDirection: "row" ,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 1.0)',
            borderRadius: "5px",    
            padding: "5px", 
            margin: "5px",
            width: "100%",
            height: "100%",
            overflow: 'auto',
            
            
        }}>
        {image2 && <img 
        src={image2} 
        alt={icon2alt}
        style={{ height: "60px", width: "60px", padding: '10px',borderRadius: "50%" }}/>}
        <div style={{
          display: "flex",
           flexDirection: "column",
            justifyContent: "center",
             alignItems: "center",
             padding: "10px",
             }}>
      {text3 && <p>{text3}</p>}
      {text4 && <p>{text4}</p>}
      </div>
        </div>
      
    </div>
  );
};

InfoComponent.propTypes = {
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  image1: PropTypes.string,
  image2: PropTypes.string,
  text1: PropTypes.string,
  text2: PropTypes.string,
  text3: PropTypes.string,
  text4: PropTypes.string,
  delay1: PropTypes.string,
  delay2: PropTypes.string,
  icon1alt: PropTypes.string,
    icon2alt: PropTypes.string,
};

export default InfoComponent;
