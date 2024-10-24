import DetailView from "./DetailView";

const CustomersListDetail = () => (
  <DetailView
    title="Customer"
    fetchUrl="http://localhost:8085/api/customers"
    fields={[
      { label: "Name", key: "name" },
      { label: "ID", key: "id" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
    ]}
    dataExtractor={(data) => data.data}
  />
);

export default CustomersListDetail;
