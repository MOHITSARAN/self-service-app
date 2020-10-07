import React from "react";
import { Grid, Tooltip, ClickAwayListener } from "@material-ui/core";
import Zoom from "@material-ui/core/Zoom";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "../style.css";

const InfoButton = ({ InfoText }) => {
  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <Grid item xs={1}>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true,
            }}
            TransitionComponent={Zoom}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={InfoText}
            arrow
            placement='top'
            className='info-icon'
          >
            <InfoOutlinedIcon
              onMouseOver={handleTooltipOpen}
              onMouseLeave={handleTooltipClose}
            />
          </Tooltip>
        </div>
      </ClickAwayListener>
    </Grid>
  );
};

export default InfoButton;
