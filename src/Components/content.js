import React, {Component} from 'react';
import moment from 'moment';

import 'moment/min/locales.min';
moment.locale('bn');

class Content extends Component {
  render() {
    if(!this.props.prayerTime) {
      return (
        <div className="row">
          <div className="col-md-12">
            <div className="error-msg">
              <p>আপনার এলাকার নাম প্রবেশ করুন, বা অটোমেটিক লোকেশান অ্যালাউ করুন</p>
            </div>
          </div>
        </div>
      )
    }
    // console.log(this.props.prayerTime);
    const item = this.props.prayerTime.map((prayer, a, b) => {
      // console.log(prayer.time[1]);
      const timeOr = prayer.time[1].split(':');
      const perfectTime = moment().hours(timeOr[0]).minutes(timeOr[1]).format('hh:mm A');
      return (
        <div key={prayer.time[0]} className="col-md-6">
          <div className="prayer-card">
            <h3>{prayer.time[0]}</h3>
            <p>{perfectTime}</p>
          </div>
        </div>
      )
    });
    return (
      <div className="row justify-content-md-center no-gutters">
        {item}
        <div className="col-md-6">
          <div className="prayer-card">
            <h3>ফীডব্যাক</h3>
            <p><a href="https://goo.gl/forms/6zuNjSzr45iBKd2q2">সহায়তা করুন</a></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Content;
