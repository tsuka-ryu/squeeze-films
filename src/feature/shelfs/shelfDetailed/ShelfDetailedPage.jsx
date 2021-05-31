import React from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import ShelfDetailedTitle from './ShelfDetailedTitle';
import ShelfDetailedNotice from './ShelfDetailedNotice';
import ShelfDetailedList from './ShelfDetailedList';
import SidePopularFilms from '../../side/SidePopularFilms';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listenToSelectedShelf } from '../shelfActions';
import useFirestoreDoc from '../../../app/hooks/useFirestoreDoc';
import { listenToShelfFromFirestore } from '../../../app/firestore/firestoreService';
import { Redirect } from 'react-router-dom';
import ShelfDetailedChat from './ShelfDetailedChat';

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

export default function ShelfDetailedPage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const shelf = useSelector((state) =>
    state.shelf.shelfs.find((s) => s.id === params.id)
  );
  const { error } = useSelector((state) => state.async);

  useFirestoreDoc({
    query: () => listenToShelfFromFirestore(params.id),
    data: (shelf) => dispatch(listenToSelectedShelf([shelf])),
    deps: [params.id, dispatch],
  });

  if (error) return <Redirect to='/error' />;

  if (!shelf) return <CircularProgress />;

  return (
    <div className={classes.container}>
      <div style={{ gridColumnEnd: 'span 8' }}>
        <ShelfDetailedTitle
          photoURL={shelf?.photoURL}
          displayName={shelf?.displayName || 'No Name'}
        />
        <ShelfDetailedNotice button={classes.button} shelfId={shelf.id} />
        <ShelfDetailedList shelf={shelf} />
      </div>
      <div style={{ gridColumnEnd: 'span 4' }}>
        <SidePopularFilms />
      </div>
      <ShelfDetailedChat shelfId={shelf.id} />
    </div>
  );
}
