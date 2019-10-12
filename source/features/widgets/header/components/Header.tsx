import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import React from 'react';
import Search, { ISearchProps } from '../../search/components/Search';
import styles from './Header.scss';

const CardanoLogo = require('../../../../static/assets/images/header/cardano-logo.svg');

export enum BrandType {
  ENLARGED = 'enlarged',
  SHRINKED = 'shrinked',
}

export interface IHeaderProps {
  brandType?: BrandType;
  searchProps?: ISearchProps;
  router?: object;
  withSearch?: boolean;
}

const Header = (props: IHeaderProps) => {
  const { brandType, withSearch, searchProps } = props;
  const brandTypeStyle =
    brandType === BrandType.ENLARGED
      ? styles.enlargedBrandType
      : styles.shrinkedBrandType;

  const indexClassName = !location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';
  const stakePoolsClassName = location.pathname.includes('stake-pools')
    ? styles.activeTab
    : '';

  return (
    <header className={styles.headerContainer}>
      <div className={styles.contentContainer}>
        <div className={brandTypeStyle}>
          <div className={styles.logoContainer}>
            <CardanoLogo className={styles.logo} />
          </div>
          <div className={styles.titleContainer}>
            <span className={styles.cardanoTitle}>Cardano</span>
            <span className={styles.explorerTitle}>Blockchain Explorer</span>
          </div>
          <div className={styles.tabs}>
            <div className={styles.tabLeftLine} />
            <div className={styles.tabCircle} />
            <Link href="/">
              <a className={indexClassName}>Epochs & Blocks</a>
            </Link>
            <div className={styles.tabCircle} />
            <Link href="/stake-pools">
              <a className={stakePoolsClassName}>Stake Pools</a>
            </Link>
            <div className={styles.tabCircle} />
            <div className={styles.tabRightLine} />
          </div>
          <div className={styles.triangleSign}>
            <div className={styles.straightLine} />
            <div className={styles.triangle}>
              <div className={styles.innerTriangle} />
            </div>
          </div>
        </div>
        {withSearch && (
          <div className={styles.searchContainer}>
            <Search {...searchProps} />
          </div>
        )}
      </div>
    </header>
  );
};

export default observer(Header);