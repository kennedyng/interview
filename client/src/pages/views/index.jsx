import React from "react";
import EditDetailsForm from "./EditDetailsForm";
const apiUrl = import.meta.env.VITE_API_URL;

const ViewsPage = () => {
  return (
    <>
      <EditDetailsForm />
    </>
  );
};

export default ViewsPage;

export async function loader({ params }) {
  const res = await fetch(`${apiUrl}/user/data/${params.userId}`);
  if (res.status === 500) {
    throw new Response("Not Found", { status: 404 });
  }

  return res.json();
}
