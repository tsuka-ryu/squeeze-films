import React from 'react';
import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import { Stars } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(0),
  },
  stars: {
    height: '40px',
    width: '40px',
  },
  title: {
    textDecoration: `underline solid ${theme.palette.primary.main} 1px`,
    textUnderlineOffset: '4px',
  },
}));

export default function FilmDashboardTitle({ paper }) {
  const classes = useStyles();

  return (
    <Paper>
      <Box p={2}>
        <div className={classes.container}>
          <Stars style={{ gridColumnStart: 1 }} className={classes.stars} />
          <Typography
            variant='h3'
            style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
            className={classes.title}
          >
            The 10 Best Squeezed Films of All Time
          </Typography>
          <Typography
            variant='body1'
            style={{ gridColumnStart: 2, gridColumnEnd: 12 }}
          >
            オール・タイム・ベスト１０映画を共有しよう
          </Typography>
        </div>
      </Box>
    </Paper>
  );
}
