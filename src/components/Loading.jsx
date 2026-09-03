function Loading({ message = "Discovering destinations...", fullScreen = false }) {
  if (fullScreen) {
    return (
      <div className="loading-fullscreen">
        <div className="spinner-glow"></div>
        <p className="loading-text">{message}</p>
      </div>
    );
  }

  return (
    <div className="loading-container">
      <div className="spinner-glow"></div>
      <p className="loading-text">{message}</p>
    </div>
  );
}

export default Loading;
