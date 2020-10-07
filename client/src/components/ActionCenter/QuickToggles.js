import React from "react";
import {
  createMuiTheme,
  Paper,
  Grid,
  FormControlLabel,
  Typography,
  Switch,
  // Button,
} from "@material-ui/core";
// import { Edit as EditIcon, Delete as DeleteIcon } from "@material-ui/icons";

const theme = createMuiTheme();
const styles = {
  paper: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    padding: theme.spacing(2),
  },
  Typography: {
    marginTop: "0.2em",
  },
};

export default class QuickToggles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let { itemContentMap } = this.props;
    return (
      <Paper variation='elevation' style={styles.paper}>
        <Grid container>
          <Grid item xs={3}>
            <Typography variant='subtitle1'>Caption</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle1'>Hide/UnHide Items</Typography>
          </Grid>
          {/* <Grid item xs={2}>
            <Typography variant='subtitle1'>Pin to Home page</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle1'>Pin to Domain page</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant='subtitle1'>Edit Content</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant='subtitle1'>Delete Items</Typography>
          </Grid> */}
        </Grid>
        {Object.keys(itemContentMap)
          .sort()
          .map((i, idx) => (
            <Grid container item xs={12} key={idx}>
              <Grid item xs={3}>
                <Typography variant='subtitle1' style={styles.Typography}>
                  {itemContentMap[i].caption}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={itemContentMap[i].visible}
                      onChange={
                        itemContentMap[i].visible
                          ? this.props.onPutItem.bind(undefined, i)
                          : this.props.onTakeItem.bind(undefined, i)
                      }
                      name={i}
                    />
                  }
                  label={itemContentMap[i].visible ? "Visible" : "Hidden"}
                />
              </Grid>
              {/* <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={itemContentMap[i].pinnedState}
                      onChange={
                        itemContentMap[i].pinnedState
                          ? this.props.onUnPinItem.bind(undefined, i)
                          : this.props.onPinItem.bind(undefined, i)
                      }
                      name={i}
                    />
                  }
                  label={
                    itemContentMap[i].pinnedState ? "Pinned" : "Not Pinned"
                  }
                />
              </Grid>
              <Grid item xs={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={itemContentMap[i].pinnedState}
                      onChange={
                        itemContentMap[i].pinnedState
                          ? this.props.onUnPinItem.bind(undefined, i)
                          : this.props.onPinItem.bind(undefined, i)
                      }
                      name={i}
                    />
                  }
                  label={
                    itemContentMap[i].pinnedState ? "Pinned" : "Not Pinned"
                  }
                />
              </Grid>
              <Grid item xs={1}>
                <Button
                  startIcon={<EditIcon />}
                  onClick={this.props.onEditContent.bind(
                    undefined,
                    itemContentMap[i].contentID,
                  )}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button
                  key={idx}
                  startIcon={<DeleteIcon />}
                  onClick={this.props.onDeleteItem.bind(undefined, i)}
                >
                  Delete
                </Button>
              </Grid>
             */}
            </Grid>
          ))}
      </Paper>
    );
  }
}
