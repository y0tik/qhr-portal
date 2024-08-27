import type { SessionStorage } from "@remix-run/node";
import {
  type AuthenticateOptions,
  Strategy,
  type StrategyVerifyCallback,
} from "remix-auth";

/**
 * This interface declares what configuration the strategy needs from the
 * developer to correctly work.
 */
export interface MockStrategyOptions {
  throwOnProduction: boolean;
}

/**
 * This interface declares what the developer will receive from the strategy
 * to verify the user identity in their system.
 */
export interface MockStrategyVerifyParams {
  userId?: string;
}

export class MockStrategy<User> extends Strategy<
  User,
  MockStrategyVerifyParams
> {
  name = "mock-stategy";

  constructor(
    options: MockStrategyOptions,
    verify: StrategyVerifyCallback<User, MockStrategyVerifyParams>,
  ) {
    super(verify);
    // do something with the options here
    if (options.throwOnProduction) {
      throw new Error("Cannot use this strategy in production");
    }
  }

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage,
    options: AuthenticateOptions,
  ): Promise<User> {
    try {
      const user = await this.verify({});
      return this.success(user, request, sessionStorage, options);
    } catch (error) {
      if (error instanceof Error) {
        return await this.failure(
          error.message,
          request,
          sessionStorage,
          options,
          error,
        );
      }

      if (typeof error === "string") {
        return await this.failure(
          error,
          request,
          sessionStorage,
          options,
          new Error(error),
        );
      }

      return await this.failure(
        "Unknown error",
        request,
        sessionStorage,
        options,
        new Error(JSON.stringify(error, null, 2)),
      );
    }
  }
}
