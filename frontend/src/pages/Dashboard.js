import "./Dashboard.css";
import wizkid from "../assets/wizkid.jpg";
import question from "../assets/question.png";
import search from "../assets/search.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Dashboard({route, navigation}) {
  const {state} = useLocation();
  const [showLog, setShowLog] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [method, setMethod] = useState("song");
  const [songList, addSongList] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  function methodChange(e) {
    setMethod(e.target.value);
  }

  // add error handling and make sure searches are not done unless the searchVal is actually set to something

  function findSong(){
    if(method==="song"){
      addSong()
    }else if(method==="billboard"){
      billboard()
    }else{
      applePlaylist()
    }
  }

  const addSong = async () => {
    console.log(searchVal)
    try {
      const response = await axios.post("http://127.0.0.1:8080/addSong", {song: searchVal, id:songList.length});
      console.log(response.data);
      addSongList([response.data, ...songList])
      console.log(songList)
    } catch (error) {
      console.log("Error Occured");
    }
  };

  function billboard(){}
  function applePlaylist(){}
  //console.log(state)
  return(
    <div className="dashboardBody">
      <header>
        <h1>tuneshift</h1>
        {/* replace with users spotify image */}
        <div className="headerHolder">
          {showLog && <button>logout</button>}
          <img className="headerImg" onClick={() => setShowLog(!showLog)} src={state.images[1].url} alt="holder"/>
        </div>
      </header>
      <div className="addContainer">
        <h2>Add Song(s)</h2>
        <div className="inputBox">
          <input placeholder="Enter song name" value={searchVal} onChange={e=>setSearchVal(e.target.value)}/>
          <img src={search} onClick={findSong}/>
        </div>
        
        {/* make the values of the select proper */}
        <select value={method} onChange={methodChange}>
          <option value="song">Song Name</option>
          <option value="billboard">Add Billboard hot 100</option>
          <option value="apple">Add Apple Playlist</option>
        </select>
      </div>
      {/* create display for if there are no songs that says there are no songs added yet or something */}
      {/* if there are multiple songs with the same name from the songs the user wants to add make screen for them to select the right one */}
      {songList.length > 0 && <div className="songsHolder">
        <div className="songsHeader">
          <div className="songNameHolder">
            <p>Name</p>
          </div>
          <div className="otherSongDetails">
            <p>Time</p>
            <p>Album</p>
            <p>Link</p>
          </div>
        </div>
        <div className="songs">
          {songList.map((song)=>{
            return(
            <div className="songCard" key={song.id}>
            <div className="songNameHolder">
              <img src={song.img}/>
              <div>
                <p>{song.title}</p>
                <p>{song.artists.map((artist)=><span>{artist}{"   "}</span> )}</p>
              </div>
            </div>
            <div className="otherSongDetails">
              <p>{song.time}</p>
              <p>{song.album}</p>
              <p><a href={song.link}>{song.title}</a></p>
            </div>
          </div>)
          })}
          
          <div className="songCard">
            <div className="songNameHolder">
              <img src={wizkid}/>
              <div>
                <p>Essense</p>
                <p>Wizkid, Tems</p>
              </div>
            </div>
            <div className="otherSongDetails">
              <p>3:33</p>
              <p>Made in Lagos</p>
              <p>Afrobeat</p>
            </div>
          </div>
        </div>
        <div className="bottomButtons">
          {/* add functionality where when you click these buttons new screen would come on top of the screen, the screen darkens and you can use the functionality of these buttons */}
          <button className="helpButton"><img src={question}/><p>Help</p></button>
          <button className="createButton">Create Playlist</button>
        </div>
      </div>}
      
      {songList.length === 0 &&
      <div className="noSongs">
        <h2>Add to create playlist</h2>  
      </div>}
    </div>
  )
}
