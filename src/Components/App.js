import React, { Component } from 'react';
import axios from 'axios';
import location from 'browser-location';

import SearchBar from './search-bar.js';
import Contents from './contents.js';
import Footer from './footer';

const GOOGLE_API_KEY = 'AIzaSyDMeMwbYMk2DOf2rOBVK6VhPA_PO4kdBHw';

class App extends Component {
  constructor() {
    super();
    this.state = {
      term: null,
      location: null,
      prayerTime: null,
      currentPrayer: null
    }
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  componentDidMount() {
    this.getLocation();
  }

  getLocation() {
    location.get((err, position) => {
      if(err) {
        this.getLocationFromGoogle(this.state.term);
        console.log('Automatic Data couldn\'t be able to detect');
      } else {
        const location = {
          lat: position.coords.latitude,
          long: position.coords.longitude,
          timestamp: position.timestamp
        }
        this.setState({location});
        this.getTimings(this.state.location);
      }
    })
  }

  getLocationFromGoogle(dep) {
    if(!this.state.term) {
      return false
    }
    const reURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${dep}&key=${GOOGLE_API_KEY}`;
    axios.get(reURL)
      .then((response) => {
        // console.log(response);
        const getTime = new Date().getTime();
        const glocation = response.data.results[0].geometry.location;
        const location = {
          lat: glocation.lat,
          long: glocation.lng,
          timestamp: getTime
        }
        this.setState({location});
        this.getTimings(this.state.location);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getTimings({lat, long, timestamp}) {
    const time = Math.round(timestamp/1000)
    axios.get(`//api.aladhan.com/v1/timings/${time}?latitude=${lat}&longitude=${long}`)
      .then((response) => {
        // console.log(response);
        const data = response.data.data.timings;
        this.setState({prayerTime: [
          {time: ['সেহরী শেষ', data.Imsak]},
          {time: ['ফজর', data.Fajr]},
          {time: ['সূর্যোদয়', data.Sunrise]},
          {time: ['জোহর', data.Dhuhr]},
          {time: ['আছর', data.Asr]},
          {time: ['সূর্যাস্ত', data.Sunset]},
          {time: ['মাগরিব', data.Maghrib]},
          {time: ['এশা', data.Isha]},
          {time: ['মধ্যরাত', data.Midnight]}
        ]})
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onSearchInput(e) {
    this.setState({term: e}, () => {
      this.getLocationFromGoogle(this.state.term);
    });
  }

  render() {
    return (
      <div className="App">
        <SearchBar onSearchInput={this.onSearchInput} />
        <Contents prayerTime={this.state.prayerTime} />
        <Footer />
      </div>
    );
  }
}

export default App;
