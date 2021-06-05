import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

// own
import useStyles from './useStyles';

export default function WidgetBase({ children, title, image, extended, moreInfo }) {
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
        {
          image && <CardMedia image={image} className={classes.media} />
        }
        {
          children && (
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
          )
        }


        {
          moreInfo && (
            <CardActions>
              <Button size="small">{moreInfo}</Button>
            </CardActions>
          )
        }
      </Card>
    </Grid>
  );
}