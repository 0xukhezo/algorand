export type accountType = {
  id: number;
  address: string;
  amount: number;
  amountWithoutPendingRewards: number;
  appsTotalSchema: algorandAppsTotalSchema;
  assets: algorandAsset[];
  minBalance: number;
  pendingRewards: number;
  rewardBase: number;
  rewards: number;
  round: number;
  status: string;
  totalAppsOptedIn: number;
  totalAssetsOptedIn: number;
  totalCreatedApps: number;
  totalCreatedAssets: number;
};

type algorandAsset = {
  amount: number;
  "asset-id": number;
  "is-frozen": boolean;
};

type algorandAppsTotalSchema = {
  "num-byte-slice": number;
  "num-uint": number;
  [key: string]: number;
};
