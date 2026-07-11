# Quick start

Requirements: Hugo v0.140.0+ extended and Dart Sass.

```bash
hugo new site myblog
cd myblog
git clone https://github.com/noneback/hugo-theme-spoon themes/hugo-theme-spoon
cp themes/hugo-theme-spoon/config.yml.example hugo.yml
mkdir -p content/blog
hugo new content blog/first-post.md
hugo server -D
```

Create `content/blog/_index.md` to configure the blog landing page:

```yaml
---
title: Blog
---
```

See [Configuration](configurations.md) for comments, analytics, multilingual parameters, and dark themes.
