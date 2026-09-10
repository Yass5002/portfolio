"use client";

import { useState } from "react";
import { career, education, etc } from "@/data/portfolio";
import type { TimelineItem } from "@/data/portfolio";

interface TimelineRowProps {
  item: TimelineItem;
  isOpen: boolean;
  onToggle: () => void;
}

function TimelineRow({
  item,
  isOpen,
  onToggle,
}: TimelineRowProps) {
  return (
    <div className="timeline-row-wrap">
      <button
        type="button"
        className="timeline-row"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="timeline-period">{item.period}</span>
        <div className="timeline-info">
          <span className="timeline-company">{item.company}</span>
          <span className="timeline-dept">{item.dept}</span>
        </div>
        <span className={`timeline-toggle-btn${isOpen ? " open" : ""}`}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 9.5l6 6 6-6" />
          </svg>
        </span>
      </button>
      <div className={`timeline-detail${isOpen ? " open" : ""}`}>
        <div>
          {item.role && item.works ? (
            <div className="timeline-inner-box">
              <b>{item.role}</b>
              <ul className="list-disc list-inside space-y-1.5 text-sm" style={{ color: "var(--muted-foreground)" }}>
                {item.works?.map((work, i) => (
                  <li key={i} className="leading-relaxed pl-1 -indent-5 ml-5">
                    {work}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="timeline-inner-box">{item.desc}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AboutMe() {
  const [openRows, setOpenRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section id="learning">
      <div className="about-inner">
        <div className="about-header">
          <div className="section-label">Learning Journey</div>
          <h2 className="section-title">Education &amp; Experience</h2>
          <p>Click on a row to see details</p>
        </div>

        <div className="timeline-group">
          <div className="timeline-group-label">
            <span>Experience</span>
          </div>
          <div className="timeline-card">
            {career.map((item, i) => (
              <TimelineRow
                key={i}
                item={item}
                isOpen={!!openRows[`career-${i}`]}
                onToggle={() => toggleRow(`career-${i}`)}
              />
            ))}
          </div>
        </div>

        <div className="timeline-group">
          <div className="timeline-group-label">
            <span>Education</span>
          </div>
          <div className="timeline-card">
            {education.map((item, i) => (
              <TimelineRow
                key={i}
                item={item}
                isOpen={!!openRows[`edu-${i}`]}
                onToggle={() => toggleRow(`edu-${i}`)}
              />
            ))}
          </div>
        </div>

        <div className="timeline-group">
          <div className="timeline-group-label">
            <span>Other</span>
          </div>
          <div className="timeline-card">
            {etc.map((item, i) => (
              <TimelineRow
                key={i}
                item={item}
                isOpen={!!openRows[`etc-${i}`]}
                onToggle={() => toggleRow(`etc-${i}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
