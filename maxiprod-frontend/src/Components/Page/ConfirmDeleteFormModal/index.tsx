import { get } from "lodash";
import { useDialogContext } from "../../../Contexts/DialogContext";
import { Delete } from "../../Icons";
import BaseStore from "../../Stores/BaseStore";
import ConfirmModalPromp from "./style";

type ConfirmDeleteFormModalProps = {
    onSuccess?: () => void;
    object?: object;
    store: BaseStore;
    objectType: string;
}

const ConfirmDeleteModalContent = ({ objectType = 'registro' }: { objectType: string }) => {
    return (
        <ConfirmModalPromp>
            Tem certeza que deseja realizar a <strong>exclusão</strong> do(a) {objectType}?
        </ConfirmModalPromp>
    )
}

const ConfirmDeleteFormModal = (props: ConfirmDeleteFormModalProps) => {
    const { openDialog, closeDialog } = useDialogContext();
    const { store, object } = props
    const handleOpenModal = () => {
        openDialog({
            component: <ConfirmDeleteModalContent objectType={props.objectType} />,
            title: "Confirmação",
            okCallback: handleSubmit,
            cancelCallback: handleCloseModal,
            width: "lg",
            okText: "Confirmar",
            cancelText: "Cancelar",
            isOpen: true
        });
    };

    const handleSubmit = () => {
        store.submit("Delete", get(object, 'id')).then(() => {
            handleCloseModal()
        })
    }

    const handleCloseModal = () => {
        store.resetStore();
        closeDialog();
        if(props.onSuccess) props.onSuccess();
    }

    return (
        <Delete onClick={handleOpenModal} />
    );
};

export default ConfirmDeleteFormModal;
