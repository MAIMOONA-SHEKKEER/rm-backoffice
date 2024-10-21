export const queries = [
  {
    id: 1,
    ownerName: "John PropertyOwner",
    contactNumber: "123-555-7890",
    queries: [
      "When is the next property inspection?",
      "What are the current maintenance requests for Downtown Apartments?",
    ],
    status:"Open"
  },
  {
    id: 2,
    ownerName: "Jane PropertyOwner",
    contactNumber: "987-555-3210",
    queries: [
      "How much rent has been collected this year?",
      "What are the utility expenses for Lakeside Villas?",
    ],
    status:"Open"
  },
  {
    id: 3,
    ownerName: "Alice PropertyOwner",
    contactNumber: "555-234-5678",
    queries: [
      "What is the status of the renovation at Maple Heights?",
      "When will the lease agreements be renewed?",
    ],
    status:"Fixed"
  },
  {
    id: 4,
    ownerName: "Bob PropertyOwner",
    contactNumber: "555-345-6789",
    queries: [
      "Are there any pending approvals for new tenants?",
      "What is the process for handling maintenance emergencies?",
    ],
    status:"Open"
  },
  {
    id: 5,
    ownerName: "John PropertyOwner", 
    contactNumber: "555-456-7890",
    queries: [
      "How can I get updates on property performance?",
      "What are the latest market trends in the area?",
    ],   
     status:"Open"
  },
  {
    id: 6,
    ownerName: "Diana PropertyOwner",
    contactNumber: "555-567-8901",
    queries: [
      "What should I do if a tenant is late on rent?",
      "How are late fees calculated?",
    ],
    status:"Fixed"
  },
  {
    id: 7,
    ownerName: "Charlie PropertyOwner",
    contactNumber: "555-678-9012",
    queries: [
      "When is the next tenant meeting scheduled?",
      "How do I submit a maintenance request?",
    ],
    status:"Open"
  },
  {
    id: 8,
    ownerName: "Jane PropertyOwner",
    contactNumber: "555-789-0123",
    queries: [
      "What insurance coverage do I need for my property?",
      "Can I get a report on tenant satisfaction?",
    ],
    status:"Open"
  },
  {
    id: 9,
    ownerName: "George PropertyOwner",
    contactNumber: "555-890-1234",
    queries: [
      "What is the policy for handling noise complaints?",
      "How often are property inspections conducted?",
    ],
    status:"Fixed"
  },
  {
    id: 10,
    ownerName: "Hannah PropertyOwner",
    contactNumber: "555-901-2345",
    queries: [
      "What marketing strategies are in place to attract new tenants?",
      "How do I request repairs for my unit?",
    ],
    status:"Open"
  },
  {
    id: 11,
    ownerName: "Isaac PropertyOwner",
    contactNumber: "555-012-3456",
    queries: [
      "What are the payment options available for tenants?",
      "When will the new maintenance team be appointed?",
    ],
    status:"Open"
  },
  {
    id: 12,
    ownerName: "John PropertyOwner", 
    contactNumber: "555-123-4567",
    queries: [
      "How can I appeal a tenant eviction?",
      "What is the process for renewing a lease?",
    ],
    status:"Fixed"
  },
];


export const queriesColumns = [
  { id: "id", label: "Queries ID" },
  { id: "ownerName", label: "Name" },
  { id: "contactNumber", label: "Phone" },
  { id: "queries", label: "Queries" },
  { id: "status", label: "Status" },
  {id: "action", label: "Action"},
];
