# Solar Panel Simulator by Jordan Koszarek

## Table of Contents
- [About Me](#about-me)
- [Hosted](#hosted)
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Limitations](#limitations)
- [Future Considerations](#future-considerations)

## About Me

My name is Jordan Koszarek, I'm a software engineer, and this is my React based Passive Logic submission for simulating the power transfer from a solar panel to power storage.

[LinkedIn](https://www.linkedin.com/in/jordankoszarek/)

[GitHub](https://github.com/JordanKoszarek)

## Hosted

For convenience, I have hosted the web app in Azure at: https://jkpowertransfer.z5.web.core.windows.net/

## Overview

The Solar Panel Simulator is a tool that helps users determine the best placement for solar panels based on 
weather conditions, location, the time of day, and the current date. 
By using current weather data, temperature, location, and cloud coverage, this simulator will output the watts per hour, pump consumption and net power.

## Features

- Interactive map for solar panel placement
- Weather data integration
- Energy transfer data
- Automatically calculate [Azimuth](https://en.wikipedia.org/wiki/Azimuth) based on the current date and location
- Customizable solar panel configuration: Area m^2, Panel Tilt, Panel Efficiency, Panel Facing direction, and distance from the power storage.

## Installation

To set up and run the project locally:

Prerequisite
0. (Prerequisite) install node.js and npm more info: 
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm


1. Install dependencies:

```npm install```

2. Start the development server:

```npm run dev```

3. Open localhost

http://localhost:5174/

**Note**: An OpenWeatherMap API key is provided, limited to 1000 requests per day. If I were to use this in production the key would be in a Azure Key Vault or GitHub Secret.

## Usage

1. Open the application in your web browser.
2. Drag and drop the marker on the map to position the solar panel.
3. Configure your solar panel and pump, default values are provided.
4. The simulator will update with energy generation estimates based on the new location.

## How It Works

1. **Location Data**: The simulator uses Leaflet to provide an interactive map. When you move the marker, it captures the new latitude and longitude.

2. **Weather Integration**: Using the location data, the app makes an API request to OpenWeatherMap to fetch current weather conditions, including cloud coverage, temperature, and humidity, and local timezone.

3. **Parameter Consideration**: The simulation takes into account user-defined parameters such as solar panel size, distance from the storage container, and storage container capacity.

4. **Energy Simulation**: Based on all collected data, the simulator calculates the potential energy transfer per hour under the current conditions.

## Limitations

- The simulator only considers current weather conditions, and current time which means the current sun location. It does not account for weather changes over time.
- The math has been simplified for the proof of concept, I would not use this for actual solar panel placement, although it could be a good place to start.
- The web app is intended for desktop use, some of the smaller screen styling could use work.
- The simulator only accounts for 1 solar panel.

## Future Considerations

- It would be great to support multiple solar panels.
- Account for weather changes over time
- Support time based simulation, for example, simulating a month at a time given the rotation of the solar panel and the changes in output over time.

