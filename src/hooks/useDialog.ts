import React, {useState} from 'react';

// enum DialogState {
//   LOADING,
//   OPENED,
//   FETCHING,
//   CLOSED
// }

export interface IUseDialog {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
  isFetching: boolean;
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
  disabled: boolean;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

function useDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // const [state, setState] = useState<DialogState>(DialogState.CLOSED);

  return {isOpen, setIsOpen, isLoaded, setIsLoaded, isFetching, setIsFetching, disabled, setDisabled};
}

export default useDialog;