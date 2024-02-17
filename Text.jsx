import React from 'react';
import {Text} from 'react-native';

// function splitOnFirstOccurrence(input, separator) {
//   const index = input.indexOf(separator);
//   if (index === -1) {
//     return [input];
//   }
//   return [input.substring(0, index), input.substring(index + separator.length)];
// }

const SUPPORTED_TAGS = [
  {open: '<b>', close: '</b>', style: {fontWeight: 'bold'}},
  {open: '<i>', close: '</i>', style: {fontStyle: 'italic'}},
];

const recursive = t => {
  const found = {index: -1, tag: null};
  for (const tag of SUPPORTED_TAGS) {
    const index = t.indexOf(tag.open);
    if (index === -1) continue;
    if (found.index === -1 || index < found.index) {
      found.index = index;
      found.tag = tag;
    }
  }
  if (found.index === -1) return t;
  const temp = t.substring(found.index + found.tag.open.length);
  const index = temp.indexOf(found.tag.close);
  if (!~index) return t;
  const within = temp.substring(0, index);
  const remaining = temp.substring(index + found.tag.close.length);

  return [
    t.substring(0, found.index),
    <Text style={found.tag.style}>{recursive(within)}</Text>,
    recursive(remaining),
  ];
};

export default ({children, ...props}) => {
  if (typeof children !== 'string') return <Text {...props}>{children}</Text>;
  console.log('is string');
  return <Text {...props}>{recursive(children)}</Text>;
};
