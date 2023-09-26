type ActionResponseType = {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
};

class ActionResponse {
  success: boolean;
  message: string;
  data: any;

  private constructor(success: boolean, message: string, data: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success(message: string, data?: any): ActionResponseType {
    return new ActionResponse(true, message, data);
  }
  static error(message: string, data?: any): ActionResponseType {
    return new ActionResponse(false, message, data);
  }
}

export default ActionResponse;
