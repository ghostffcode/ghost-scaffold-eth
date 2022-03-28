import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="/" rel="noopener noreferrer">
      <PageHeader
        title="⚡️ Ghost Scaffold-ETH"
        subTitle="A starterkit for @ghostffcode buidls"
        className="inline-flex"
      />
    </a>
  );
}
