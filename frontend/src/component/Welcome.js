export default function Welcome({ setPlay }) {
    return (
      <div className="welcome-main">
        <div className="welcome-bg">
        <h1 className="welcome-text">Z QUIZ</h1>
        </div>
     
        <button className="btn btn-play" onClick={() => setPlay(true)}>
          Jouer
        </button>
      </div>
    );
  }
  