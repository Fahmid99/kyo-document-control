export interface Document {
  id?: string;
  name?: string;
  data: {
    name: string;
    type: string;
    publishdate: string;
    releasedate: string;
    reviewdate: string;
    classification: string;
    category: Array<string>;
    functionsubfn: Array<string>;
  };
}
