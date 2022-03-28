import { Button, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import Address from "./Address";
import Balance from "./Balance";
import Wallet from "./Wallet";
import { Copy, ExternalLink, Sliders } from "react-feather";
import { useClipboard } from "use-clipboard-copy";
import classnames from "classnames";

/*
  ~ What it does? ~

  Displays an Address, Balance, and Wallet as one Account component,
  also allows users to log in to existing accounts and log out

  ~ How can I use? ~

  <Account
    useBurner={boolean}
    address={address}
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    price={price}
    web3Modal={web3Modal}
    loadWeb3Modal={loadWeb3Modal}
    logoutOfWeb3Modal={logoutOfWeb3Modal}
    blockExplorer={blockExplorer}
    addressProps = {},
    withBalance = true
  />

  ~ Features ~

  - Provide address={address} and get balance corresponding to the given address
  - Provide localProvider={localProvider} to access balance on local network
  - Provide userProvider={userProvider} to display a wallet
  - Provide mainnetProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide price={price} of ether and get your balance converted to dollars
  - Provide web3Modal={web3Modal}, loadWeb3Modal={loadWeb3Modal}, logoutOfWeb3Modal={logoutOfWeb3Modal}
              to be able to log in/log out to/from existing accounts
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
*/

export default function Account({
  price,
  address,
  useBurner,
  web3Modal,
  expandable,
  userSigner,
  blockExplorer,
  localProvider,
  loadWeb3Modal,
  mainnetProvider,
  logoutOfWeb3Modal,
  addressProps = {},
  withBalance = true,
}) {
  const { currentTheme } = useThemeSwitcher();

  const [expand, setExpand] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const clipboard = useClipboard({
    copiedTimeout: 600, // timeout duration in milliseconds
  });

  const isBurnerWallet = useBurner && !web3Modal?.cachedProvider;

  const renderBalance = () => {
    return (
      <div className="inline-flex px-2">
        <Balance address={address} provider={localProvider} price={price} size={16} />
      </div>
    );
  };

  const renderAddress = () => {
    let xtraProps = {};

    if (expandable) {
      xtraProps = {
        role: "button",
        onClick: () => setExpand(true),
      };
    }

    return (
      <div
        className={classnames("inline-flex rounded-full px-5 py-2 overflow-hidden m-0 address-wrapper", {
          "bg-gray-100": currentTheme === "light",
          "bg-gray-700": currentTheme === "dark",
        })}
        {...xtraProps}
      >
        <Address
          fontSize={16}
          address={address}
          ensProvider={mainnetProvider}
          blockExplorer={blockExplorer}
          {...addressProps}
        />
      </div>
    );
  };

  return (
    <div
      className={classnames("inline-flex items-center rounded-full justify-center p-0 overflow-hidden", {
        "bg-white border border-gray-100": currentTheme === "light",
        "bg-gray-800 border border-gray-700": currentTheme === "dark",
      })}
    >
      {((web3Modal && web3Modal.cachedProvider) || (useBurner && web3Modal && !web3Modal.cachedProvider)) && (
        <div className="inline-flex items-center">
          {withBalance && renderBalance()}
          {renderAddress()}
        </div>
      )}
      <Modal
        zIndex={900}
        width={600}
        title="Account"
        footer={null}
        visible={expand}
        onCancel={() => setExpand(false)}
        centered
      >
        {/* <div>Connect via {web3Modal.getInjectedProviderName()}</div> */}
        <div className="flex flex-1 justify-between items-start">
          <div>
            <div className="mb-2">Connected {isBurnerWallet ? " via 🔥 Burner Wallet" : " to"}:</div>
            <Address
              fontSize={25}
              address={address}
              ensProvider={mainnetProvider}
              blockExplorer={blockExplorer}
              {...addressProps}
            />
          </div>

          <div>
            <Button onClick={isBurnerWallet ? loadWeb3Modal : logoutOfWeb3Modal}>
              {isBurnerWallet ? "Connect Wallet" : "Logout"}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 justify-between mt-5">
          <div>
            <div role="button" className="inline-flex items-center mr-5" onClick={() => clipboard.copy(address)}>
              <Copy size={14} /> <span className="ml-2 text-sm">{clipboard.copied ? "Copied" : "Copy Address"}</span>
            </div>
            <a
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center mr-5 no-underline"
              href={`${blockExplorer || "https://etherscan.io/"}address/${address}}`}
            >
              <ExternalLink size={14} /> <span className="ml-2 text-sm">View in explorer</span>
            </a>
          </div>

          <div>
            <div role="button" className="inline-flex items-center" onClick={() => setAdvancedOpen(true)}>
              <Sliders size={14} />
              <span className="ml-2 text-sm">Advanced Options</span>
            </div>
            <Wallet
              price={price}
              hideButton={true}
              address={address}
              signer={userSigner}
              open={advancedOpen}
              provider={localProvider}
              ensProvider={mainnetProvider}
              closed={() => setAdvancedOpen(false)}
              color={currentTheme === "light" ? "#1890ff" : "#2caad9"}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
