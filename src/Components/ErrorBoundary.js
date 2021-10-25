import React from 'react';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  refreshPage = () => {
    window.location.reload();
  };
  HomeButton = () => {
    window.location = '/';
  };
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong <span onClick={this.refreshPage}>Reload</span> /
          Go to
          <span onClick={this.HomeButton}>Home page</span>.
        </h1>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
