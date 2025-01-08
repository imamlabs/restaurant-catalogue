import daStyle from "eslint-config-dicodingacademy";
import pluginImport from "eslint-plugin-import"; 

export default {
  ...daStyle,
  plugins: {
    import: pluginImport, 
  },
  rules: {
    quotes: "off", 
    semi: "off", 
    "import/prefer-default-export": "off", 
  },
};
