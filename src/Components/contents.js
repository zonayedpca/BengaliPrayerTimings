import React, {Component} from 'react'

import Content from './content';

class Contents extends Component {
  render () {
    return (
      <div className="contents-area">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <div className="contents">
                <Content prayerTime={this.props.prayerTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Contents;
