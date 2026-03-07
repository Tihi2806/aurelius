import Link from "next/link";
import "./scandi.css";

export default function ScandiPage() {
  return (
    <div className="scandi-page">
      {/* Grain overlay */}
      <div className="scandi-grain" aria-hidden />

      {/* Back to selector */}
      <Link href="/" className="scandi-back">← Back</Link>

      {/* Nav */}
      <nav className="scandi-nav">
        <div className="nav-left">
          <div className="nav-hamburger" aria-hidden>
            <span />
            <span />
          </div>
        </div>
        <a className="nav-logo" href="#">Forma</a>
        <div className="nav-right">
          <a href="#">Search</a>
          <a href="#">Cart (0)</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <div className="hero-social" aria-hidden>
            <a href="#">Facebook</a>
            <a href="#">Insta</a>
            <a href="#">Pinterest</a>
          </div>
          <div className="hero-eyebrow">New Collection</div>
          <div className="hero-title">
            Forma<br />Studio
          </div>
        </div>
        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80"
            alt="Scandinavian interior"
          />
          <div className="hero-arrow">↓</div>
        </div>
      </section>

      {/* Section header */}
      <div className="section-header">
        <div>
          <div className="section-eyebrow">Curated for you</div>
          <div className="section-title">
            New<br />Collection
          </div>
        </div>
        <span className="section-link">Shop now</span>
      </div>

      {/* Product grid */}
      <div className="product-grid">
        <div className="product-card">
          <div className="product-image sage">
            <img
              src="https://images.unsplash.com/photo-1612360260957-cdb5c5c70c29?w=400&q=80"
              alt="Vase No. 3"
            />
          </div>
          <div className="product-name">Vase No. 3</div>
          <div className="product-price">€ 89</div>
          <div className="product-hover-btn">Quick add →</div>
        </div>
        <div className="product-card">
          <div className="product-image stone">
            <img
              src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80"
              alt="Serum Set"
            />
          </div>
          <div className="product-name">Serum Set</div>
          <div className="product-price">€ 124</div>
          <div className="product-hover-btn">Quick add →</div>
        </div>
        <div className="product-card">
          <div className="product-image taupe">
            <img
              src="https://images.unsplash.com/photo-1602607828010-0d679d9a9b8e?w=400&q=80"
              alt="Candle Oak"
            />
          </div>
          <div className="product-name">Candle Oak</div>
          <div className="product-price">€ 46</div>
          <div className="product-hover-btn">Quick add →</div>
        </div>
      </div>

      {/* Grid nav */}
      <div className="grid-nav">
        <div className="grid-counter">3 / 12</div>
        <div className="grid-arrows">
          <button type="button">←</button>
          <button type="button">→</button>
        </div>
        <button type="button" className="add-to-cart-btn">Add to Cart</button>
      </div>

      {/* Featured */}
      <section className="featured">
        <div className="featured-image">
          <img
            src="https://images.unsplash.com/photo-1620626011761-996317702519?w=800&q=80"
            alt="Perfect Bathroom"
          />
        </div>
        <div className="featured-content">
          <div className="featured-tag">↳ New</div>
          <div className="featured-title">
            Perfect<br />Bath<br />Room
          </div>
          <div className="featured-desc">
            Objects designed for quiet rituals. Each piece chosen for its simplicity, texture, and enduring calm.
          </div>
          <div className="featured-cta">
            <button type="button" className="btn-primary">Shop now</button>
            <span className="btn-link">View all</span>
          </div>
        </div>
      </section>

      {/* UGC / Hashtag */}
      <section className="hashtag-section">
        <div className="hashtag-text">#FormaAndMe</div>
        <div className="hashtag-inner">
          <div className="hashtag-photo">
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80"
              alt=""
            />
          </div>
          <div className="hashtag-photo">
            <img
              src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&q=80"
              alt=""
            />
          </div>
          <div className="hashtag-photo">
            <img
              src="https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=400&q=80"
              alt=""
            />
          </div>
          <div className="hashtag-photo">
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80"
              alt=""
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="scandi-footer">
        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">Catalog</a>
          <a href="#">Contacts</a>
          <a href="#">Shops</a>
          <a href="#">About</a>
        </div>
        <div className="footer-copy">Forma © 2025 All rights reserved</div>
        <div className="footer-social">
          <a href="#">Facebook</a>
          <a href="#">Insta</a>
          <a href="#">Pinterest</a>
        </div>
      </footer>
    </div>
  );
}
