# <img align="left" src="./webpage/tech-badges.svg" title="tech-badges" alt="tech-badges" height="60">
<br>
<br>
Lightweight package providing badges with technologies names as CSS classes and SVGs.

## Installation
```
npm i tech-badges
```

## Usage
### CSS
Link stylesheet file in your html
```
<link rel="stylesheet" href="node_modules/tech-badges/dist/tech-badges.css">
```
Create a badge (as a span or link, etc.)
```
<span class="badge tb-python">Python</span> 
```
```
<a class="badge tb-cpp" href="https://github.com/trending/cpp" target="_blank">C++</a>
```

### SVG
Insert badge in svg scalable format, defining custom size:
```
<img src="node_modules/tech-badges/dist/svgs/tb_java.css" height="125">
```


## Development

### Build
```
npm run build
```
### Update webpage
```
npm run update-webpage
```

## Contributing
Following "fork-and-pull" Git workflow.
 1. **Fork** the repo on GitHub.
 2. **Clone** the project to your own machine.
 3. **Commit** changes to your own branch.
 4. **Push** your work back up to your fork.
 5. Submit a **Pull request** so that we can review your changes.

NOTE: Be sure to merge the latest from "upstream" before making a pull request!

## Copyright and Licensing

## Authors
- [Łukasz Kostrzewa](kost13.github.io) (@kost13)
- [Adam Napieralski](adamnapieralski.github.io) (@adamnapieralski)

## License
Distributed under the MIT License. See `LICENSE` for more information.
