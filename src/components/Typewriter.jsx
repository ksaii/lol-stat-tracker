import React, { useEffect, useRef } from "react";
import PropTypes from 'prop-types';

const Typewriter = ({ 
    text="Hello", 
    typingSpeed = 100
 }) => {
  const typewriterRef = useRef(null);

  useEffect(() => {
    const element = typewriterRef.current;
    if (element) {
      const steps = text.length; // Number of characters in the text
      const duration = (steps * typingSpeed) / 1000; // Calculate total duration in seconds
      element.style.setProperty("--steps", steps); // Pass steps as a CSS variable
      element.style.setProperty("--duration", `${duration}s`); // Pass duration as a CSS variable
    }
  }, [text, typingSpeed]);

  return (
    <div
      ref={typewriterRef}
      className="typewriter"
      style={{ "--text": `"${text}"`, maxWidth: "100%" }}
    >
      <span aria-live="polite">{text}</span>
    </div>
  );
}

Typewriter.propTypes = {
  text: PropTypes.string,
  typingSpeed: PropTypes.number,
};

export default Typewriter;
