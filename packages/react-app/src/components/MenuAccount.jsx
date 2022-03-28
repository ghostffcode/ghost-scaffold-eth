import React, { useState } from "react";
import Account from "./Account";
import { Button } from "antd";

export default function MenuAccount({ ...props }) {
  const { web3Modal = {}, useBurner } = props;

  if (web3Modal && !web3Modal.cachedProvider && !useBurner) {
    return (
      <Button
        key="loginbutton"
        shape="round"
        size="large"
        /* type={minimized ? "default" : "primary"}     too many people just defaulting to MM and having a bad time */
        onClick={props.loadWeb3Modal}
      >
        connect
      </Button>
    );
  }

  return (
    <div>
      <Account {...props} addressProps={{ noCopy: true, noLink: true }} expandable />
    </div>
  );
}
