import { create } from "ipfs-http-client";

interface IPFSEntry {
  name: string;
  type: "file" | "dir";
  size: number;
  cid: { toString: () => string };
}

export async function getImageAddressesFromIPFSFolder(
  ipfsFolderHash: string
): Promise<string[]> {
  const ipfs = create({
    url: "https://ipfs.infura.io:5001/api/v0?arg=5a9b43984c1445868bb4108d0672b753",
  });

  const files: IPFSEntry[] = [];
  for await (const file of ipfs.ls(ipfsFolderHash)) {
    files.push(file);
  }

  const imageAddresses = files
    .filter((file: IPFSEntry) => {
      return file.type === "file" && file.name.match(/\.(jpg|jpeg|png|gif)$/i);
    })
    .map((file: IPFSEntry) => {
      return `https://ipfs.io/ipfs/${file.cid.toString()}`;
    });

  return imageAddresses;
}
