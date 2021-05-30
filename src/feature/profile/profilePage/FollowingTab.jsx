import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import ProfileCard from './ProfileCard';
import PersonIcon from '@material-ui/icons/Person';
import useFirestoreCollection from '../../../app/hooks/useFirestoreCollection';
import {
  getFollowersCollection,
  getFollowingCollection,
} from '../../../app/firestore/firestoreService';
import { listenToFollowers, listenToFollowings } from '../profileAction';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(2),
    alignItems: 'center',
  },
  person: {
    height: '50px',
    width: '50px',
    fill: theme.palette.text.secondary,
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
}));

export default function FollowingTab({
  value,
  index,
  profile,
  activeTab,
  setValue,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { followers, followings } = useSelector((state) => state.profile);

  useFirestoreCollection({
    query:
      activeTab === 2
        ? () => getFollowersCollection(profile.id)
        : () => getFollowingCollection(profile.id),
    data: (data) =>
      activeTab === 2
        ? dispatch(listenToFollowers(data))
        : dispatch(listenToFollowings(data)),
    deps: [activeTab, dispatch],
  });

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
    >
      {value === index && (
        <Box p={2}>
          <div className={classes.container}>
            <PersonIcon
              style={{ gridColumnStart: 1 }}
              className={classes.person}
            />
            <Typography
              variant='h5'
              style={{ gridColumnStart: 2, gridColumnEnd: 11 }}
              color='textSecondary'
            >
              {activeTab === 2 ? 'Followers' : 'Followings'}
            </Typography>
            <Grid
              container
              direction='row'
              justify='flex-start'
              alignItems='center'
              style={{ gridColumnStart: 1, gridColumnEnd: 13 }}
            >
              {activeTab === 2 &&
                followers.map((profile) => (
                  <ProfileCard
                    profile={profile}
                    key={profile.id}
                    setValue={setValue}
                  />
                ))}
              {activeTab === 3 &&
                followings.map((profile) => (
                  <ProfileCard
                    profile={profile}
                    key={profile.id}
                    setValue={setValue}
                  />
                ))}
            </Grid>
          </div>
        </Box>
      )}
    </div>
  );
}
