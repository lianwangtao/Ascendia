import React from "react";
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Ascendia</h1>
        <p className="lead">
          A curated list of recipes for the best homemade meal and delicacies.
        </p>
        <hr className="my-4" />
        <Button 
          variant="contained" 
          color="primary"
          component={Link}
          to="/recipes"
        >
          View Videos
        </Button> 
      </div>
    </div>
  </div>
);
