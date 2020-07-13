import React, { useState, useEffect } from "react";
import "./FlashMessage.scss";
import { useSpring, animated } from "react-spring";

interface Props {
  message: string;
  status: number;
  name: string;
  removeError: (subName: string) => void;
}

const FlashMessageView = (props: Props) => {
  const { message, status, name, removeError } = props;
  const [expandButton, setExpandButton] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const buttonSpringProps = useSpring({
    width: expandButton ? "40px" : "10px",
  });

  const containerSpringProps = useSpring({
    top: "90%",
    width: "472px",
    opacity: 1,
    from: { top: "100%", width: "20px", opacity: 0.6 },
  });

  useEffect(() => {
    const firstNumber = status.toString().split("")[0];

    switch (firstNumber) {
      case "2":
        setButtonColor("flash-message-button-success");
        break;
      case "4":
        setButtonColor("flash-message-button-error");
        break;
      case "5":
        setButtonColor("flash-message-button-error");
        break;
    }

    setTimeout(() => removeError(name), 10000);
  }, [status]);

  const handleClose = () => {
    removeError(name);
  };

  return (
    <animated.div
      style={containerSpringProps}
      className="flash-message-container"
      onMouseEnter={() => setExpandButton(true)}
      onMouseLeave={() => setExpandButton(false)}
    >
      <animated.div
        style={buttonSpringProps}
        className={`flash-message-status-color ${buttonColor}`}
        onClick={handleClose}
      >
        {expandButton ? <div className="flash-message-close-x">X</div> : null}
      </animated.div>
      <div className="flash-message-text">{message}</div>
    </animated.div>
  );
};

export default FlashMessageView;
