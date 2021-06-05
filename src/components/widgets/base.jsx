import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

// own
import useStyles from './useStyles';

export default function WidgetBase({ children, title, extended }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4}>
      <Card>
        <CardHeader
          classes={{
            root: classes.header,
            title: classes.headerTitle,
          }}
          title={title}
        />
        <CardContent className={extended ? classes.doubleContent : classes.singleContent}>
          <div className={classes.column}>
            {children}
          </div>
          {
            extended
            && (
              <div className={classes.column}>
                {extended}
              </div>
            )
          }
        </CardContent>
      </Card>
    </Grid>
  );
}