import { NextPage } from "next";
import { useForm } from "react-hook-form";
import { Form } from "../components/Form";
import { supabase } from "../utils/supabase";

type IForm = {
  email: string;
  password: string;
  passwordConf: string;
};

const Signup: NextPage = () => {
  const { register, handleSubmit } = useForm<IForm>();
  const handleSignup = ({ email, password }: IForm) => {
    supabase.auth.signUp({ email, password });
  };

  console.log(handleSignup);

  const inputList = [
    { type: "email", name: "email", ref: register },
    { type: "password", name: "password", ref: register },
    { type: "password", name: "passwordConf", ref: register },
  ];

  return (
    <Form
      onSubmit={handleSubmit(handleSignup)}
      inputList={inputList}
      buttonText="サインアップ"
    />
  );
};

export default Signup;