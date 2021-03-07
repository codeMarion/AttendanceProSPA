import { Box, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react';

interface GraphDialogProps {
    open: boolean,
    closeDialog: Function,
    children:any,
    title: string
}

const GraphDialog = (props: GraphDialogProps) => {
    return (
    <Dialog open={props.open} onClose={() => props.closeDialog()} aria-labelledby="form-dialog-title" fullWidth>
        <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
        </Box>
        <DialogContent>
            {props.children}
        </DialogContent>
    </Dialog>
    )
}

export default GraphDialog
