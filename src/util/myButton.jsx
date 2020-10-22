import React from "react";
import { Tooltip, IconButton, withStyles } from "@material-ui/core";
const styles = {

}
const MyButton = ({Icon, title, placement, onClick, buttonClassname, toolTipClassName}) => (
    <Tooltip className={toolTipClassName} title={title} placement={placement} >
        <IconButton className={buttonClassname} onClick={onClick}>
            <Icon/>
        </IconButton>
    </Tooltip>
)

export default withStyles(styles)(MyButton);