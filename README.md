# UBYH Website

Marketing site for **UBYH**, converting polyolefin plastic waste into high-purity
Green Hydrogen and battery-grade Multi-Walled Carbon Nanotubes via proprietary
Microwave-CVD technology.

Static HTML, CSS and JS with no build step. Deploys to GitHub Pages at **https://ubyh.in**.

## Structure

```
index.html        Homepage: hero, metrics, process snapshot, products teaser
technology.html   Microwave-CVD advantage, process flow, reactor system
products.html     MWCNTs and Green Hydrogen specs and applications
impact.html       Circular-economy metrics and national alignment
contact.html      B2B inquiry form and founder contacts
assets/css/       Design system (one stylesheet)
assets/js/        Nav, animated counters, scroll reveal, form handling
assets/img/       Favicon / logo mark
```

## Run locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

## Edit content

Plain HTML: open any `.html` file and edit the text. Colours, spacing and type
live as CSS variables at the top of `assets/css/style.css`.

## Contact form

There is no backend or inbox yet, so on submit the form shows an inline confirmation
and points visitors to the founders' phone numbers. To collect submissions later,
create a free form at [formspree.io](https://formspree.io) and set the `action` on
the `<form>` in `contact.html` to your Formspree endpoint.

## Palette

Carbon `#1A1D20` · Emerald `#00E5A3` · Cyan `#00D2FF` · Slate `#F8F9FA`
