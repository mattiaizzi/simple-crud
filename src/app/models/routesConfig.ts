import { RouteProps } from "react-router";

export interface Routes extends RouteProps {
  key: string;
}

export interface RoutesConfig {
  paths: Routes[];
  defaultPath: string;
}
