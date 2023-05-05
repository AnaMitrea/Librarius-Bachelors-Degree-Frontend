import {NgxsLoggerPluginOptions} from "@ngxs/logger-plugin";
import {RootState} from "@app-store/shared/root.state";

// TODO add all the states from each module
export const STATES_MODULES = [
  RootState,

];

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: true
};
