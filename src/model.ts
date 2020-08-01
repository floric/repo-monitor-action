export type MetricsValue<T> = {
  value: T;
  timestamp: number;
  releaseId: string;
};

export type MetricsData = {
  key: string;
  type: "scalar";
  values: Array<MetricsValue<number>>;
};

export type MetricsContext = {
  releaseId: string;
  token: string;
  repo: string;
  owner: string;
  branch: string;
};

export type Release = {
  id: string;
  timestamp: number;
};

export type ReleaseYear = {
  year: number;
  releases: Array<Release>;
};
