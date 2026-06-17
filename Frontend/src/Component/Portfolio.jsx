import Reveal from "../components/Reveal";
import { PlayIcon, ArrowIcon } from "../components/icons";
import { WORK } from "../constants";
import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section id="work" aria-label="Portfolio" className="portfolio-section">
      <div className="portfolio-container">

        {/* Header */}
        <Reveal>
          <div className="portfolio-header">
            <div>
              <div className="portfolio-label-row">
                <div className="portfolio-label-line" />
                <span className="section-label">Selected Projects</span>
              </div>
              <h2 className="portfolio-title">
                Featured <span className="gold-text">Work</span>
              </h2>
              <div className="line-gold portfolio-title-line" />
            </div>

            <a href="#" className="portfolio-view-all">
              View All
              <ArrowIcon className="portfolio-view-all-icon" />
            </a>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="portfolio-grid">
          {WORK.map((item, i) => (
            <Reveal key={item.title} delay={i * 50}>
              <article className="portfolio-item">
                <img
                  src={`https://picsum.photos/seed/${item.seed}/600/450`}
                  alt={item.title}
                  className="portfolio-img"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="portfolio-overlay">
                  {/* Play icon (center) */}
                  <div className="portfolio-play">
                    <PlayIcon className="portfolio-play-icon" />
                  </div>

                  {/* Labels */}
                  <div className="portfolio-labels">
                    <span className="portfolio-item-category">
                      {item.category}
                    </span>
                    <h3 className="portfolio-item-title">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}