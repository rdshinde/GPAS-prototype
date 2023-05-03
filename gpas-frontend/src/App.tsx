import React, { useEffect, useState } from "react";
import { useUi } from "./context/ui/UiProvider";
import "./styles/App.css";
import { getImageAddressesFromIPFSFolder } from "./utility";

function App() {
  const [imageAddresses, setImageAddresses] = useState<string[]>([]);

  useEffect(() => {
    const ipfsFolderHash =
      "bafybeihviqgb5x7527u4asxibpplehgqhr4azmmaoncrzdbfiktxinyx2y";

    async function fetchImageAddresses() {
      try {
        const addresses = await getImageAddressesFromIPFSFolder(ipfsFolderHash);
        setImageAddresses(addresses);
      } catch (error) {
        console.error(error);
      } finally {
        console.log(imageAddresses);
      }
    }

    fetchImageAddresses();
  }, []);

  const { AuthButton } = useUi();
  return (
    <div className="App">
      <AuthButton />
    </div>
  );
}
export default App;
