/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { ActionType } from "@/constants/transferSteps";
import PropTypes from "prop-types";

import { Alert } from "@realms-world/ui";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TransactionSubmittedModalBody = ({ transfer }: { transfer: any }) => {
  const { type, l2hash, l1hash } = transfer;
  const isTransferCompleted = l1hash && l2hash;

  const textMessage =
    type === ActionType.TRANSFER_TO_L2
      ? "Your transaction has been successfully sent to StarkNet!"
      : isTransferCompleted
        ? "Your transfer is completed on Ethereum!"
        : "Your transaction is now being processing on StarkNet.";

  const messageComponent =
    type === ActionType.TRANSFER_TO_L2 ? (
      <Alert
        className="bg-yellow-900 text-white"
        title={"This is an Alpha version"}
        variant="destructive"
      >
        Completing a Ethereum → StarkNet transfer may take up to several hours
        depending on the congestion. It may take a while for your wallet balance
        to update.
      </Alert>
    ) : !isTransferCompleted ? (
      <Alert
        className="bg-yellow-900 text-white"
        title={"This is an Alpha version"}
        variant="destructive"
      >
        The StarkNet → Ethereum transfer divided into two stages:\n• A waiting
        period of several hours is expected between the stages.\n• At the end of
        the first step, you will be required to sign in order to complete the
        transfer.
      </Alert>
    ) : null;

  return (
    <div className="mb-6 flex flex-col items-center">
      <div className="mb-4 text-lg">{textMessage}</div>
      {messageComponent}
    </div>
  );
};

TransactionSubmittedModalBody.propTypes = {
  transfer: PropTypes.object,
};

export default TransactionSubmittedModalBody;
