module.exports = {
    "parser": 'babel-eslint',
    "env": {
        "browser": true,
        "commonjs": true,
        "es2017": true,
        "node": true,
        "mocha": true
    },
    "extends": [
        "eslint:recommended",
        //"plugin:mocha/recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 2017,
        "ecmafeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "mocha",
        "react",
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": [
            "warn",
            {
                "allow": [
                    "info",
                    "error",
                    "log"
                ]
            }
        ],
        "prefer-destructuring": [
            "error",
            {
                "VariableDeclarator": {
                    "array": true,
                    "object": true
                },
                "AssignmentExpression": {
                    "array": true,
                    "object": true
                }
            },
            {
                "enforceForRenamedProperties": false
            }
        ]
    }
}