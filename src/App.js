import { useEffect, useState } from "react";
import "./App.css";
import AuthComponent from "./components/auth";
import { db } from "./config/firebase";
import { getDocs, collection, addDoc, deleteDoc,updateDoc, doc, setDoc } from "firebase/firestore";
function App() {
  const moviesCollectionRef = collection(db, "movies");
  const [listData, setListData] = useState([]);
  const [movieName, setMovieName] = useState("");
  const [movieHero, setMovieHero] = useState("");
  const [movieRate, setMovieRate] = useState("");
  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setListData(filteredData);
      console.log("fetched data ", filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  const addMovieDetailsbyNormalId = async () => {
    try {
      const data = await addDoc(moviesCollectionRef, {
        title: movieName,
        hero: movieHero,
        rating: movieRate,
      });
      console.log("fetched data ", data);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
   const addMovieDetailsByCustomId = async () => {
     try {
     const data = await setDoc(doc(db, "movies", "akashsoni"), {
       title: movieName,
       hero: movieHero,
       rating: movieRate,
     });
       console.log("fetched data ", data);
       getMovieList();
     } catch (err) {
       console.error(err);
     }
   };
  const deleteData = async (id) => {
    let movieDoc = doc(db, "movies", id);
    await deleteDoc(movieDoc);
    getMovieList();
  };
  const updateData = async (id) => {
    let movieDoc = doc(db, "movies", id);
    await updateDoc(movieDoc,{title:movieName});
    setMovieName("")
    getMovieList();
  };
  useEffect(() => {
    getMovieList();
  }, []);
  return (
    <div className="App">
      <AuthComponent />
      <div style={{ display: "flex", flexDirection: "column", width: "500px" }}>
        <h2>Movie Form</h2>
        <input
          placeholder="Movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <input
          placeholder="Movie Lead"
          value={movieHero}
          onChange={(e) => setMovieHero(e.target.value)}
        />
        <input
          placeholder="Movie rating"
          value={movieRate}
          onChange={(e) => setMovieRate(e.target.value)}
        />
        <button style={{ cursor: "pointer" }} onClick={addMovieDetailsbyNormalId}>
          Submit
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", width: "700px" }}>
        <h2>Movie Data</h2>
        <ul>
          {listData.map((vals) => {
            return (
              <li
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <h3>
                  {vals.title} has rating {vals.rating} and this is lead by {vals.hero}.
                </h3>
                <button
                  style={{ height: "30px", cursor: "pointer", textAlign: "center" }}
                  onClick={() => deleteData(vals.id)}
                >
                  Delete
                </button>
                <div>
                  <input
                    placeholder="Update Movie name"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                  />
                  <button
                    style={{ height: "30px", cursor: "pointer", textAlign: "center" }}
                    onClick={() => updateData(vals.id)}
                  >
                    Update
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
