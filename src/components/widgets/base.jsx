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

export default function WidgetBase({
  children, title, image, panoramic = false, extended, actions, actionsClasses, moreInfo, spaceBetween,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card classes={{ root: spaceBetween ? classes.rootSpaceBetween : classes.rootCenter }}>
        {
          title && (
            <CardHeader
              classes={{
                root: classes.header,
                title: classes.headerTitle,
              }}
              title={title}
            />
          )
        }
        {
          image && <CardMedia image={image} className={panoramic ? classes.panoramicMedia : classes.media} />
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

        {
          actions && (
            <CardActions disableSpacing classes={{ root: actionsClasses }}>
              {actions}
            </CardActions>
          )
        }
      </Card>
    </Grid>
  );
}