import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './full-screen-modal.scss';

const FullScreenModal = ({ contentText, header, onClicked, style }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isReading, setIsReading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsReading(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    if (onClicked) {
      setIsVisible(false);
      setTimeout(() => {
        onClicked();
      }, 700);
    }
  };

  return (
    <div
      className={`full-screen-modal ${isVisible ? 'visible' : 'hidden'} ${isReading ? ' no-events' : ''}`}
      onClick={handleClick}
    >
      <div className="modal-dialog" style={style}>
        <h2 className="modal-header">{header}</h2>
        <div className="modal-content">{contentText}</div>
      </div>
    </div>
  );
};

FullScreenModal.propTypes = {
  contentText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  onClicked: PropTypes.func,
  style: PropTypes.object,
};

export default FullScreenModal;
