export default function App() {
  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">RechargeNow</div>

        <nav className="nav-links">
          <a href="#">Plans</a>
          <a href="#">Dashboard</a>
        </nav>

        <div className="nav-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign up</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>
          Fast, simple mobile recharges — whenever <br /> you need
        </h1>

        <p>
          Top carriers, secure payments, instant delivery. Manage all recharges
          from a single dashboard.
        </p>

        <div className="hero-buttons">
          <button className="primary-btn">Get started</button>
          <button className="secondary-btn">View plans</button>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>Multiple Operators</h3>
          <p>All major mobile operators supported.</p>
        </div>

        <div className="feature-card">
          <h3>Secure Payments</h3>
          <p>PCI-ready payments (connect your gateway).</p>
        </div>

        <div className="feature-card">
          <h3>Instant Delivery</h3>
          <p>Recharges processed in seconds.</p>
        </div>
      </section>
    </>
  );
}
