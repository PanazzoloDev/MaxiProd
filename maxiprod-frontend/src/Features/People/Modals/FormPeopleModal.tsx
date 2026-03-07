import { get } from "lodash";
import { observer } from "mobx-react";
import { Create, Update } from "../../../Components/Icons";
import { useDialogContext } from "../../../Contexts/DialogContext";
import FormsPeopleContainer from "../Containers/FormModalContainer";
import store from "../Stores/FormPeopleStore";

type FormPeopleModalProps = {
  onSuccess?: () => void;
  object?: object;
  type?: 'Create' | 'Update'
}

const FormToolsModal = observer((props: FormPeopleModalProps) => {
  const { openDialog, closeDialog } = useDialogContext();
  
  const handleOpenModal = async () => {
    if (props.type === "Update") {
      store.setStoreMode("Update");
      await store.submit('Read', get(props.object, 'id'));
      OpenModal("Editar");
    } else {
      OpenModal("Nova");
    }
  };

  const OpenModal = (mode: 'Editar' | 'Nova') => {
    openDialog({
      component: <FormsPeopleContainer object={props.object}/>,
      title: `${mode} pessoa`,
      okCallback: handleSubmit,
      cancelCallback: handleCloseModal,
      okText: "Confirmar",
      cancelText: "Cancelar",
      isOpen: true,
    });
  }

  const handleSubmit = () => {
    store.submit(props.type).then(() => {
      handleCloseModal()
      if(props.onSuccess) props.onSuccess()
    })
  }

  const handleCloseModal = () => {
    store.resetStore();
    closeDialog();
  }

  return (
    props.type == "Create" ?
      <Create onClick={handleOpenModal} /> :
      <Update onClick={handleOpenModal} />
  );
});

export default FormToolsModal;