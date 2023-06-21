import {NgxsLoggerPluginOptions} from "@ngxs/logger-plugin";
import {RootState} from "@app-store/shared/root.state";
export const STATES_MODULES = [
  RootState,

];

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: true
};
