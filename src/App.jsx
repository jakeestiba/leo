import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';

// Home Page
function Home() {
  return (
    <section
      className="h-screen bg-no-repeat bg-center relative"
      style={{
        backgroundImage: 'url("gaming-background.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center justify-center h-full bg-black bg-opacity-60">
        <div className="text-center px-8 md:px-16">
          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-8 text-green-400">
            Welcome to AnimeVerse
          </h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Join and watch the ultimate experience and level up your adventure.
          </p>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get exclusive offers and new releases.
          </p>
          <Link
            to="/explore"
            className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white py-3 px-8 rounded-md text-lg font-semibold tracking-wide transform transition-all duration-300"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </section>
  );
}

// Anime List (Games Page)
function AnimeList() {
  const [anime, setAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("https://api.jikan.moe/v4/anime");

        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }

        const result = await response.json();
        setAnime(result.data);
      } catch (error) {
        console.error("Error fetching anime:", error);
        setError("Failed to load anime list.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-8 text-center text-white">
      <h2 className="text-4xl font-bold mb-6">Anime Library</h2>
      <div className="grid grid-cols-3 gap-4">
        {anime.map((anim) => (
          <div key={anim.mal_id} className="p-2 border-2 rounded-md bg-gray-800">
            <img
              src={anim.images.jpg.image_url}
              alt={anim.title}
              className="w-full h-auto rounded-md mb-2"
            />
            <div className="truncate font-bold text-xl text-gray-300">{anim.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Community Page
function Community() {
  return (
    <div className="p-8 text-center text-white bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6">Community</h2>
      <p className="text-lg mb-4">
        Join our vibrant community  Participate in discussions, share
        tips, and connect with like-minded individuals.
      </p>
      <Link
        to="/community"
        className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg"
      >
        Join the Community
      </Link>
    </div>
  );
}

// Store Page
function Store() {
  return (
    <div className="p-8 text-center text-white bg-gray-700 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6">Store</h2>
      <p className="text-lg mb-4">
        Browse our store for the latest anime to watch, merchandise, and exclusive
        discounts!
      </p>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg">
        Visit Store
      </button>
    </div>
  );
}

// News Page
function News() {
  return (
    <div className="p-8 text-center text-white bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6">Anime News</h2>
      <p className="text-lg mb-4">
        Stay up-to-date with the latest anime news, updates, and releases!
      </p>
      <ul className="space-y-4">
        <li className="text-sm">
          📅 *Demon Slayer* announces new season release date for 2024.
        </li>
        <li className="text-sm">
          🎬 *Attack on Titan* final season part 3 trailer drops with epic new footage.
        </li>
        <li className="text-sm">
          🏆 *Jujutsu Kaisen* wins "Best Anime of the Year" at Crunchyroll Anime Awards.
        </li>
        <li className="text-sm">
          🎮 *Naruto Shippuden* RPG game to launch with a new storyline.
        </li>
        <li className="text-sm">
          🏅 *One Piece* breaks another record with over 1,000 episodes aired.
        </li>
        <li className="text-sm">
          🌍 *My Hero Academia* collaborates with global brands for new merchandise.
        </li>
      </ul>
    </div>
  );
}


// Explore Page
function Explore() {
  return (
    <div className="p-8 text-center text-white bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-4xl font-bold mb-6">Explore</h2>
      <p className="text-lg mb-4">
        Discover exciting new games and genres. Start your next adventure today!
      </p>
      <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full text-lg">
        Start Exploring
      </button>
    </div>
  );
}

// Main App
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search query: ", searchQuery);
  };

  return (
    <Router>
      <div className="h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-black shadow-md fixed top-0 left-0 right-0 z-50">
          <div className="max-w-screen-xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-3xl font-extrabold text-green-400">
              <Link to="/" className="hover:text-blue-500">
                AnimeVerse
              </Link>
            </div>
            <nav className="flex space-x-8">
              <Link to="/games" className="text-white hover:text-green-400">
                Games
              </Link>
              <Link to="/community" className="text-white hover:text-green-400">
                Community
              </Link>
              <Link to="/store" className="text-white hover:text-green-400">
                Store
              </Link>
              <Link to="/news" className="text-white hover:text-green-400">
                News
              </Link>
            </nav>
            <form className="flex items-center" onSubmit={handleSearch}>
              <input
                type="text"
                placeholder="Search Games..."
                className="p-2 border border-gray-700 bg-gray-800 rounded-l-full text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-r-full hover:bg-green-600"
              >
                Search
              </button>
            </form>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<AnimeList />} /> {/* Changed to AnimeList */}
            <Route path="/community" element={<Community />} />
            <Route path="/store" element={<Store />} />
            <Route path="/news" element={<News />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
