import "./Navbar.css";

function Navbar({ setCurrentPage, isAttending }) {
  const navItems = [
    { label: "Home", page: "home" },
    { label: "Invitation", page: "invitation" },
    { label: "Attire Guide", page: "attire" },
    { label: "Gallery", page: "gallery" },
    { label: "Gift Registry", page: "gift" },

    ...(isAttending ? [{ label: "Venue Details", page: "details" }] : []),

    { label: "RSVP", page: "rsvp" },
  ];

  return (
    <nav className="navbar">
      <ul className="nav-links">
        {navItems.map((item) => (
          <li key={item.page}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(item.page);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
