import { Component } from 'react';
import { withRouter} from 'react-router-dom'

class ScrollToTop extends Component {
  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo (0, 0);
    }
  }

  //因為最後會將App包起來，所以這裡的children就是指App
  render () {
    return this.props.children;
  }
}

export default withRouter (ScrollToTop);
