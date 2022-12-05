import { Alert, Form, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Clinic, getClinics } from "../../api";
import css from "./Clinics.module.css";

interface Props {
  handleGetPatients: (id: number) => void;
}

const config = {
  clinicsName: "clinics",
  defaultOptionValue: "DEFAULT",
};

const i18n = {
  error: "There was an error",
  label: "Please select a clinic:",
  defaultOptionLabel: "Select...",
};

export const Clinics = ({ handleGetPatients }: Props) => {
  const [clinicsSelectOptions, setClinicsSelectOptions] = useState<
    Array<{ label: string; value: number }>
  >([]);
  const [clinicsError, setClinicsError] = useState(false);
  const [clinicsLoading, setClinicsLoading] = useState(true);

  useEffect(() => {
    getClinics()
      .then((data) => {
        const options = data.map(({ id, name }: Clinic) => ({
          label: name,
          value: id,
        }));

        setClinicsSelectOptions(options);
      })
      .catch(() => {
        setClinicsError(true);
      })
      .finally(() => {
        setClinicsLoading(false);
      });
  }, []);

  const handleOnChange = async (value: number) => {
    handleGetPatients(value);
  };

  return (
    <div className={css.container}>
      {!clinicsLoading && !clinicsError ? (
        <Form
          initialValues={{
            [config.clinicsName]: config.defaultOptionValue,
          }}
        >
          <Form.Item
            className={css["select-field"]}
            name={config.clinicsName}
            label={i18n.label}
          >
            <Select
              onChange={handleOnChange}
              options={[
                {
                  disabled: true,
                  label: i18n.defaultOptionLabel,
                  value: config.defaultOptionValue,
                },
                ...clinicsSelectOptions,
              ]}
            />
          </Form.Item>
        </Form>
      ) : null}

      {clinicsError ? (
        <div className={css.container}>
          <Alert message={i18n.error} type="error" />
        </div>
      ) : null}

      {clinicsLoading ? <Spin /> : null}
    </div>
  );
};
