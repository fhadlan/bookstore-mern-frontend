import React from "react";
import { useForm } from "react-hook-form";
import { auth } from "../../firebase/firebase.config";

function ChangePassword() {
  const { register, handleSubmit } = useForm();
  try {
    const user = auth.currentUser;
    user.getIdToken(true).then((token) => {
      console.log(token);
    });
  } catch (error) {}
  return <div>ChangePassword</div>;
}

export default ChangePassword;
