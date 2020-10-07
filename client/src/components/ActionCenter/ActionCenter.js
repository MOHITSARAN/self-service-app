import React, { Component } from "react";
import {
  Grid,
  // Paper,
  Button,
  createMuiTheme,
  ButtonGroup,
} from "@material-ui/core";

import {
  Settings as SettingsIcon,
  // Add as AddIcon,
  // List as ListIcon,
  // MailOutline as MailIcon,
} from "@material-ui/icons";
import QuickToggles from "./QuickToggles";
import NewItemWidget from "./NewItemWidget";

const theme = createMuiTheme();

const styles = {
  ButtonGroup: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(2),
    display: "flex",
    justifyContent: "flex-end",
  },
  marginX: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  marginR: {
    marginLeft: theme.spacing(1),
  },
  marginY: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
  },
};

export default class ActionCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quickTogglesOpen: false,
      newItemWidgetOpen: false,
      sendMailWidgetOpen: false,
      mailEventsWidgetOpen: false,
      Open: false,
    };
  }

  handleActionCenterToggle = () => {
    this.setState({
      quickTogglesOpen: !this.state.quickTogglesOpen,
    });
  };

  handleNewItemToggle = () => {
    this.setState({
      newItemWidgetOpen: !this.state.newItemWidgetOpen,
    });
  };

  render() {
    let { quickTogglesOpen, newItemWidgetOpen } = this.state;
    let {
      onTakeItem,
      onPutItem,
      onPinItem,
      onUnPinItem,
      onEditContent,
      onDeleteItem,
      itemContentMap,
    } = this.props;

    return (
      <React.Fragment>
        <Grid container style={styles.flexEnd}>
          <Grid item xs={12} sm={5} style={styles.ButtonGroup}>
            <ButtonGroup
              size='small'
              aria-label='small outlined primary button group'
            >
              <Button
                startIcon={<SettingsIcon />}
                onClick={this.handleActionCenterToggle}
              >
                Quick Toggles
              </Button>
              {/* <Button
                startIcon={<AddIcon />}
                onClick={this.handleNewItemToggle}
              >
                New Item
              </Button>
              <Button
                startIcon={<ListIcon />}
                onClick={this.handleActionCenterToggle}
              >
                Send Via Mail
              </Button>
              <Button
                startIcon={<MailIcon />}
                onClick={this.handleActionCenterToggle}
              >
                Mail Events
              </Button> */}
            </ButtonGroup>
          </Grid>
        </Grid>

        {quickTogglesOpen && (
          <QuickToggles
            itemContentMap={itemContentMap}
            onTakeItem={onTakeItem}
            onPutItem={onPutItem}
            onPinItem={onPinItem}
            onUnPinItem={onUnPinItem}
            onEditContent={onEditContent}
            onDeleteItem={onDeleteItem}
          />
        )}

        {newItemWidgetOpen && (
          <NewItemWidget
            itemContentMap={itemContentMap}
            onTakeItem={onTakeItem}
            onPutItem={onPutItem}
            onPinItem={onPinItem}
            onUnPinItem={onUnPinItem}
            onEditContent={onEditContent}
            onDeleteItem={onDeleteItem}
          />
        )}
      </React.Fragment>
    );
  }
}
