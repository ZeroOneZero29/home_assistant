class authUserService {
  public static async createUser(email: string, password: string): Promise<object> {
    const el = {
      email,
      password,
      desc: "Service",
    };
    return el;
  }
}

export default authUserService;
