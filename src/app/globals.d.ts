declare module "*.css";
declare module "*.scss";
declare module "*.sass";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" {
  import * as React from "react";

  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
