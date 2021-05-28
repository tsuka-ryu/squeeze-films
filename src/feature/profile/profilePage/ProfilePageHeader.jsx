import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(2),
    gridRowGap: theme.spacing(0),
    alignItems: 'center',
  },
  displayName: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
  avatar: {
    height: '100px',
    width: '100px',
  },
  button: {
    color: '#FFFFFF',
    width: '100%',
  },
}));

export default function ProfilePageHeader({ photoURL, displayName }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <div className={classes.container}>
          <Avatar alt='avatar' src={photoURL} className={classes.avatar} />
          <Typography
            variant='h3'
            style={{ gridColumnStart: 2, gridColumnEnd: 9 }}
            className={classes.displayName}
            color='textSecondary'
          >
            {displayName}
          </Typography>
          <Box style={{ gridColumnStart: 9, gridColumnEnd: 13 }}>
            <Grid
              container
              direction='row'
              justify='center'
              alignItems='center'
            >
              <Grid item>
                <Box mr={2}>
                  <Grid
                    container
                    direction='column'
                    justify='center'
                    alignItems='center'
                  >
                    <Typography variant='h3'>10</Typography>
                    <Typography variant='subtitle1'>Followers</Typography>
                  </Grid>
                </Box>
              </Grid>
              <Grid item>
                <Grid
                  container
                  direction='column'
                  justify='center'
                  alignItems='center'
                >
                  <Typography variant='h3'>5</Typography>
                  <Typography variant='subtitle1'>Followings</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Box mb={1} />
            <Button
              variant='contained'
              className={classes.button}
              color='primary'
            >
              <Box p={0.5}>Follow</Box>
            </Button>
          </Box>
        </div>
      </Box>
    </Paper>
  );
}