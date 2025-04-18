"use client";

import dynamic from "next/dynamic";
import { NextPage } from "next";
const AdminApp = dynamic(() => import("./_components/admin"), { ssr: false });

const Home: NextPage = () => <AdminApp />;

export default Home;

/**
 * Setup:
 * 1. Install dependencies:
 * bun i react-admin ra-data-simple-rest
 * links:
 * https://marmelab.com/react-admin/NextJs.html - next js integration
 * https://marmelab.com/react-admin/DataProviders.html - rest api server
 *
 *
 **/
