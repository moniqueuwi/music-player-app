import "../styles/Navbar.css";
type NavbarProps = {
  search: string;
  setSearch: (val: string) => void;
};

export default function Navbar({search, setSearch} : NavbarProps) {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <div className="nav-item">
          <button className="back-btn" title="Go Back" onClick={() => window.history.back()}>
            <i className="fa-solid fa-arrow-left"></i>
          </button>
        </div>
        <div className="nav-item">
          <form className="search" onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="search music..." aria-label="Search Music" className="search-input" value={search} onChange={e => setSearch(e.target.value)}/>
            <button className="search-btn" title="Search" type="submit">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </form>
        </div>
      </nav>
    </div>
  )
}