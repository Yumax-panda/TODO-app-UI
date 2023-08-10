interface OfficialUrls {
  GitHub: string;
  Discord: string;
}

declare module "settings.json" {
  export interface Settings {
    officialUrls: OfficialUrls;
  }

  const settings: Settings;
  export default settings;
}
