import './tutorial-text.scss';
import gif from 'src/assets/power-tutorial.gif';
import React from 'react';

const TutorialText = () => {
  return (
    <div className="tutorial">
      <h3>The location-based power simulator is designed to help find the best location for solar panels.</h3>
      <section className="tutorial-section">
        <ul>
          <li>Move the marker to reposition the solar panel.</li>
          <li>
            The azimuth is automatically calculated based on the time of day at the current location of the solar panel
            and its latitude and longitude.
          </li>
          <li>
            You can adjust the tilt, the solar panel&apos;s azimuth, the size of the solar panel, the panel efficiency,
            and the distance from the power storage.
          </li>
          <li>
            The simulation includes a pump. The power required to run the pump and the pump&apos;s efficiency can be
            adjusted, which will reflect in the power transfer output.
          </li>
        </ul>
      </section>
      <div className="gif-wrap">
        <img src={gif} alt="Power Tutorial" width="400" height="auto" style={{ display: 'block' }} />
      </div>
      <section className="tutorial-section">
        <ul>
          <li>
            The map is used for positioning the solar panel. We use this information to determine the time, weather,
            climate, and location for the simulation. These values are used in our calculations.
          </li>
          <li>
            <strong>Important:</strong> For higher power transfer make sure the solar panel is facing the calculated
            Azimuth. This is done by matching the calculated Azimuth to the Panel Azimuth.
          </li>
          <li>
            In the top right, you&apos;ll find the weather data, location data, and all controls for modifying both the
            solar panel and pump configurations.
          </li>
          <li>The bottom right displays the power simulation, showing power transfer per hour.</li>
        </ul>
      </section>
    </div>
  );
};

export default TutorialText;
