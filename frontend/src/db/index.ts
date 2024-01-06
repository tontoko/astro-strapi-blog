import { drizzle } from "drizzle-orm/d1"
import type { AdvancedRuntime } from "@astrojs/cloudflare"

export const getDbClient = (runtime: AdvancedRuntime<ENV>["runtime"]) =>
  drizzle(runtime.env.DB)
