import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './CircularProgress.scss';

const CircularProgressPin = require('../../../../static/assets/images/epoch/epoch-filled.svg');

export enum CircularProgressSize {
  SMALL = 'small',
  BIG = 'big',
}

export interface ICircularProgressProps {
  percentage?: number;
  size: CircularProgressSize;
  showText?: boolean;
  text?: any;
}

const CircularProgress = (props: ICircularProgressProps) => {
  const { percentage = 0, size, showText, text } = props;
  const sqSize = size === CircularProgressSize.SMALL ? 36 : 120;
  const strokeWidth = size === CircularProgressSize.SMALL ? 2 : 4;
  const percentageDegree = 3.6 * Math.min(percentage, 100);
  const rotateDegree = percentageDegree + 44.99;
  let percentageCircleStyle = null;
  if (percentage <= 50) {
    percentageCircleStyle = {
      backgroundImage: `linear-gradient(225deg, transparent 50%, #404250 50%), linear-gradient(${rotateDegree}deg, #1fc1c3 50%, #404250 50%)`,
    };
  } else {
    percentageCircleStyle = {
      backgroundImage: `linear-gradient(225deg, #1fc1c3 50%, transparent 50%), linear-gradient(${rotateDegree}deg, #1fc1c3 50%, #404250 50%)`,
    };
  }

  return (
    <div className={styles.circularProgressContainer}>
      <div
        className={styles.outsideCircle}
        style={{ width: sqSize, height: sqSize, ...percentageCircleStyle }}
      >
        <div
          className={styles.spinnerCircle}
          style={{ width: sqSize, height: sqSize }}
        />
        <div
          className={styles.insideCircle}
          style={{
            height: sqSize - 2 * strokeWidth,
            width: sqSize - 2 * strokeWidth,
          }}
        >
          {showText && <span>{text}</span>}
        </div>
        {size === CircularProgressSize.SMALL ? (
          <div className={styles.circularProgressPinCircle} />
        ) : (
          <CircularProgressPin className={styles.circularProgressPinImage} />
        )}
      </div>
    </div>
  );
};

export default observer(CircularProgress);