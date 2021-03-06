import React, { useState, useEffect, useRef, createRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { ExperienceItem } from './components/ExperienceItem';
import { useScrollPosition } from '../../hooks/ScrollPosition';
import styles from './experience.module.scss';

const entries = [
  {
    title: 'Fortinet',
    subtitle: 'Software Development Team Lead',
    content: [
      'Managed the FortiClient Linux development team and helped team members improve their abilities',
      'Analyzed product requirements and designed solutions to successfully deliver crucial features',
      'Participated in cross-team discussions to evaluate project feasibilities and identify potential issues',
      'Balanced multiple projects while ensuring high code quality and on-time completion of requirements',
    ],
    from: '2021',
    to: 'present',
  },
  {
    title: 'Fortinet',
    subtitle: 'Software Development Engineer I - II',
    content: [
      'Implemented a reliable database daemon in C++ which serves data to local processes via REST API',
      'Designed a fault-tolerant and fast webserver for log aggregation which can handle high data volumes',
      'Improved the stability of FortiClient Linux significantly by fixing critical issues raised by various users',
      'Stayed up-to-date with and learned new technologies that can better improve product performance',
    ],
    from: '2018',
    to: '2021',
  },
  {
    title: 'UBC Sailbot',
    subtitle: 'Software Developer',
    content: [
      'Researched and taught 3 other team members about the CAN bus and the CANopen protocol',
      'Planned the control system architecture with a team of 5 ensuring easy scaling and maintenance',
      'Developed and debugged embedded firmware for the STM32F4 microcontroller using Linux tools',
      'Implemented reliable data transfer in a real-time system for up to 127 separate data nodes using C',
    ],
    from: '2016',
    to: '2017',
  },
  {
    title: 'University of British Columbia',
    subtitle: 'Undergrad Student',
    content: [
      'Graduated from the University of British Columbia with a Bachelor of Applied Science in Electrical Engineering',
      'Achieved an overall GPA of 94.3% and received various honours and awards',
    ],
    from: '2013',
    to: '2017',
  },
];

export const Experience: React.FC<{}> = () => {
  const fromTags: string[] = [];
  const toTags: string[] = [];

  entries.forEach((entry) => {
    fromTags.push(entry.from);
    toTags.push(entry.to);
  });

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [activeTags, setActiveTags] = useState({ from: fromTags[0], to: toTags[0] });
  const [activeItem, setActiveItem] = useState(0);
  const sidebarRef = useRef(null);
  const itemRefs = useRef([]);

  itemRefs.current = Array(entries.length)
    .fill(null)
    .map((_, i) => itemRefs.current[i] || createRef());

  const updateActiveTags = (): void => {
    let idx = 0;

    if (!sidebarRef.current || itemRefs.current.length !== entries.length) {
      setActiveTags({ from: fromTags[0], to: toTags[0] });
      return;
    }

    for (let i = itemRefs.current.length - 1; i >= 0 && sidebarRef.current; i--) {
      if (!itemRefs.current[i]) {
        break;
      }

      const top = itemRefs.current[i].current.getBoundingClientRect().top;
      const rect = sidebarRef.current.getBoundingClientRect();

      if (top > rect.top + rect.height * 0.5) {
        continue;
      } else {
        idx = i;
        break;
      }
    }

    setActiveTags({ from: fromTags[idx], to: toTags[idx] });
    setActiveItem(idx);
  };

  useScrollPosition(
    (currpos: { x: number; y: number }) => setPos(currpos),
    [pos],
    document.getElementById('root'),
    50
  );

  useEffect(() => updateActiveTags(), [pos]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar
          ref={sidebarRef}
          fromTags={fromTags}
          toTags={toTags}
          activeFrom={activeTags.from}
          activeTo={activeTags.to}
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {entries.map((entry, i) => (
            <div
              key={i}
              ref={itemRefs.current[i]}
              className={i === activeItem ? styles.itemActive : styles.itemInactive}
            >
              <ExperienceItem
                title={entry.title}
                subtitle={entry.subtitle}
                content={entry.content}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
