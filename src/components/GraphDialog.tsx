import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import React from 'react'

interface GraphDialogProps {
    open: boolean,
    closeDialog: Function
    children:any
}

const GraphDialog = (props: GraphDialogProps) => {
    return (
    <Dialog open={props.open} onClose={() => props.closeDialog()} aria-labelledby="form-dialog-title" fullWidth>
        <DialogTitle id="form-dialog-title">Graph</DialogTitle>
        <DialogContent>
            {props.children}
        </DialogContent>
    </Dialog>
    )
}

export default GraphDialog
