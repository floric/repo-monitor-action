import * as React from "react";
import { ReleaseYear } from "../../model";

export const Header: React.FC<{ year: ReleaseYear }> = ({ year }) => (
  <h1 className="text-6xl mb-2">{year.year}</h1>
);
