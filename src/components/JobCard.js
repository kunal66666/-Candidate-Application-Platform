import React from 'react';
import { Card, CardContent, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const JobCard = ({ job }) => {
  const { title = '', company = '', location = '', jobDetailsFromCompany = 'No job description available', jobRole = '', minExp, maxExp, jdLink } = job;
  const descriptionPreview = jobDetailsFromCompany.slice(0, 150) + '...';
  const [showFullDescription, setShowFullDescription] = React.useState(false);
  const [isPopupOpen, setIsPopupOpen] = React.useState(false);

  const toggleDescription = () => setShowFullDescription(!showFullDescription);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const experienceText = minExp !== null || maxExp !== null ? `Experience: ${minExp !== null ? `${minExp}+ years` : ''} ${maxExp !== null ? `up to ${maxExp} years` : ''}` : 'Experience not specified';

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card variant="outlined" sx={{ backgroundColor: '#c4c4c4', borderRadius: '8px', padding: '7px', margin:'10px' }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {company}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            Role: {jobRole}
          </Typography>
          <Typography variant="body2" component="div">
            {showFullDescription ? jobDetailsFromCompany : descriptionPreview}
            {jobDetailsFromCompany.length > 150 && (
              <Button onClick={openPopup} color="primary">
                {showFullDescription ? 'Show Less' : 'Show More'}
              </Button>
            )}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="div">
            {experienceText}
          </Typography>
          {jdLink && (
            <Button variant="contained" color="primary" href={jdLink} target="_blank" rel="noopener">
              Apply
            </Button>
          )}
        </CardContent>
      </Card>
      <Dialog open={isPopupOpen} onClose={closePopup} maxWidth="md" fullWidth>
        <DialogTitle>Job Description</DialogTitle>
        <DialogContent>
          <Typography variant="body1">{jobDetailsFromCompany}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default JobCard;