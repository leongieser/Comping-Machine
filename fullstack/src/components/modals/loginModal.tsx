import useLoginModal from "../../../Hooks/useLoginModal";
import { useState, useCallback } from "react";
import { signIn } from 'next-auth/react';

import Modal from "../Modal";

const LoginModal = () => {

  //TODO refactor use modal hook
  const loginModal = useLoginModal(); //the custom hook
  const [isLoading, setIsLoading] = useState('');


  return (

    <button onClick={() => signIn()}>asdasd</button>
    // <Modal
    //   disabled={isLoading}
    //   isOpen={loginModal.isOpen}
    //   title="Identify"
    //   actionLabel="Continue with google"
    //   onClose={loginModal.onClose}
    //   action={'login'}
    // />

  );

}

export default LoginModal;