"use client";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";
import type { ReactNode } from "react";
import { antdTheme } from "@/config/theme";

export interface AntdProvidersProps {
  children: ReactNode;
}

export function AntdProviders({ children }: AntdProvidersProps) {
  return (
    <AntdRegistry>
      <ConfigProvider theme={antdTheme}>{children}</ConfigProvider>
    </AntdRegistry>
  );
}
