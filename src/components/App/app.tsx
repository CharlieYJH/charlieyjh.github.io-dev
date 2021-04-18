import React, { useContext } from 'react';
import { LandingPage } from '../LandingPage';
import { ThemeContext } from '../../providers/ThemeProvider';
import styles from './app.module.scss';

export const App: React.FC<{}> = () => (
  <div>
    <LandingPage className={styles.landingPage} />
  </div>
);
