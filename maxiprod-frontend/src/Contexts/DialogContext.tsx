import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useContext, useState, createContext } from "react";
import { primary, secondary } from "../Commons/colors";
import type { DialogWidthType, EmptyFunctionType } from "../Commons/types";
import StandardButton from "../Components/Buttons/StandardButton";

interface DialogState {
    isOpen: boolean;
    title: string;
    okText?: string;
    cancelText?: string;
    width?: DialogWidthType;
    component: React.ReactNode;
    okCallback: () => void;
    cancelCallback?: EmptyFunctionType;
}

interface DialogContextType {
    openDialog: (dialogState: DialogState) => void;
    closeDialog: () => void;
}

const dialogContext = createContext<DialogContextType | undefined>(undefined);

interface PropTypes {
    children: React.ReactNode;
}



const DialogProvider: React.FC<PropTypes> = ({ children }) => {
    const [dialogs, setDialogs] = useState<DialogState[]>([]);

    const openDialog = (dialogState: DialogState) => {
        setDialogs((prevDialogs) => [...prevDialogs, dialogState]);
    };

    const closeDialog = () => {
        setDialogs((prevDialogs) => prevDialogs.slice(0, -1));
    };

    const handleCloseClick = () => {
        const currentDialog = dialogs[dialogs.length - 1];
        if (currentDialog.cancelCallback) {
            currentDialog.cancelCallback();
        } else {
            closeDialog();
        }
    };

    return (
        <dialogContext.Provider value={{ openDialog, closeDialog }}>
            {dialogs.map((dialog, index) => (
                <Dialog
                    PaperProps={{ style: { backgroundColor: secondary } }}
                    key={index}
                    component="form"
                    open={dialog.isOpen}
                    onClose={handleCloseClick}
                    maxWidth={dialog.width || "md"}
                    onSubmit={(e) => {
                        e.preventDefault();
                        dialog.okCallback();
                    }}
                >
                    <DialogTitle
                        style={{ backgroundColor: primary, color: secondary, cursor: 'move' }}
                        fontSize="20px"
                        component="h1"
                        marginBottom="15px"
                    >
                        {dialog.title}
                    </DialogTitle>
                    <DialogContent>
                        {dialog.component}
                    </DialogContent>
                    <DialogActions>
                        <StandardButton text={dialog.cancelText || "Cancelar"} type="reset" onClick={handleCloseClick} />
                        <StandardButton text={dialog.okText || "Ok"} type="submit" />
                    </DialogActions>
                </Dialog>
            ))}
            {children}
        </dialogContext.Provider>
    );
};

const useDialogContext = () => {
    const context = useContext(dialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogProvider");
    }
    return context;
};

// eslint-disable-next-line react-refresh/only-export-components
export { DialogProvider, useDialogContext };