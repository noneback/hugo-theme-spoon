# Configuration

Copy [`config.yml.example`](../config.yml.example) to your site and adjust the values you need. The theme requires Hugo v0.140.0 or newer with the extended build and Dart Sass.

## Core parameters

| Parameter | Type | Default | Description |
|---|---:|---|---|
| `params.brand` | string | `HOME` | Navigation brand text |
| `params.avatarURL` | string | — | Home page avatar URL |
| `params.author` | string | — | Author name |
| `params.authorDescription` | string | — | Short author description |
| `params.info` | string | — | Home page introduction |
| `params.favicon` | string | `/images/avatar.png` | Favicon and Apple touch icon |
| `params.darkModeTheme` | string | `data-dark-mode` | `data-dark-mode` or `icy-dark-mode` |
| `params.options.showDarkMode` | boolean | `false` | Show the theme toggle |
| `params.options.enableImgZooming` | boolean | `false` | Enable image zooming in articles |
| `params.options.enableMultiLang` | boolean | `false` | Show language navigation |
| `params.options.showMetaTags` | boolean | `false` | Show tags in article metadata |

## Article display controls

Set site defaults in `params.article`, then override any value in a page's front matter. `false` explicitly disables a feature for that page.

```yaml
params:
  article:
    toc: true
    related: true
    comments: true
    readingProgress: true
    imageZoom: true
```

```yaml
---
title: Short announcement
toc: false
related: false
comments: false
readingProgress: false
imageZoom: false
---
```

`imageZoom` loads the optional Medium Zoom script only for pages where it is enabled. On wide screens, the table of contents sits in the left gutter without affecting the article width and highlights the current section.

## Code blocks

Fenced code blocks use Hugo Chroma and render a compact header with the language, an optional filename, and a copy button. Hugo's native code-fence attributes support line numbers and focused lines:

````md
```go {title="internal/server/config.go",linenos=table,hl_lines=[2,"4-6"]}
func LoadConfig() error {
    // focused line
    return nil
}
```
````

Use `code-file` to render a range from a source file relative to the site root. It always shows line numbers matching the original file:

````md
{{< code-file path="snippets/config.go" start="12" end="38" lang="go" highlight="18-20" >}}
````

Keep snippets in your site repository (for example, `snippets/` or `assets/`) so that articles can reference code maintained alongside the source.

## Content sections

Blog and art landing pages must be Hugo section pages:

```text
content/
  blog/
    _index.md
    first-post.md
  art/
    _index.md
    first-work.md
```

Do not create `content/blog.md` or `content/art.md`; those are regular pages and will not use the list templates.

## Dark themes

```yaml
params:
  darkModeTheme: data-dark-mode # or icy-dark-mode
  options:
    showDarkMode: true
```

The first visit follows the operating-system color scheme. Once the visitor uses the toggle, the explicit choice is saved locally.

## Comments

Giscus and Utterances are optional. They can be enabled independently:

```yaml
params:
  comments:
    giscus:
      enable: true
      repo: username/repository
      repo_id: R_xxx
      category: Announcements
      category_id: DIC_xxx
      mapping: pathname
      position: top
      lang: en
```

The comment iframe follows the theme's light/dark toggle.

## Analytics

Hugo's built-in Google Analytics integration reads `services.googleAnalytics.id`:

```yaml
services:
  googleAnalytics:
    id: G-XXXXXXXXXX
```

Umami uses:

```yaml
params:
  analytics:
    umami:
      enable: true
      website_id: your-website-id
      url: https://analytics.example.com/script.js
```

## Language-specific parameters

Language-specific theme values belong under `languages.<code>.params`:

```yaml
languages:
  zh:
    label: 中文
    params:
      author: 你的名字
      guestbook:
        title: 留言板
        description: 欢迎留言。
```

Putting `guestbook`, `author`, or other custom theme fields directly under a language causes Hugo to ignore them.

## Page front matter

```yaml
---
title: My article
date: 2026-01-01
description: Optional list and SEO summary
tags: [Hugo]
series: [Getting Started]
featured: true
math: false
mermaid: false
---
```
