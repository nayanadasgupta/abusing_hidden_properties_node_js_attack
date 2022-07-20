/**
 * @fileoverview Rule to ensure type of constructor is checked before using constructor properties. 
 * @author Nayana Dasgupta
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    'func-check-before-constructor': {
      meta: {
        docs: {
          description: '"Accessing a constructor property "constructor.X" needs to be preceded by "typeof constructor == "function" &&"',
        },
        schema: [], // no options
        messages: {
          unexpected:
            '"constructor.X" is found but is not preceded by "typeof constructor == "function" &&"',
        },
      },
      create: function (context) {
        return {
          MemberExpression: function (node) {
            const callingObject = node.object;
            const callingProperty = node.property;
            // If member expression is using a constructor property.
            if (callingObject && callingObject.name == "constructor" && callingProperty) {
              // Check parents to see if 'if typeof constructor == "function"' is present.
              const logicalExpression = node.parent;
              // Expect constructor property use to be part of a logical expression.
              if (logicalExpression.type !== 'LogicalExpression') {
                context.report({
                  node: node,
                  messageId: 'unexpected',
                });
              }
              // Expect logicial expression to be AND. 
              else if (logicalExpression.operator !== '&&') {
                context.report({
                  node: node,
                  messageId: 'unexpected',
                });
              }
              // Expect left side of logical expression to be a binary expression.
              else if (logicalExpression.left.type !== 'BinaryExpression') {
                context.report({
                  node: node,
                  messageId: 'unexpected',
                });
              }
              // Expect binary expression to be equality check.
              else if (logicalExpression.left.operator !== '===' && logicalExpression.left.operator !== '==') {
                context.report({
                  node: node,
                  messageId: `unexpected`,
                });
              }
              // Expect left binary expression to be typeof.
              else if (logicalExpression.left.left.type !== 'UnaryExpression' || logicalExpression.left.left.operator !== "typeof") {
                context.report({
                  node: node,
                  messageId: 'unexpected',
                });
              }
              // Expect left binary expression argument to be constructor.
              else if (logicalExpression.left.left.argument.type != 'Identifier' || logicalExpression.left.left.argument.name != 'constructor') {
                context.report({
                  node: node,
                  messageId: 'unexpected',
                });
              }
              // Expect right binary expression to be function string type.
              else {
                if (logicalExpression.left.right.type !== 'Literal' || logicalExpression.left.right.value !== 'function') {
                  context.report({
                    node: node,
                    messageId: 'unexpected',
                  });
                }
              }
            }

          }

          // ExpressionStatement: function (node) {
          //   const callingObject = node.object;
          //   const callingProperty = node.property;

          //   if (callingObject && callingObject.name === "constructor" && callingProperty && callingProperty.name) {
          //     // Check parents to see 'if typeof constructor == "function"' is present.
          //     const callingLogicalExpression = node.parent.parent;
          //     if (callingLogicalExpression.type !== "LogicalExpression") {
          //       context.report({
          //         node: node,
          //         messageId: "unexpected",
          //       });
          //     }
          //     else if (callingLogicalExpression.left.type !== "BinaryExpression") {
          //       context.report({
          //         node: node,
          //         messageId: "unexpected",
          //       });
          //     }
          //     else if (callingLogicalExpression.left.type == "BinaryExpression" && callingLogicalExpression.left.operator === "==") {
          //       const callingBinaryExpression = callingLogicalExpression.left;
          //       if (callingBinaryExpression.left.type != "UnaryExpression" && callingBinaryExpression.right.type != "Literal") {
          //         context.report({
          //           node: node,
          //           messageId: "unexpected",
          //         });
          //       }
          //       else {
          //         if (callingBinaryExpression.left.operator != "typeof" && callingBinaryExpression.argument.type != "Identifier" && callingBinaryExpression.argument.name != "constructor") {
          //           context.report({
          //             node: node,
          //             messageId: "unexpected",
          //           });
          //         }
          //         else {
          //           if (callingBinaryExpression.right.type != "Literal" && callingBinaryExpression.right.value != "Literal") {
          //             context.report({
          //               node: node,
          //               messageId: "unexpected",
          //             });
          //           }
          //         }
          //       }
          //     }
          //     else {
          //       if (callingLogicalExpression.operator !== "&&") {
          //         context.report({
          //           node: node,
          //           messageId: "unexpected",
          //         });
          //       }
          //     }
          //   }
            
          // }
        };
      },
    },
  };