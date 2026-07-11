### Analytics

#### Google Analytics

Follow [these steps](https://gohugo.io/templates/internal/#configure-google-analytics).

#### Google Tag Manager

Follow [these steps](https://developers.google.com/tag-manager).

```yaml
services:
  googleAnalytics:
    id: G-XXXXXXXXXX

params:
  analytics:
    google:
      SiteVerificationTag: your-search-console-verification-tag
```

#### Umami Analytics

Follow [these steps](https://guangzhengli.com/blog/en/how-to-integrate-umami-for-free-to-blog-site/).

```yaml
params:
  analytics:
    umami:
      enable: true
      website_id: data-website-id
      url: https://analytics.example.com/script.js
```
