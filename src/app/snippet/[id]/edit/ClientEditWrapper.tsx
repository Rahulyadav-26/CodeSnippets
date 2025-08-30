"use client";

import EditPageSnippet from "@/components/ui/EditPageSnippet";
import type { Snippet } from "@/generated/prisma";

interface ClientEditWrapperProps {
  snippet: Snippet;
}

const ClientEditWrapper = ({ snippet }: ClientEditWrapperProps) => {
  return <EditPageSnippet snippet={snippet} />;
};

export default ClientEditWrapper;
