## Figma-Sync Script

### Table of contents

  - [Setup](#setup)  
    - [Set figma token](#set-figma-token)
    - [Setup .figmaconfig](#setup-figmaconfig)
  - [Run](#run)

### Setup

#### Set figma token

  1. Go to figma.com
  2. Open your profile page
  3. Click on `Create a new personal access token`
  4. Copy generated token to clipboard
  5. Open your `.bashrc` or `.zshrc`
     1. Add this line at the end of the file

     ``` 
     export FIGMA_TOKEN="PASTE_YOUR_TOKEN_HERE" 
     ```

     2. Save the file and exit
  6. Reopen your terminal and test if the `FIGMA_TOKEN` has been saved
  ```
  echo $FIGMA_TOKEN
  ``` 
#### Setup .figmaconfig
`.figmaconfig.json` file should look like:
    
    {
      "default_file": "FILE_KEY_FROM_FIGMA_URL",
      "assets_root_folder": "./src/assets/",
      "components": {
        "COMPONENT_KEY": {
          "node_id": "NODE_ID_FROM_FIGMA_URL", - MANDATORY
          "relative_path": "your_relative_path", - MANDATORY
          "file": "OTHER_FILE_KEY(EXTERNAL_PROJECT)", - OPTIONAL
          "export_settings": { - OPTIONAL
            "format": "png", - OPTIONAL
            "svg_include_id": true, - OPTIONAL
            "svg_simplify_stroke": true, - OPTIONAL
            "svg_outline_text": false, - OPTIONAL
            "scale": 1 - OPTIONAL
            }
          }
        }
      }
    }
  The node_id and file key can be parsed from any Figma node url:  
  `https://www.figma.com/file/:key/:title?node-id=:id`  
  
  `relative_path`, `export_settings` and each field of `export_settings` are optional.  
  - `default_file` : **string**  - file to export images from. It represents the figma project coresponding to the current dev project and you may get it from any Figma url as mentioned above
  - `relative_path` : **string**  - a path relative to assets root folder. `relative_path` **is mandatory** and have to contain at least the asset name, without file extension. The default file extension is `.svg`. If tou want other file extension (image format) you have to add this to `format` field
  - `file` : **string** - file to export the current component from. You need it only if this component belongs to other figma project although the `default_file` will be used
  - `format` : a **string enum** for the image output format, can be `jpg`, `png`, `svg`, or `pdf`. Default: **svg**
  - `svg_include_id` : **boolean** - whether to include id attributes for all SVG elements. Default: **true**
  - `svg_simplify_stroke` : **boolean** - whether to simplify inside/outside strokes and use stroke attribute if possible instead of `mask`. Default: **true**
  - `svg_outline_text` : **boolean** - whether text elements are rendered as outlines (vector paths) or as `text` elements in SVGs. Default to **false**
  - `scale` : **number** - a number between 0.01 and 4, the image scaling factor. Default to **1**

**You have to reproduce this step for each component `COMPONENT_NAME` you need from Figma (one time only)**

### Run
From the `client` directory of the project run:  
    
    yarn figma-sync COMPONENT_KEY_1 COMPONENT_KEY_2 ...
You may run the above command with no matter how many parameters (at least one). **If at least one of the parameters are missing from .figmaconfig.json the script will exit and no assets will be exported.**

  