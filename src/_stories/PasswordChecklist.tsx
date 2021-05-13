import { IonText } from "@ionic/react";
import React, {
  ReactElement,
  useState,
  useEffect,
  isValidElement,
} from "react";

interface Props {
  password: string;
  isValid: (valid: boolean) => void;
}

export default function PasswordChecklist({
  password,
  isValid,
}: Props): ReactElement {
  const [errors, setErrors] = useState([
    "short",
    "noNumber",
    "noCapital",
    "noSpecial",
  ]);

  useEffect(() => {
    validate();
  }, [password]);

  const validate = () => {
    const errors = [];
    if (password.length < 8) {
      errors.push("short");
    }
    if (/\d/.test(password) === false) {
      errors.push("noNumber");
    }
    if (/[A-Z]/.test(password) === false) {
      errors.push("noCapital");
    }
    if (/[!@#$%^&*()_+{}?<>~]/.test(password) === false) {
      errors.push("noSpecial");
    }
    setErrors(errors);

    isValid(errors.length > 0);
  };

  return (
    <ul className="ion-no-padding">
      <h2>Password must be:</h2>
      <div className="ion-padding-start">
        <p>
          <IonText color={errors.includes("short") ? "danger" : "success"}>
            8 characters long
          </IonText>
        </p>
        <p>
          <IonText color={errors.includes("noNumber") ? "danger" : "success"}>
            Include one number
          </IonText>
        </p>
        <p>
          <IonText color={errors.includes("noCapital") ? "danger" : "success"}>
            Include one capital letter
          </IonText>
        </p>
        <p>
          <IonText color={errors.includes("noSpecial") ? "danger" : "success"}>
            Include one special character
          </IonText>
        </p>
      </div>
    </ul>
  );
}
