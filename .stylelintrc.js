module.exports = {
    "extends": "stylelint-config-sass-guidelines",
    "ignoreFiles": ["**/*.js", "node_modules/", "**/*.css"],
    "rules": {
        "color-hex-case": null,

        // Either `none` or `0`, but stick to one
        "declaration-property-value-disallowed-list": {
          "border": ["none"],
          "border-top": ["none"],
          "border-right": ["none"],
          "border-bottom": ["none"],
          "border-left": ["none"]
        },

        "max-line-length": 80,
        "max-nesting-depth": [
          1,
          {
            "ignoreAtRules": [
              "each",
              "media",
              "supports",
              "include"
            ]
          }
        ],

        /* stylelint-order */
        "order/order": [
          [
            "custom-properties",
            "dollar-variables",
            {
              "type": "at-rule",
              "name": "extend"
            },
            {
              "type": "at-rule",
              "name": "include",
              "hasBlock": false
            },
            "declarations",
            {
              "type": "at-rule",
              "name": "include",
              "hasBlock": true
            },
            "rules"
          ]
        ],

        /* stylelint-scss */

        // Added underscore
        "selector-class-pattern": [
          "^[a-z_0-9\\-]+$",
          {
            "message":
              "Selector should be written in lowercase with hyphens or underscores (selector-class-pattern)"
          }
        ],

        // selectors w/t attributes are okay
        "selector-no-qualifying-type": [
            true,
            {
                "ignore": [
                    "attribute"
                ]
            }
        ],
    }
}
