import React from 'react';
import './app.scss';
import Header from 'src/components/header/header.jsx';
import SimulatorControls from 'src/components/simulator-controls/simulator-controls';
import Simulator from 'src/components/simulator/simulator.jsx';
import GeoMap from 'src/components/geo-map/geo-map.jsx';
import FullScreenModal from 'src/components/full-screen-modal/full-screen-modal.jsx';
import TutorialText from 'src/components/tutorial-text/tutorial-text.jsx';

const App = () => {
  const [hasSeenTutorial, setHasSeenTutorial] = React.useState(false);

  return (
    <div className="app">
      <Header title="Power Simulator" />
      <div className="app-page-wrap">
        {hasSeenTutorial === false ? (
          <FullScreenModal
            header="Location Based Power Simulator"
            contentText={<TutorialText />}
            onClicked={() => setHasSeenTutorial(true)}
          />
        ) : (
          <></>
        )}
        <GeoMap />
        <SimulatorControls />
        <Simulator />
      </div>
    </div>
  );
};

export default App;
