import { BlockchainInfrastructure, Providers, TopProviders } from "@/components";

export const metadata = {
  title: "RPC",
  description: "RPC",
};

export default function Home() {
  return (
    <main className={"main"}>
      <Providers />
      <BlockchainInfrastructure />
    </main>
  );
}
