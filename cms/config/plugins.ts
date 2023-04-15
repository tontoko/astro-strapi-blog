export default ({ env }) => ({
  upload: {
    config: {
      provider: "strapi-provider-upload-supabase-strage",
      providerOptions: {
        url: env("SUPABASE_URL"),
        apiKey: env("SUPABASE_KEY"),
        bucket: env("SUPABASE_BUCKET"),
        bucketPrefix: env("SUPABASE_BUCKET_PREFIX"),
      },
    },
  },
});
