import './App.css';
import LoginButton from './buttons/LoginButton';
import LogoutButton from './buttons/LogoutButton';
import Profile from './buttons/Profile';

const image = new URL("../assets/img-removebg-preview-PhotoRoom.png", import.meta.url);

function App() {
  return (
    <div className="App">
      <div  className="navBar">
      <Profile/>
      </div>
      <div className="header">
        <h1 className="falling-text">
          <span>W</span>
          <span>O</span>
          <span>R</span>
          <span>D</span>
          <span>    </span>
          <span> </span>
          <span> </span>
          <span>G</span>
          <span>A</span>
          <span>M</span>
          <span>E</span>
        </h1>
      </div>
      <div className="box">
        <h1>How to Play</h1>
        <p className='Rules'>
          Rules are simple. Words will fall, and you have to type them in the box.
          The faster you type more points you get. So let's start the game!! All the best!!
        </p>
        <LoginButton/>
        <LogoutButton/>
      
        
      </div>
      <img className="w" src={image} alt="wordw" />
      
          </div>
  );
}

export default App;
