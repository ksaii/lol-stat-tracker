import PropTypes from "prop-types";

const InfoComponent = ({
  width = "40px",
  height = "40px",
  image1 = null,
  image2 = null,
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
      }}
    >
      <div style={{ 
        display: "flex", 
        flexDirection: "row" ,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "grey",
        borderRadius: "5px",    
        padding: "5px", 
        margin: "5px",
        width: "100%",  
        }}>
        {image1 && (
          <img
            src={image1}
            alt="Icon1"
            style={{ height: "60px", width: "60px" }}
          />
        )}
        {text1 && <p>{text1}</p>}
        {text2 && <p>{text2}</p>}
      </div>

        <div style={{
            display: "flex", 
            flexDirection: "row" ,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: 'rgba(0, 0, 0, 1.0)',
            borderRadius: "5px",    
            padding: "5px", 
            margin: "5px",
            width: "100%",
        }}>
        {image2 && <img 
        src={image2} 
        alt="Icon2" 
        style={{ height: "60px", width: "60px" }}/>}
      {text3 && <p>{text3}</p>}
      {text4 && <p>{text4}</p>}
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
};

export default InfoComponent;
