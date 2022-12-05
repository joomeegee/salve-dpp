import { Alert, Table } from "antd";
import { Patient } from "../../api";
import css from "./Patients.module.css";

interface Props {
  data: Patient[];
  error: boolean;
  loading: boolean;
}

const i18n: { [key: string]: string } = {
  dateOfBirth: "Date of Birth",
  error: "There was an error fetching patients",
  firstName: "First Name",
  lastName: "Last Name",
};

const sorter = (key: keyof Patient) => (a: Patient, b: Patient) =>
  a[key] < b[key] ? -1 : 1;

const columns = ["firstName", "lastName", "dateOfBirth"].map((key) => ({
  dataIndex: key,
  ellipsis: true,
  key,
  sorter: sorter(key as keyof Patient),
  title: i18n[key],
}));

export const Patients = ({ data, error, loading }: Props) => {
  const rowKey = ({ id }: Patient) => id;

  return (
    <div className={css.container}>
      {!error ? (
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey={rowKey}
          pagination={false}
          sticky
        />
      ) : (
        <Alert message={i18n.error} type="error" />
      )}
    </div>
  );
};
