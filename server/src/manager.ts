import { User } from "./entity/User";
import { AppDataSource } from "./data-souse";

export async function XZ() {
  const user = await AppDataSource.manager.findOneBy(User, {
    id: 1,
  });
  user!.name = "Umed";
  await AppDataSource.manager.save(user);
}
