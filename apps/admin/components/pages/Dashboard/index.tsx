import React, { useState } from "react";
import { Sidebar } from "../../Sidebar";
import { MyForm } from "../../Form/OpportunitiesForm";
import { HomePage } from "../../Home";

export const DashboardPage = () => {
	const [page, setPage] = useState("Home");

	return (
		<>
			<Sidebar getPage={setPage} />
			{page === "Home" && <HomePage />}

			{page === "Oportunidades" && <MyForm />}
		</>
	);
};
