import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import ShelfDashboardTitle from './ShelfDashboardTitle';
import ShelfDashboardNotice from './ShelfDashboardNotice';
import ShelfList from './ShelfList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShelfs } from '../shelfActions';
import { useEffect } from 'react/cjs/react.development';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
  },
  button: {
    color: '#FFFFFF',
    background: '#33291A',
    padding: theme.spacing(1),
  },
}));

export default function ShelfDashboard() {
  const classes = useStyles();
  const limit = 2;
  const dispatch = useDispatch();
  const { shelfs, lastVisible } = useSelector((state) => state.shelf);
  const [loadingInit, setLoadingInit] = useState(false);

  useEffect(() => {
    setLoadingInit(true);
    dispatch(fetchShelfs(limit)).then(() => {
      setLoadingInit(false);
    });
  }, [dispatch]);

  function handleFetchMoreShelfs() {
    dispatch(fetchShelfs(limit, lastVisible));
  }

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDashboardTitle />
        <ShelfDashboardNotice button={classes.button} />
        <ShelfList shelfs={shelfs} button={classes.button} />
        <Button onClick={handleFetchMoreShelfs}>More</Button>
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
    </div>
  );
}
