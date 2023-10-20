import React from "react";
import Header from "./Header";
import Footer from "./Footer";

import { Helmet } from "react-helmet";

// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import  { Toaster } from 'react-hot-toast';

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <div>
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "82.6vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title: "PickNPay",
  description: "Ecommerce-App",
  keywords: "mern,react, node, mongodb",
  author: "Anshu Verma",
};

export default Layout;
