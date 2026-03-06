import { visit } from 'unist-util-visit';

export function remarkNormalizeLanguages() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang) {
        node.lang = node.lang.toLowerCase();
      }
    });
  };
}
