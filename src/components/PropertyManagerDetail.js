import DetailView from "./DetailView";

const PropertyManagerDetails = () => (
  <DetailView
    title="Property Manager"
    fetchUrl="http://localhost:8085/api/property-managers"
    fields={[
      { label: "Name", key: "name" },
      { label: "ID", key: "id" },
      { label: "Email", key: "email" },
      { label: "Phone", key: "phone" },
    ]}
    dataExtractor={(data) => data}
  />
);

export default PropertyManagerDetails;
