"use client";

import React, { ReactNode } from "react";
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  braavos,
  useInjectedConnectors,
  voyager,
  argent,
} from "@starknet-react/core";

export function StarknetProvider({ children }: { children: ReactNode }) {
  const { connectors } = useInjectedConnectors({
    recommended: [argent()],
    includeRecommended: "onlyIfNoConnectors",
    order: "random",
  });

  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
