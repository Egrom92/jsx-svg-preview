# jsx-svg-preview

`jsx-svg-preview` is a package that simplifies the process of converting SVG files to JSX files in a ReactJS project. It also creates an `index.js` file that exports all SVG components and a preview component.


## Installation
---
You can install the package via npm:

```
npm install jsx-svg-preview
```
## Usage
---
To use the package, simply run the following command:

```
jsp -p <path-to-svg-folder>
```

The `-p` option is a required parameter that specifies the path to the SVG folder.


## Example
---
Suppose you have an SVG folder in your project with the following files:
```
my-svg-folder/
├── logo.svg
└── icon.svg
```

You can convert these SVG files into React components using jsp as follows:

```
jsp -p my-svg-folder
```

This will generate the following files:
```
my-svg-folder/
├── logo.jsx
├── icon.jsx
└── index.js
```

`index.js` will contain the following code:

```jsx
import Logo from './logo.jsx';
import Icon from './icon.jsx';

const SVGPreview = () => {
    return (
        <div style={{padding: '60px'}}>
            <p>Logo:</p> <br/><ArrowSvg/> <br/> <br/> <br/> <br/>
            <p>Icon:</p> <br/><BedSvg/> <br/> <br/> <br/> <br/>
        </div>
    )
}

export {
    SVGPreview,
    Logo,
    Icon
};
```

You can use the `SVGPreview` component to preview your SVG images on a separate page:

```jsx
import { SVGPreview } from './my-svg-folder';

// ...

<Route exact path="/svg" element={<SVGPreview />} />
```

This will display all SVG components on a separate page.

## License
---
This package is licensed under the MIT license. See the [LICENSE](https://github.com/Egrom92/jsx-svg-preview/blob/main/LICENSE) file for more information.

## Contributing
---
Contributions to this package are always welcome! Please see the [CONTRIBUTING](https://github.com/Egrom92/jsx-svg-preview/blob/main/CONTRIBUTING.md) file for more information.

## Issues
---
If you encounter any issues or bugs, please create an issue on the [issue tracker](https://github.com/Egrom92/jsx-svg-preview/issues) on GitHub.

## GitHub
---
Visit the [GitHub repository](https://github.com/Egrom92/jsx-svg-preview) for this package.