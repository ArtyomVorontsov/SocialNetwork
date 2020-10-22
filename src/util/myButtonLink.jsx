import React from "react";
import { Tooltip, IconButton, withStyles } from "@material-ui/core";
import { Link } from "react-router-dom";
const styles = {

}

const MyButtonLink = ({to, Icon, title, placement, onClick, buttonClassname, toolTipClassName }) => (
    <Link to={to}>
        <Tooltip className={toolTipClassName} title={title} placement={placement} >
            <IconButton className={buttonClassname} onClick={onClick}>
                <Icon />
            </IconButton>
        </Tooltip>
    </Link>

)

export default withStyles(styles)(MyButtonLink);