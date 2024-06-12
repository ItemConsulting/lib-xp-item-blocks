declare const resolve: (path: string) => import("@enonic-types/core").ResourceKey;

declare const app: {
  /**
   * The name of the application.
   */
  name: string;

  /**
   * Version of the application.
   */
  version: string;

  /**
   * Values from the application’s configuration file.
   * This can be set using $XP_HOME/config/<app.name>.cfg.
   * Every time the configuration is changed the app is restarted.
   */
  config: Record<string, string | undefined>;
};
