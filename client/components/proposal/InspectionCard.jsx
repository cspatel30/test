
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import edit from '../../images/create-new-pencil-button.svg';
import notification from '../../images/notifications-button.svg';
import ReadMoreReact from 'read-more-react';

const styles = {
    card: {
      width: "100%",
    }
  };
  
  function InspectionCard(props) {
    const { classes } = props;
    
  
    return (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className="refno">
              ENQUIRY REF.NO
            </Typography>
            <Typography className="title">
              Pre-purchase Inspection
            </Typography>
            <Typography className="subtitle" >
              MV Berge Rosa ( IMO No. 123456)
            </Typography>
            <Typography className="imgtitle">
            <span className="FilterHead"><img src={edit} width="14px" height="14px" style={{padding: "0px 5px 0px 0px"}} /> 
             Quingdao China (5th June 2018 - 6th June 2018)</span>
            </Typography>
            <Typography className="imgtitle">
            <span className="FilterHead"><img src={notification} width="14px" height="14px" style={{padding: "0px 5px 0px 0px"}} />
             Vessel is post Panamax and urgently required an inspector</span>
            </Typography>
            <Typography className="description" >
            <ReadMoreReact text={'Description of job Ipusm Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged'}
                              min={6}
                              ideal={20}
                              max={100} />
            </Typography>
          </CardContent>         
        </Card>
      </div>
    );
  }
  
  InspectionCard.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(InspectionCard);
  