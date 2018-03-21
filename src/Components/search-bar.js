import React, {Component} from 'react';

class SearchBar extends Component {
  constructor() {
    super();
    this.onSearchInput = this.onSearchInput.bind(this);
  }

  onSearchInput(e) {
    e.preventDefault();
    const searchTerm = this.refs.term.value;
    this.props.onSearchInput(searchTerm);
  }

  render() {
    return (
      <div className="search-bar-area">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-6">
              <form className="form" onSubmit={this.onSearchInput}>
                <div className="input-group mb-3">
                  <input type="text" ref="term" className="form-control" placeholder="আপনার এলাকার নামাজের সময়সূচী দেখুন..." />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" type="button">এন্টার</button>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBar;
