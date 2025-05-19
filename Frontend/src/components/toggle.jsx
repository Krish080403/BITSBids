import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './toggle.css';

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(true);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOn(!isOn);

    if (!isOn) {
      navigate('/AddProduct');
    }
  };

  return (
    <div>
      <label className={`switch ${isOn ? 'green' : 'red'}`}>
        <input type="checkbox" checked={isOn} onChange={handleToggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
};

export default ToggleSwitch;
