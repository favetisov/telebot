// todo think how we can keep CALLBACK_COMMAND type check while encapsulating this code in node_module
// todo add callback data length check to match telegram restrictions
export const button = (btn: { text: string; command: string; clickReport: string; parameters?: any }) => {
  return {
    text: btn.text,
    callback_data:
      btn.command + ':: ' + btn.clickReport + (btn.parameters ? '::' + JSON.stringify(btn.parameters) : ''),
  };
};

export const extractButtonData = (
  callbackData,
): { command: string; clickReport: string; parameters: Array<string | number> | undefined } => {
  let [command, clickReport, parameters] = callbackData.split('::');
  if (parameters) parameters = JSON.parse(parameters);
  return { command, clickReport, parameters };
};
